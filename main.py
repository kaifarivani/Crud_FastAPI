from fastapi import FastAPI,Depends,HTTPException
from database_models import User
from requests import status_codes
from database_config import Base,SessionLocal,get_db,engine
from pydantic_schemas import *
from sqlalchemy import or_
from sqlalchemy.orm import Session
from authentication import *
from typing import List



Base.metadata.create_all(bind=engine)

app=FastAPI()


# Doubttteddddd   

from fastapi.security import OAuth2PasswordBearer
tokens=OAuth2PasswordBearer(tokenUrl="signin") 
blacklist=set() 



@app.post("/signup")
async def signup(user:SignupUser,db:Session=Depends(get_db)):
    db_user=db.query(User).filter(User.email==user.email).first() or db.query(User).filter(User.username==user.username).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="User is Existed "
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
    return {"status":201,"Response":"User Signup Successfully !!"}

  


@app.post("/signin")
async def signin(user:SigninUser,db:Session=Depends(get_db)):
    db_user=db.query(User).filter(User.email==user.email).first()
    if not db_user:
        raise HTTPException(
           status_code=402,
           detail="Invalid Credentials !!" 
            )
    if not  verify_password(user.password,db_user.password):
        raise HTTPException(
            status_code=400,
            detail="Invalid Credentials "
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
        "status_code":200,
        "message":"Login SuccessFully !",
        "access_token":access_token,
        "token_type":"bearer"
    }


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




@app.post("/add_user")
async def add_user(user:SignupUser,db:Session=Depends(get_db)):
    db_user=db.query(User).filter(User.email==user.email).first() or db.query(User).filter(User.username==user.username).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="User is Existed "
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
    return {"status":201,"Response":"User Add Successfully !!"}




@app.put("/update_user")
async def update_user(
    user: UserUpdate,
    db: Session = Depends(get_db)
):

    dbuser = db.query(User).filter(
        User.id == user.id
    ).first()

    if not dbuser:
        raise HTTPException(
            status_code=404,
            detail="Invalid User ID"
        )

    is_checked = db.query(User).filter(
        or_(
            User.email == user.email,
            User.username == user.username
        ),
        User.id != user.id
    ).first()

    if is_checked:
        raise HTTPException(
            status_code=400,
            detail="Email or Username already exists"
        )

    dbuser.username = user.username
    dbuser.email = user.email

    db.commit()
    db.refresh(dbuser)

    return {
        "Updated User": {
            "id": dbuser.id,
            "username": dbuser.username,
            "email": dbuser.email
        }
    }

@app.get("/user/{id}",response_model=UserResponse)
async def getuser(uid:int,db:Session=Depends(get_db)):
    user=db.query(User).filter(User.id==uid and User.user_status==True).first()
    return user




@app.get("/users", response_model=List[UserResponse])
async def getusers(db: Session = Depends(get_db)):
    users = db.query(User).filter(User.user_status==True)
    return users



@app.delete("/delete_user/{id}")
async def delete_user(uid:int, db:Session=Depends(get_db)):

    user=db.query(User).filter(User.id==uid).first()
    if not user.user_status:
        raise HTTPException(
            status_code=400,
            detail="User IS Also Deleted"
        )
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid User Id"
        )
    
    user.user_status=False
    db.commit()
    db.refresh(user)
    return  {"message":"Data deleted"}




@app.get("/restore_user/{id}")
async def restore_user(uid:int ,db:Session=Depends(get_db)):
    user=db.query(User).filter(User.id==uid).first()
    user.user_status=True
    db.commit()
    db.refresh(user)
    return {"Resotred User":user}







