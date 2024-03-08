#!/usr/bin/python3
"""
initialize the models package
"""

import os
from dotenv import load_dotenv

load_dotenv()

storage_t = os.getenv("BCV_TYPE_STORAGE")

if storage_t == "db":
    from app.models.engine.db_storage import DBstorage
    storage = DBstorage()
storage.reload()
