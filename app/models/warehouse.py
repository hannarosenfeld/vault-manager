from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from .warehouse_users import warehouse_users
from .warehouse_orders import warehouse_orders


class Warehouse(db.Model):
    __tablename__ = 'warehouses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    rows = db.Column(db.Integer)
    cols = db.Column(db.Integer)
    warehouse_fields = db.relationship('Field', back_populates='warehouse', foreign_keys='Field.warehouse_id')
    users = db.relationship('User', secondary=warehouse_users, back_populates='warehouses', cascade='all, delete')
    orders = db.relationship('Order', secondary=warehouse_orders, back_populates='warehouses', cascade='all, delete')
    
    # warehouse_vaults = db.relationship('Vault', back_populates="warehouse")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'rows': self.rows,
            'columns': self.cols,
            'fields': [field.id for field in self.warehouse_fields],
            'orders': [order.id for order in self.orders]
            # 'vaults': [vault.to_dict() for vault in self.warehouse_vaults],
        }
