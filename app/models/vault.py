from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class Vault(db.Model, UserMixin):
    __tablename__ = 'vaults'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('customers.id'), ondelete='SET NULL'), nullable=True, index=True)
    field_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('fields.id'), ondelete='CASCADE'), nullable=False)
    field_name = db.Column(db.String, db.ForeignKey(add_prefix_for_prod('fields.field_id'), ondelete='CASCADE'), nullable=False)
    position = db.Column(db.String(100), nullable=False)
    vault_id = db.Column(db.String(100), nullable=False)

    customer = db.relationship('Customer', back_populates='vaults')
    
    # Specify primaryjoin for field relationship
    field = db.relationship('Field', back_populates='vaults', foreign_keys='Vault.field_id')

    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'field_id': self.field_id,
            'field_name': self.field_name,
            'position': self.position,
            'vault_id': self.vault_id,
            'customer': self.customer.to_summary_dict() if self.customer else None,
        }

    def to_summary_dict(self):
        return {
            'id': self.id,
            'position': self.position,
            'vault_id': self.vault_id
        }
