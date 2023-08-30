from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Field(db.Model):
    __tablename__ = 'fields'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    row_id = db.Column(db.String, db.ForeignKey('rows.id', ondelete='CASCADE'))
    empty = db.Column(db.Boolean, default=True)
    field_id = db.Column(db.String(3), unique=True, nullable=False)
    
    # Establishing the relationship with Vault using back_populates
    vaults = db.relationship('Vault', back_populates='field', lazy=True, cascade='all, delete-orphan')
    row = db.relationship('Row', back_populates='fields')

    def generate_field_id(self, row_id, numerical_identifier):
        return f"{row_id}{numerical_identifier:02d}"

    def to_dict(self):
        return {
            'id': self.id,
            'row_id': self.row_id,
            'field_id': self.field_id,
            'empty': self.empty,
            'vaults': [vault.to_dict() for vault in self.vaults],
        }
