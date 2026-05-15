from fastapi import FastAPI,Depends,HTTPException,status
from database_models import User
from database_config import Base,get_db,engine
from pydantic_schemas import *
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import IntegrityError,SQLAlchemyError
from sqlalchemy.orm import Session
from authentication import *



Base.metadata.create_all(bind=engine)  # executed for table creation if does not exited

app=FastAPI()

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
    ],

    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
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
async def signin(signin_user: SigninUser, db: Session = Depends(get_db)):
    try:

        # Find user by email
        db_user = db.query(User).filter(
            User.email == signin_user.email
        ).first()

        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid User Credentials !!"
            )

        # Verify password
        if not verify_password(signin_user.password, db_user.password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid Password !!"
            )

        # Activate user
        if not db_user.is_active:
            db_user.is_active = True
            db.commit()
            db.refresh(db_user)

        # Generate token
        access_token = token_genrator(
            data={
                "email": db_user.email,
                "id": db_user.id,
            }
        )

        return {
            "status_code": status.HTTP_200_OK,
            "message": "Login Successfully!",
            "access_token": access_token,
            "token_type": "bearer"
        }

    except HTTPException:
        raise

    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database Error: {str(e)}"
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected Error: {str(e)}"
        )
# pending ------=

@app.delete("/logout/{uid}")

async def logout(
    uid: int,
    db: Session = Depends(tokens)
):

    try:

        # Find User
        user = (
            db.query(User)
            .filter(User.id == uid)
            .first()
        )

        # User Not Found
        if not user:

            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User Does Not Exist !!"
            )

        # Already Logged Out
        if user.is_active == False:

            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User Already Logged Out !!"
            )

        # Logout User
        user.is_active = False

        db.commit()

        db.refresh(user)

        return {

            "status_code": status.HTTP_200_OK,

            "message": "User Logout Successfully",

            "data": {
                "id": user.id,
                "is_active": user.is_active,
            }

        }

    except IntegrityError:

        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Integrity Error"
        )

    except SQLAlchemyError as e:

        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database Error: {str(e)}"
        )

    except Exception as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unexpected Error: {str(e)}"
        )


@app.post("/add_user")
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
    
    
@app.get("/get_single_user/{uid}", response_model=UserResponse)
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
        )
        deleted_user=db.query(User).filter(User.user_status==False).count()
        print(deleted_user)
        return {
            "status": status.HTTP_200_OK,
            "message": "Users Fetched Successfully!",
            "data": users,

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

@app.delete("/soft_delete_user/{uid}", response_model=UserResponse)
async def delete_user(uid: int, db: Session = Depends(get_db)):
    try:

        user = db.query(User).filter(User.id == uid,User.user_status==True).first()

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
  


@app.get("/trash_user", response_model=UsersListResponse)
async def hard_delete(db:Session=Depends(get_db)):
    try:
        trash_user=db.query(User).filter(User.user_status==False)
        if not trash_user:
            return {
            "status":status.HTTP_200_OK,
            "message":"Trash User Not Found ",
            "data":{}
        }
        
            re
        return {
            "status":status.HTTP_200_OK,
            "message":"Trash User Fetched ",
            "data":trash_user
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
  


@app.delete("/hard_delete_user/{uid}")
async def hard_delete_user(
    uid: int,
    db: Session = Depends(get_db)
):

    try:

        # FIND USER
        user = db.query(User).filter(
            User.id == uid
        ).first()

        # USER NOT FOUND
        if not user:

            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # ALLOW HARD DELETE ONLY FROM TRASH
        if user.user_status:

            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Move user to trash before permanent deletion"
            )

        # STORE USER DATA BEFORE DELETE
        deleted_user = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "created_at": user.created_at,
        }

        # DELETE USER
        db.delete(user)

        db.commit()

        return {
            "success": True,
            "message": "User permanently deleted successfully",
            "data": deleted_user
        }

    except HTTPException:

        raise

    except SQLAlchemyError as e:

        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )


@app.patch("/restore_user/{uid}", response_model=UserResponse)
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