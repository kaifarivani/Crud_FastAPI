from fastapi import FastAPI,Depends,HTTPException,status
from database_models import User
from database_config import Base,get_db,engine
from pydantic_schemas import *

from sqlalchemy.exc import IntegrityError,SQLAlchemyError
from sqlalchemy.orm import Session
from authentication import *



Base.metadata.create_all(bind=engine)  # executed for table creation if does not exited

app=FastAPI()


# Doubttteddddd   

from fastapi.security import OAuth2PasswordBearer
tokens=OAuth2PasswordBearer(tokenUrl="signin") 
blacklist=set() 



@app.post("/signup",response_model=ResponseSignupUser)
async def signup(user:SignupUser,db:Session=Depends(get_db)):
    try:

        user_name= db.query(User).filter(User.username==user.username).first()
        if user_name:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username  is Exited !!"

                )
        user_email= db.query(User).filter(User.email==user.email).first()
        if user_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email is Exited !!"

                )
        
        hashpassword=hashed_password(user.password)
        new_user=User(
            username=user.username,
            email=user.email,
            password=hashpassword,
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return ({
            "status":status.HTTP_201_CREATED,
            "message":"User Signup SuccessFully !",
            "data":{
                "Id":new_user.id,
                "Username":new_user.username,
                "Email":new_user.email,
                "Created_at":new_user.created_at,
                "Status":"Employee " if new_user.user_status else "Not Employee",
                "Is_active":"Login User" if new_user.is_active else "Logout User",
                  }
             }
        )
    
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is Exited !!"
        )
    
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=F" DataBase Error {str(e)}  !!",
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unexpected Error {str(e)}"
        )
  


@app.post("/signin")
async def signin(user:SigninUser,db:Session=Depends(get_db)):
    try:
        db_user=db.query(User).filter(User.email==user.email).first()
        if not db_user:
            raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid User Details !!" 
                )
        if not  verify_password(user.password,db_user.password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid Paasword "
            )
        if not db_user.is_active:
            db_user.is_active=True
            db.add(db_user)
            db.commit()
            db.refresh(db_user)

        
        access_token=token_genrator(
            data={
                "email":db_user.email,
                "id":db_user.id,
            }
        )
        return {
            "status_code":status.HTTP_200_OK,
            "message":"Login SuccessFully !",
            "access_token":access_token,
            "token_type":"bearer"
        }
    except IntegrityError as e:
        raise HTTPException(
            status_code=status.HTTP_200_OK,
            detail=""
        )
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"DataBase Error {str(e)}"
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f" Unexcpected Error {str(e)}"
        )



# pending ------=
@app.delete("/logout")
async def logout(tokens:str=Depends(tokens)):
    if not token_verification(tokens):
        raise HTTPException(
            status_code=401,
            detail="Something went Wrong"
        )

    return {
        "status":200,
        "message":"Logout Successfully !!"
    }



@app.post("/add_user",response_model=ResponseSignupUser)
async def add_user(user:SignupUser,db:Session=Depends(get_db)):
    try:
        user_name= db.query(User).filter(User.username==user.username).first()
        if user_name:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username  is Exited !!"

                )
        user_email= db.query(User).filter(User.email==user.email).first()
        if user_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email is Exited !!"

                )
        
        hashpassword=hashed_password(user.password)
        new_user=User(
            username=user.username,
            email=user.email,
            password=hashpassword,
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return ({
            "status":status.HTTP_201_CREATED,
            "message":"User Added  SuccessFully !",
            "data":{
                "Id":new_user.id,
                "Username":new_user.username,
                "Email":new_user.email,
                "Created_at":new_user.created_at,
                "Status":"Employee " if new_user.user_status else "Not Employee",
                "Is_active":"Login User" if new_user.is_active else "Logout User",
            }
             }
        )
    
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is Exited !!"
        )
    
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=F" DataBase Error {str(e)}  !!",
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unexpected Error {str(e)}"
        )
  

    
@app.patch("/update_user/{uid}", response_model=UserResponse)
async def update_user(
    uid: int,
    user: UserUpdate,
    db: Session = Depends(get_db)
):
    try:

        dbuser = db.query(User).filter(User.id == uid).first()

        if not dbuser:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Invalid User ID"
            )

        update_data = user.model_dump(exclude_unset=True)

        # Username validation
        if "username" in update_data:

            existing_username = db.query(User).filter(
                User.username == update_data["username"],
                User.id != uid
            ).first()

            if existing_username:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Username already exists !!"
                )

        # Email validation
        if "email" in update_data:

            existing_email = db.query(User).filter(
                User.email == update_data["email"],
                User.id != uid
            ).first()

            if existing_email:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already exists !!"
                )

        # Dynamic update
        for key, value in update_data.items():
            setattr(dbuser, key, value)

        db.commit()
        db.refresh(dbuser)

        return {
            "status": status.HTTP_200_OK,
            "message": "User Updated Successfully !!",
            "data": {
                "id": dbuser.id,
                "username": dbuser.username,
                "email": dbuser.email,
                "created_at": dbuser.created_at,
                "user_status": dbuser.user_status,
                "is_active": dbuser.is_active
            }
        }

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database Error {str(e)} !!"
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unexpected Error {str(e)}"
        )
    
    
@app.get("/user/{uid}", response_model=UserResponse)
async def getuser(uid: int, db: Session = Depends(get_db)):
    try:

        user = db.query(User).filter(
            User.id == uid,
            User.user_status == True
        ).first()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        return {
            "status": status.HTTP_200_OK,
            "message": "User Fetched Successfully!",
            "data": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "created_at": user.created_at,
                "user_status": user.user_status,
                "is_active": user.is_active,
            }
        }

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database Error {str(e)} !!",
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unexpected Error {str(e)}"
        )



@app.get("/users", response_model=UsersListResponse)
async def getusers(db: Session = Depends(get_db)):
    try:

        users = db.query(User).filter(
            User.user_status == True
        ).all()

        return {
            "status": status.HTTP_200_OK,
            "message": "Users Fetched Successfully!",
            "data": users
        }

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database Error {str(e)} !!",
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unexpected Error {str(e)}"
        )

@app.delete("/delete_user/{uid}", response_model=UserResponse)
async def delete_user(uid: int, db: Session = Depends(get_db)):
    try:

        user = db.query(User).filter(User.id == uid).first()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Invalid User Id"
            )

        if not user.user_status:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User already deleted"
            )

        user.user_status = False

        db.commit()
        db.refresh(user)

        return {
            "status": status.HTTP_200_OK,
            "message": "User Deleted Successfully!",
            "data": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "created_at": user.created_at,
                "user_status": user.user_status,
                "is_active": user.is_active
            }
        }

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user credential for deletion"
        )

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database Error {str(e)} !!",
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unexpected Error {str(e)}"
        )
  

@app.put("/restore_user/{uid}", response_model=UserResponse)
async def restore_user(uid: int, db: Session = Depends(get_db)):
    try:

        user = db.query(User).filter(User.id == uid).first()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        user.user_status = True

        db.commit()
        db.refresh(user)

        return {
            "status": status.HTTP_200_OK,
            "message": "User Restored Successfully!",
            "data": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "created_at": user.created_at,
                "user_status": user.user_status,
                "is_active": user.is_active
            }
        }

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user credential for restore"
        )

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database Error {str(e)} !!",
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unexpected Error {str(e)}"
        )