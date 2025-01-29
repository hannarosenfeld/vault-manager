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
    address = db.Column(db.String)

    company_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('companies.id')))
    company = db.relationship('Company', back_populates='company_warehouses')

    warehouse_fields = db.relationship('Field', back_populates='warehouse', foreign_keys='Field.warehouse_id')

    users = db.relationship(
        'User',
        secondary=warehouse_users,
        back_populates='warehouses',
        cascade='save-update, merge'
    )

    orders = db.relationship('Order', secondary=warehouse_orders, back_populates='warehouses', cascade='all, delete')

    # New Relationship with Racks
    racks = db.relationship('Rack', back_populates='warehouse', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'rows': self.rows,
            'columns': self.cols,
            'fields': [field.id for field in self.warehouse_fields],
            'orders': [order.id for order in self.orders],
            'companyId': self.company_id,
            'companyName': self.company.name,
            'racks': [rack.id for rack in self.racks],
        }
