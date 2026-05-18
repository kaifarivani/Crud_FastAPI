from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Annotated,List,Optional
import re
from datetime import datetime


class SignupUser(BaseModel):

    username: Annotated[
        str,
        Field(
            ...,
            min_length=3,
            max_length=50,
            title="Username",
            description="Enter your username"
        )
    ]

    email: Annotated[
        EmailStr,
        Field(
            ...,
            title="Email",
            description="example@gmail.com"
        )
    ]

    password: Annotated[
        str,
        Field(
            ...,
            min_length=8,
            max_length=72,
            title="Password",
            description="Password must contain uppercase, lowercase, number and special character"
        )
    ]

    confirm_password: Annotated[
        str,
        Field(
            ...,
            min_length=8,
            max_length=72,
            title="Confirm Password",
            description="Re-enter your password"
        )
    ]

    @field_validator("password")
    @classmethod
    def validate_password(cls, value):

        pattern = (
            r"^(?=.*[a-z])"
            r"(?=.*[A-Z])"
            r"(?=.*\d)"
            r"(?=.*[@$!%*?&])"
            r"[A-Za-z\d@$!%*?&]{8,}$"
        )

        if not re.match(pattern, value):
            raise ValueError(
                "Password must contain uppercase, lowercase, number and special character"
            )

        return value

    @field_validator("confirm_password")
    @classmethod
    def passwords_match(cls, value, info):

        password = info.data.get("password")

        if password != value:
            raise ValueError("Passwords do not match")

        return value



class ResponseSignupUser(BaseModel):
    status:int
    message:str
    data:dict

class SigninUser(BaseModel):

    email: Annotated[
        EmailStr,
        Field(
            ...,
            title="Email",
            description="example@gmail.com"
        )
    ]

    password: Annotated[
        str,
        Field(
            ...,
            min_length=8,
            max_length=72,
            title="Password",
            description="Enter your password"
        )
    ]

class UserData(BaseModel):
    id: int
    username: str
    email: str
    role:str
    created_at: datetime
    user_status: bool
    is_active: bool

    class Config:
        from_attributes = True


class UserResponse(BaseModel):
    status: int
    message: str
    data: UserData



class UsersListResponse(BaseModel):
    status: int
    message: str
    data: List[UserData]

class UserUpdate(BaseModel):
    username: Optional[str]=None
    email:Optional[EmailStr]=None

    


