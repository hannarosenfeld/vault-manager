from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from .warehouse_orders import warehouse_orders
from .field_orders import field_orders


class Order(db.Model, UserMixin):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    order_vaults = db.relationship('Vault', back_populates="order")
    warehouses = db.relationship('Warehouse', secondary=warehouse_orders, back_populates='orders', cascade='all, delete')
    fields = db.relationship('Field', secondary=field_orders, back_populates='orders', cascade='all, delete')

    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'vaults': [vault.id for vault in self.order_vaults],
            'warehouses': [warehouse.id for warehouse in self.warehouses],
            'fields': [field.id for field in self.fields]
        }
