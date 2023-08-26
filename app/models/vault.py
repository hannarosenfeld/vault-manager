from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Vault(db.Model, UserMixin):
    __tablename__ = 'vaults'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    customer = db.Column(db.String(100), nullable=False)
    field = db.Column(db.Integer, nullable=False)
    position = db.Column(db.String(1), nullable=False)
    vault_id = db.Column(db.String(25), nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'customer': self.customer,
            'field': self.field,
            'position': self.position,
            'vault_id': self.vault_id
        }