from passlib.context import CryptContext

from jose import jwt, JWSError

from datetime import datetime, timedelta

from fastapi import (
    HTTPException,
    Depends,
    status,
)

from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from database_config import get_db

from database_models import User


# =========================
# JWT CONFIG
# =========================

SECRET_KEY = "MYSECRETKEY"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 30


# =========================
# PASSWORD HASHING
# =========================

password_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hashed_password(password: str):

    return password_context.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str
):

    return password_context.verify(
        plain_password,
        hashed_password
    )


# =========================
# TOKEN GENERATOR
# =========================

def token_genrator(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire
    })

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


# =========================
# TOKEN BLACKLIST
# =========================

blacklist = set()


# =========================
# TOKEN VERIFY
# =========================

def token_verification(token: str):

    # CHECK BLACKLIST
    if token in blacklist:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token Blacklisted"
        )

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except JWSError:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Token"
        )


# =========================
# OAUTH2 SCHEME
# =========================

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="signin"
)


# =========================
# CURRENT USER VERIFY
# =========================

def get_current_user(

    token: str = Depends(oauth2_scheme),

    db: Session = Depends(get_db)

):

    credentials_exception = HTTPException(

        status_code=status.HTTP_401_UNAUTHORIZED,

        detail="Invalid Authentication"

    )

    try:

        # VERIFY TOKEN
        payload = token_verification(token)

        # GET USER ID
        user_id = payload.get("id")

        if user_id is None:

            raise credentials_exception

    except JWSError:

        raise credentials_exception

    # CHECK USER EXISTS
    user = db.query(User).filter(

        User.id == user_id,

        User.user_status == True

    ).first()

    # USER DELETED
    if not user:

        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="User Not Found"

        )

    return user