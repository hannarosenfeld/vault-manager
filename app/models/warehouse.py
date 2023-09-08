from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Warehouse(db.Model):
    __tablename__ = 'warehouse'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    warehouse_vaults = db.relationship('Vault', back_populates="warehouse", lazy='joined', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'vaults': [vault.to_dict() for vault in self.warehouse_vaults],
        }
