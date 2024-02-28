from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Order(db.Model, UserMixin):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    order_vaults = db.relationship('Vault', back_populates="order", lazy='joined')
    order_warehouses = db.relationship('Warehouse', back_populates="order", lazy='joined')
    order_fields = db.relationship('Fields', back_populates="order", lazy='joined')

    # order_number = db.Column(db.String)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'order_vaults': [vault.to_dict() for vault in self.order_vaults],
            'order_warehouses': [vault.to_dict() for vault in self.order_warehouses],
            'order_fields': [vault.to_dict() for vault in self.order_fields]
        }
