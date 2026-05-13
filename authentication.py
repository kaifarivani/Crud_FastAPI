from passlib.context import CryptContext
from jose import jwt,JWSError
from datetime import datetime,timedelta
from fastapi import HTTPException

SECRET_KEY="MYSECRETKEY"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

password_context=CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
        
)



def hashed_password(password:str):
    return password_context.hash(password)

def verify_password(plain_password:str,hashed_password:str):
    return password_context.verify(plain_password,hashed_password)



def token_genrator(data:dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt

blacklist=set()

def token_verification(token:str):
    if token in blacklist:
        raise HTTPException(
            
                status_code=401,
                detail="Token Already Blacklist"
        )
    try:
        payload=jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        return payload
    except JWSError:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )
    