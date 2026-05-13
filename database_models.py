from sqlalchemy import Column, Integer, String, DateTime,Boolean
from datetime import datetime
from database_config import Base

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True,autoincrement=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    user_status=Column(Boolean,default=True)  # for soft delete
    is_active=Column(Boolean,default=True)   # fro login or logout