from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(db.String)

    order_vaults = db.relationship('Vault', back_populates="order", lazy='joined')

    def to_dict(self):
        return {
            'id': self.id,
            'order_number': self.order_number,
            'order_vaults': [vault.to_dict() for vault in self.order_vaults]
        }
