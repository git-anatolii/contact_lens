from sqlmodel import Session, create_engine, select

from app import crud
from app.core.config import settings
from app.models import NLP_User, UserCreate
from sqlmodel import SQLModel

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))

def init_sql_db(session: Session) -> None:
    
    SQLModel.metadata.create_all(engine)

    # Add first user
    user = session.exec(
        select(NLP_User).where(NLP_User.email == settings.FIRST_SUPERUSER_EMAIL)
    ).first()
    if not user:
        user_in = UserCreate(
            name=settings.FIRST_SUPERUSER_NAME,
            email=settings.FIRST_SUPERUSER_EMAIL,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True
        )
        user = crud.create_user(session=session, user_create=user_in)
