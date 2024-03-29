from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from .company_customers import company_customers


class Company(db.Model, UserMixin):
    __tablename__ = 'companies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String())
    phone = db.Column(db.String(100))
    logo = db.Column(db.String())
    
    vaults = db.relationship('Vault', back_populates='field', foreign_keys='Vault.field_id', lazy='dynamic')
    field_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('fields.id'), ondelete='CASCADE'))
    field = db.relationship('Field', back_populates='vaults', foreign_keys='Vault.field_id')

    # orders - one to many
    company_orders = db.relationship('Company', back_populates='order', foreign_keys='Company.order_id')

    # user - one to many
    company_users = db.relationship('Company', back_populates='user', foreign_keys='Company.user_id')

    # warehouses - one to many
    company_warehouses = db.relationship('Company', back_populates='warehouse', foreign_keys='Company.warehouse_id')

    # customers - many to many
    customers = db.relationship('Customers', secondary=company_customers, back_populates='companies', cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'orders': [order.id for order in self.orders], 
            'users': [user.id for user in self.users], 
            'warehouses': [warehouse.id for warehouse in self.warehouses], 
            'customers': [customer.id for customer in self.customers], 
        }