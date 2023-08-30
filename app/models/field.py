from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Field(db.Model, UserMixin):
    __tablename__ = 'fields'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    row_id = db.Column(db.String, db.ForeignKey('rows.id', ondelete='CASCADE'))  # Match data type
    empty = db.Column(db.Boolean, default=True)
    vaults = db.relationship('Vault', foreign_keys='Vault.field_id', backref='field', lazy=True)
    field_id = db.Column(db.String(3), unique=True, nullable=False)

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
