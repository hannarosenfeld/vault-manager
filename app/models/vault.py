from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class Vault(db.Model, UserMixin):
    __tablename__ = 'vaults'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)
    field_id = db.Column(db.Integer, db.ForeignKey('fields.id'), nullable=False)
    field = db.Column(db.String(10), nullable=False)
    position = db.Column(db.String(100), nullable=False)
    vault_id = db.Column(db.String(100), nullable=False)

    customer = db.relationship('Customer', backref='associated_customer')

    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'field_id': self.field_id,
            'position': self.position,
            'vault_id': self.vault_id,
            'customer': self.customer.to_summary_dict() if self.customer else None  # Use a summary dict for customer
        }
    
    def to_summary_dict(self):
        return {
            'id': self.id,
            'position': self.position,
            'vault_id': self.vault_id
        }