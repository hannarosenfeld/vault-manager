from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Warehouse(db.Model):
    __tablename__ = 'warehouse'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    warehouse_vaults = db.relationship('Vault', back_populates="warehouse", lazy='joined', cascade='all, delete-orphan')

#    TODO: add relationships to fields ands rows. access vaults through warehouse.fields/rows
    warehouse_fields = db.relationship('Field', back_populates='warehouse', foreign_keys='Field.warehouse_id')
    warehouse_rows = db.relationship('Row', back_populates='warehouse', foreign_keys='Row.warehouse_id')


    def to_dict(self):
        return {
            'id': self.id,
            'vaults': [vault.to_dict() for vault in self.warehouse_vaults],
            'fields': [field.to_dict() for field in self.warehouse_fields],
            'rows': [row.to_dict() for row in self.warehouse_rows],
        }
