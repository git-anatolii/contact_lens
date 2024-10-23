import uuid
from typing import Any

from sqlmodel import Session, select

from app.core.security import get_password_hash, verify_password
from app.models import NLP_User, UserCreate, UserUpdate

# Create User
def create_user(*, session: Session, user_create: UserCreate) -> NLP_User:
    user = NLP_User.model_validate(
        user_create, update={"hashed_password": get_password_hash(user_create.password)}
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

def get_or_create_user(*, session: Session, user_create: UserCreate) -> NLP_User:
    user = session.query(NLP_User).filter(NLP_User.email == user_create.email).first()
    if not user:
        user = NLP_User.model_validate(
            user_create, update={"hashed_password": get_password_hash(user_create.password)}
        )
        session.add(user)
        session.commit()
        session.refresh(user)
    return user

def update_user(*, session: Session, db_user: NLP_User, user_in: UserUpdate) -> Any:
    user_data = user_in.model_dump(exclude_unset=True)
    extra_data = {}
    if "password" in user_data:
        password = user_data["password"]
        hashed_password = get_password_hash(password)
        extra_data["hashed_password"] = hashed_password
    db_user.sqlmodel_update(user_data, update=extra_data)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def get_user_by_email(*, session: Session, email: str) -> NLP_User | None:
    statement = select(NLP_User).where(NLP_User.email == email)
    session_user = session.exec(statement).first()
    return session_user


def authenticate(*, session: Session, email: str, password: str) -> NLP_User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user


# def create_item(*, session: Session, item_in: ItemCreate, owner_id: uuid.UUID) -> Item:
#     db_item = Item.model_validate(item_in, update={"owner_id": owner_id})
#     session.add(db_item)
#     session.commit()
#     session.refresh(db_item)
#     return db_item
