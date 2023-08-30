from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class Customer(db.Model, UserMixin):
    __tablename__ = 'customers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    color = db.Column(db.String(100), default='1B3333')
    associated_customer_vaults = db.relationship('Vault', back_populates='customer', cascade='all, delete-orphan')  # Use back_populates


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'color': self.color,
            'vaults': [vault.to_dict() for vault in self.associated_customer_vaults],  # Update relationship name here
        }

    def to_summary_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
