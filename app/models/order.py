from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Order(db.Model, UserMixin):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    order_vaults = db.relationship('Vault', back_populates="order")
    order_warehouses = db.relationship('Warehouse', back_populates="order", lazy='joined')
    order_fields = db.relationship('Fields', back_populates="order", lazy='joined')

    # order_number = db.Column(db.String)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'vaults': [vault.id for vault in self.order_vaults],
            'warehouses': [warehouse.id for warehouse in self.order_warehouses],
            'fields': [field.id for field in self.order_fields]
        }
