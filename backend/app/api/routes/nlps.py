import uuid
from datetime import timedelta
from typing import Annotated, Any, List

from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from fastapi.responses import HTMLResponse
from sqlmodel import col, delete, func, select, text

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
)

# chat_client = OpenAIChatter(
#     model_name="gpt-4",
#     temperature=0.2,
#     max_tokens=250,
#     prompt="Convert this text into SQL query."
#     )

router = APIRouter()

@router.get("/get-sl-all")
async def get_all_soft_lens(session: SessionDep, limit: int=10, offset: int=0):
    query = text("""
        WITH lens_data AS (
        SELECT DISTINCT 
            lens.id, 
            lens.title, 
            lens_categories.title AS category_name, 
            lens.image, 
            manufacturers.title AS manufacture_name
        FROM contact_lens.lens
        LEFT JOIN contact_lens.lens_lens_category ON lens.id = lens_lens_category.lens_id
        LEFT JOIN contact_lens.lens_categories ON lens_lens_category.lens_category_id = lens_categories.id
        LEFT JOIN contact_lens.lens_manufacturers ON lens.id = lens_manufacturers.lens_id
        LEFT JOIN contact_lens.manufacturers ON lens_manufacturers.manufacturers_id = manufacturers.id  -- Fixed JOIN condition
        )
        SELECT 
            (SELECT COUNT(DISTINCT lens_data.id) FROM lens_data) AS total_count,
            lens_data.id, 
            lens_data.title, 
            lens_data.category_name, 
            lens_data.image,
            lens_data.manufacture_name
        FROM lens_data
        LIMIT :limit OFFSET :offset;
    """)
    params = {
        "limit": limit,
        "offset": offset
    }
    result = session.execute(query, params).fetchall()
    all_soft_lens_list = [dict(row._mapping) for row in result]
    total_count = all_soft_lens_list[0]['total_count'] if all_soft_lens_list else 0
    for row in all_soft_lens_list:
        del row['total_count']
    return {"total_count": total_count, "soft_lens": all_soft_lens_list}

@router.get("/get-gpl-all")
async def get_all_gpl_lens(session: SessionDep, limit: int=10, offset: int=0):
    query = text(f"SELECT * FROM contact_lens.tbl_gp_lenses LIMIT {limit} OFFSET {offset};")
    all_gas_permeable_lens = session.execute(query).fetchall()
    all_gas_permeable_lens_list = [dict(row._mapping) for row in all_gas_permeable_lens]
    return {"gas_permeable_lens": all_gas_permeable_lens_list}

@router.get("/get-hybl-all")
async def get_all_hybl_lens(session: SessionDep, limit: int=10, offset: int=0):
    query = text(f"SELECT * FROM contact_lens.tbl_hyb_lenses LIMIT {limit} OFFSET {offset};")
    all_hybrid_lens = session.execute(query).fetchall()
    all_hybrid_lens_list = [dict(row._mapping) for row in all_hybrid_lens]
    return {"hybrid_lens": all_hybrid_lens_list}

@router.get("/get-hlm-all")
async def get_all_hl_materials(session: SessionDep, sort_by: str="name", limit: int=10, offset: int=0):
    query = text(f"SELECT * FROM contact_lens.tbl_hl_materials LIMIT {limit} OFFSET {offset};")
    all_hl_materials = session.execute(query).fetchall()
    all_hl_materials_list = [dict(row._mapping) for row in all_hl_materials]
    return {"hl_materials": all_hl_materials_list}

@router.get("/get-lp-all")
async def get_all_lens_product(session: SessionDep, limit: int=10, offset: int=0):
    query = text(f"SELECT * FROM contact_lens.tbl_lp_lensproducts LIMIT {limit} OFFSET {offset};")
    all_lens_product = session.execute(query).fetchall()
    all_lens_product_list = [dict(row._mapping) for row in all_lens_product]
    return {"lens_product": all_lens_product_list}

# @router.post("/chat/user")
# def user_chat(user_input: str) -> Message:
#     """
#     Endpoint for user chat with OpenAI.
#     """
#     if not user_input:
#         raise HTTPException(status_code=400, detail="No input provided")
#     res_msg = chat_client.create_chat(user_input)
#     return res_msg
    