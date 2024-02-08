from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Field(db.Model, UserMixin):
    __tablename__ = 'fields'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    row_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('rows.id')))
    field_id = db.Column(db.String(20), unique=True, nullable=False)  # Adjust the length as needed
    vaults = db.relationship('Vault', back_populates='field', foreign_keys='Vault.field_id', lazy='dynamic')
    row = db.relationship('Row', back_populates='fields')
    warehouse_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('warehouse.id')))
    warehouse = db.relationship('Warehouse', back_populates='warehouse_fields')
    full = db.Column(db.Boolean, default=False)
    type = db.Column(db.String, default="vault")
    bottom_couchbox_field = db.Column(db.Boolean, default=False)

    def generate_field_id(self, row_name, numerical_identifier):
        return f"{row_name}_{numerical_identifier:02d}"
    
    def to_dict(self):
        return {
            'id': self.id,
            'row_id': self.row_id,
            'field_id': self.field_id,
            'vaults': [vault.id for vault in self.vaults],
            'full': self.full,
            'type': self.type,
            'bottom_couch_box': self.bottom_couchbox_field            
        }