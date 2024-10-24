import uuid
from datetime import timedelta
from typing import Annotated, Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import HTMLResponse
from authlib.integrations.starlette_client import OAuth
from starlette.requests import Request
from starlette.responses import RedirectResponse
from sqlmodel import col, delete, func, select
import httpx

from app import crud
from app.api.deps import (
    CurrentUser,
    SessionDep,
)
from app.core.config import settings
from app.core import security
from app.core.security import get_password_hash, verify_password
from app.models import (
    Message,
    UpdatePassword,
    NLP_User,
    UserPublic,
    UserRegister,
    UserCreate,
    UserLogin,
    AdminLogin,
    UsersPublic,
    UserUpdate,
    UserUpdateMe,
    TokenWithUser,
    NewPassword,
)
from app.utils import (
    generate_new_account_email,
    send_email,
    generate_password_reset_token,
    generate_reset_password_email,
    send_email,
    verify_password_reset_token,
)

router = APIRouter()

@router.get("/login/google")
async def login_google():
    google_auth_url = (
        f"https://accounts.google.com/o/oauth2/auth"
        f"?response_type=code&client_id={settings.GOOGLE_CLIENT_ID}"
        f"&redirect_uri={settings.GOOGLE_REDIRECT_URI}"
        f"&scope=openid profile email"
        f"&access_type=offline&prompt=consent"
    )
    return {"auth_url": google_auth_url}

@router.get("/login/google/callback")
async def google_callback(code: str, session: SessionDep):
    try:
        # Exchange code for access and ID token
        token_url = "https://oauth2.googleapis.com/token"
        async with httpx.AsyncClient() as client:
            response = await client.post(
                token_url,
                data={
                    "client_id": settings.GOOGLE_CLIENT_ID,
                    "client_secret": settings.GOOGLE_CLIENT_SECRET,
                    "code": code,
                    "grant_type": "authorization_code",
                    "redirect_uri": settings.GOOGLE_REDIRECT_URI,
                },
            )
            token_data = response.json()

        # Use the access_token to get user information
        user_info_url = "https://www.googleapis.com/oauth2/v2/userinfo"
        headers = {"Authorization": f"Bearer {token_data['access_token']}"}
        async with httpx.AsyncClient() as client:
            user_info = await client.get(user_info_url, headers=headers)

        email = user_info.json()["email"]
        name = user_info.json()["name"]
        password = settings.GOOGLE_LOGIN_DEFAULT_PASSWORD

        user_create = UserCreate(
            email=email,
            name=name,
            password=password
        )
        
        user: UserPublic = crud.get_or_create_user(session=session, user_create=user_create)
        
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = security.create_access_token(user.id, expires_delta=access_token_expires)

        return TokenWithUser(access_token=access_token, user=user)

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error during Google login: {str(e)}")
    
@router.post("/register", response_model=UserPublic)
def register_user(session: SessionDep, user_in: UserRegister):
    user = crud.get_user_by_email(session=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists",
        )
    user_create = UserCreate.model_validate(user_in)
    user = crud.create_user(session=session, user_create=user_create)
    return user

