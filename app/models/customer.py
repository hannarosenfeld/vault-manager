from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Customer(db.Model, UserMixin):
    __tablename__ = 'customers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    # orders = db.relationship('Order', back_populates='customer')
    vaults = db.relationship('Vault', back_populates='customer')

    # color = db.Column(db.String(100), default='1B3333')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'orders': [order.id for order in self.orders], 
            'vaults': [vault.id for vault in self.vaults], 
            # 'color': self.color,
        }