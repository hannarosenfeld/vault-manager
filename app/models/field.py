from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class Field(db.Model, UserMixin):
    __tablename__ = 'fields'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    row_id = db.Column(db.String, db.ForeignKey(add_prefix_for_prod('rows.id')))
    field_id = db.Column(db.String(3), unique=True, nullable=False)
    vaults = db.relationship('Vault', back_populates='field', foreign_keys='Vault.field_id')
    row = db.relationship('Row', back_populates='fields')
    warehouse_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('warehouse.id')))
    warehouse = db.relationship('Warehouse', back_populates='warehouse_fields')

    def generate_field_id(self, row_id, numerical_identifier):
        return f"{row_id}{numerical_identifier:02d}"

    def to_dict(self):
        return {
            'id': self.id,
            'row_id': self.row_id,
            'field_id': self.field_id,
            'vaults': [vault.to_dict() for vault in self.vaults],
        }