@router.post("/login", response_model=TokenWithUser)
def login_access_token(session: SessionDep, user_in: UserLogin):
    user: UserPublic = crud.get_user_by_email(session=session, email=user_in.email)
    if not user:
        raise HTTPException(status_code=400, detail="Not registered")
    
    user: UserPublic = crud.authenticate(
        session=session, email=user_in.email, password=user_in.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    if user_in.remember_me:
        access_token_expires = timedelta(minutes=settings.REMEMBER_ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token=security.create_access_token(user.id, expires_delta=access_token_expires)
    return TokenWithUser(access_token=access_token, user=user)

@router.post("/login/token", response_model=UserPublic)
def test_token(current_user: CurrentUser) -> Any:
    return current_user

@router.post("/me")
def update_user_me(*, session: SessionDep, user_in: UserUpdateMe, current_user: CurrentUser):
    if user_in.email:
        existing_user = crud.get_user_by_email(session=session, email=user_in.email)
        if existing_user and existing_user.id != current_user.id:
            raise HTTPException(
                status_code=409, detail="User with this email already exists"
            )
    user_data = user_in.model_dump(exclude_unset=True)
    current_user.sqlmodel_update(user_data)
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    return current_user

# @router.post("/password-recovery/{email}")
# def recover_password(email: str, session: SessionDep) -> Message:
#     """
#     Password Recovery
#     """
#     user = crud.get_user_by_email(session=session, email=email)

#     if not user:
#         raise HTTPException(
#             status_code=404,
#             detail="The user with this email does not exist in the system.",
#         )
#     password_reset_token = generate_password_reset_token(email=email)
#     email_data = generate_reset_password_email(
#         email_to=user.email, email=email, token=password_reset_token
#     )
#     send_email(
#         email_to=user.email,
#         subject=email_data.subject,
#         html_content=email_data.html_content,
#     )
#     return Message(message="Password recovery email sent")


# @router.post("/reset-password/")
# def reset_password(session: SessionDep, body: NewPassword) -> Message:
#     """
#     Reset password
#     """
#     email = verify_password_reset_token(token=body.token)
#     if not email:
#         raise HTTPException(status_code=400, detail="Invalid token")
#     user = crud.get_user_by_email(session=session, email=email)
#     if not user:
#         raise HTTPException(
#             status_code=404,
#             detail="The user with this email does not exist in the system.",
#         )
#     elif not user.is_active:
#         raise HTTPException(status_code=400, detail="Inactive user")
#     hashed_password = get_password_hash(password=body.new_password)
#     user.hashed_password = hashed_password
#     session.add(user)
#     session.commit()
#     return Message(message="Password updated successfully")


# @router.get(
#     "/",
#     dependencies=[Depends(get_current_active_superuser)],
#     response_model=UsersPublic,
# )
# def read_users(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
#     """
#     Retrieve users.
#     """

#     count_statement = select(func.count()).select_from(NLP_User)
#     count = session.exec(count_statement).one()

#     statement = select(NLP_User).offset(skip).limit(limit)
#     users = session.exec(statement).all()

#     return UsersPublic(data=users, count=count)


# @router.post(
#     "/", dependencies=[Depends(get_current_active_superuser)], response_model=UserPublic
# )
# def create_user(*, session: SessionDep, user_in: UserRegister) -> Any:
#     """
#     Create new user.
#     """
#     user = crud.get_user_by_email(session=session, email=user_in.email)
#     if user:
#         raise HTTPException(
#             status_code=400,
#             detail="The user with this email already exists in the system.",
#         )

#     user = crud.create_user(session=session, user_create=user_in)
#     if settings.emails_enabled and user_in.email:
#         email_data = generate_new_account_email(
#             email_to=user_in.email, username=user_in.email, password=user_in.password
#         )
#         send_email(
#             email_to=user_in.email,
#             subject=email_data.subject,
#             html_content=email_data.html_content,
#         )
#     return user


# @router.patch("/me/password", response_model=Message)
# def update_password_me(
#     *, session: SessionDep, body: UpdatePassword, current_user: CurrentUser
# ) -> Any:
#     """
#     Update own password.
#     """
#     if not verify_password(body.current_password, current_user.hashed_password):
#         raise HTTPException(status_code=400, detail="Incorrect password")
#     if body.current_password == body.new_password:
#         raise HTTPException(
#             status_code=400, detail="New password cannot be the same as the current one"
#         )
#     hashed_password = get_password_hash(body.new_password)
#     current_user.hashed_password = hashed_password
#     session.add(current_user)
#     session.commit()
#     return Message(message="Password updated successfully")


# @router.get("/me", response_model=UserPublic)
# def read_user_me(current_user: CurrentUser) -> Any:
#     """
#     Get current user.
#     """
#     return current_user


# @router.delete("/me", response_model=Message)
# def delete_user_me(session: SessionDep, current_user: CurrentUser) -> Any:
#     """
#     Delete own user.
#     """
#     if current_user.is_superuser:
#         raise HTTPException(
#             status_code=403, detail="Super users are not allowed to delete themselves"
#         )
#     session.delete(current_user)
#     session.commit()
#     return Message(message="User deleted successfully")

# @router.get("/{user_id}", response_model=UserPublic)
# def read_user_by_id(
#     user_id: uuid.UUID, session: SessionDep, current_user: CurrentUser
# ) -> Any:
#     """
#     Get a specific user by id.
#     """
#     user = session.get(NLP_User, user_id)
#     if user == current_user:
#         return user
#     if not current_user.is_superuser:
#         raise HTTPException(
#             status_code=403,
#             detail="The user doesn't have enough privileges",
#         )
#     return user


# @router.patch(
#     "/{user_id}",
#     dependencies=[Depends(get_current_active_superuser)],
#     response_model=UserPublic,
# )
# def update_user(
#     *,
#     session: SessionDep,
#     user_id: uuid.UUID,
#     user_in: UserUpdate,
# ) -> Any:
#     """
#     Update a user.
#     """

#     db_user = session.get(NLP_User, user_id)
#     if not db_user:
#         raise HTTPException(
#             status_code=404,
#             detail="The user with this id does not exist in the system",
#         )
#     if user_in.email:
#         existing_user = crud.get_user_by_email(session=session, email=user_in.email)
#         if existing_user and existing_user.id != user_id:
#             raise HTTPException(
#                 status_code=409, detail="User with this email already exists"
#             )

#     db_user = crud.update_user(session=session, db_user=db_user, user_in=user_in)
#     return db_user


# @router.delete("/{user_id}", dependencies=[Depends(get_current_active_superuser)])
# def delete_user(
#     session: SessionDep, current_user: CurrentUser, user_id: uuid.UUID
# ) -> Message:
#     """
#     Delete a user.
#     """
#     user = session.get(NLP_User, user_id)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#     if user == current_user:
#         raise HTTPException(
#             status_code=403, detail="Super users are not allowed to delete themselves"
#         )
#     session.delete(user)
#     session.commit()
#     return Message(message="User deleted successfully")
