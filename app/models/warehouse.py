from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class Warehouse(db.Model):
    __tablename__ = 'warehouse'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    rows = db.Column(db.Integer)
    cols = db.Column(db.Integer)
    warehouse_fields = db.relationship('Field', back_populates='warehouse', foreign_keys='Field.warehouse_id')
    users = db.relationship('User', secondary=warehouse_user, back_populates='warehouses', cascade='all, delete')
    

    # warehouse_rows = db.relationship('Row', back_populates='warehouse', foreign_keys='Row.warehouse_id')
    # warehouse_vaults = db.relationship('Vault', back_populates="warehouse")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'rows': self.rows,
            'columns': self.columns,
            'fields': [field.id for field in self.warehouse_fields]

            # 'vaults': [vault.to_dict() for vault in self.warehouse_vaults],
            # 'fields': {field.id : field.to_dict() for field in self.warehouse_fields},
            # 'rows': [row.to_dict() for row in self.warehouse_rows],
        }
