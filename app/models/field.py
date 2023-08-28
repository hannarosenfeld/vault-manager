from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Field(db.Model, UserMixin):
    __tablename__ = 'fields'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    row_id = db.Column(db.String, db.ForeignKey('rows.id'))
    empty = db.Column(db.Boolean, default=True)
    vaults = db.relationship('Vault', backref='field', lazy=True)  # One-to-many relationship with Vault

    def generate_field_id(self, row_id, numerical_identifier):
        # Example: For row_id = 'B' and numerical_identifier = 11, generate 'B11'
        return f"{row_id}{numerical_identifier:02d}"

    def to_dict(self):
        return {
            'id': self.id,
            'row_id': self.row_id,
            'empty': self.empty,
            'vaults': [vault.to_dict() for vault in self.vaults]
        }
