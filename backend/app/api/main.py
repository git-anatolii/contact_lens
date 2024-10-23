from fastapi import APIRouter

from app.api.routes import users, nlps, admin

api_router = APIRouter()
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(nlps.router, prefix="/nlps", tags=["nlps"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
