from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Field(db.Model, UserMixin):
    __tablename__ = 'fields'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String(20))
    type = db.Column(db.String, default="vault")
    vaults = db.relationship('Vault', back_populates='field', foreign_keys='Vault.field_id', lazy='dynamic')
    full = db.Column(db.Boolean, default=False)

    warehouse_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('warehouses.id')))
    warehouse = db.relationship('Warehouse', back_populates='warehouse_fields')

    def generate_name(self, col_name, numerical_identifier):
        return f"{col_name}_{numerical_identifier:02d}"


    # row_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('rows.id')))
    # row = db.relationship('Row', back_populates='fields')
    # bottom_couchbox_field = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'vaults': [vault.id for vault in self.vaults],
            'warehouse_id': self.warehouse_id,
            'full': self.full
            # 'bottom_couch_box': self.bottom_couchbox_field            
            # 'row_id': self.row_id,
        }