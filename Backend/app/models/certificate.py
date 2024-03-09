#!/usr/bin/python3
"""
Certificates object model
"""
from app import models
from app.models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Boolean, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship


class Certificate(BaseModel, Base):
    """
    Certificates Object representation
    """
    __tablename__ = 'certificates'
    student_name = Column(String(128), nullable=False)
    reg_no = Column(String(10), nullable=False)
    institute_name = Column(String(128), nullable=False)
    address = Column(String(128), nullable=False)
    logo = Column(String(128), nullable=False)
    image = Column(String(128), nullable=False)
    grade = Column(String(128), nullable=False)
    fathers_name = Column(String(128), nullable=False)
    course = Column(String(128), nullable=False)
    ref_no = Column(String(10), nullable=False)
    verified_certificate = Column(Boolean, nullable=False, default=False)
    certificate_hash = Column(String(128))
    data_of_issue = Column(DateTime)
    user_id = Column(String(60), ForeignKey('users.id'))
    school_id = Column(String(60), ForeignKey('schools.id'))
    certificates_verify_status = relationship(
        "VerifyCertificate",
        backref="certificates",
        lazy='dynamic',
        cascade="all, delete, delete-orphan")


    def __init__(self, *args, **kwargs):
        """
        initializes Certificates
        """
        super().__init__(*args, **kwargs)
