from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Vault(db.Model, UserMixin):
    __tablename__ = 'vaults'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('customers.id'), ondelete='SET NULL'), nullable=True, index=True)
    field_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('fields.id'), ondelete='CASCADE'))
    field_name = db.Column(db.String, db.ForeignKey(add_prefix_for_prod('fields.field_id'), ondelete='CASCADE'), nullable=False)
    position = db.Column(db.String(100), nullable=False)
    vault_id = db.Column(db.String(100), nullable=False)
    staged = db.Column(db.Boolean, default=False)
    customer_name = db.Column(db.String(255))
    order_number = db.Column(db.String, nullable=False)
    type = db.Column(db.String)
    bottom_couchbox_field = db.Column(db.Boolean, default=False)

    customer = db.relationship('Customer', back_populates='vaults')
    
    # Specify primaryjoin for field relationship
    field = db.relationship('Field', back_populates='vaults', foreign_keys='Vault.field_id')

    warehouse_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('warehouse.id'), ondelete='CASCADE'))
    warehouse = db.relationship('Warehouse', back_populates='warehouse_vaults')

    stage_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stage.id'), ondelete='CASCADE'), nullable=True)
    stage = db.relationship('Stage', back_populates='staged_vaults')

    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id'), ondelete='CASCADE'))
    order = db.relationship('Order', back_populates='order_vaults')

    attachments = db.relationship('Attachment', back_populates='vault', cascade='all, delete-orphan')


    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'field_id': self.field_id,
            'field_name': self.field_name,
            'position': self.position,
            'vault_id': self.vault_id,
            'order_number': self.order_number,
            'staged': self.staged,
            'type': self.type,
            'customer': self.customer.to_summary_dict() if self.customer else None,
            'attachments': [attachment.to_dict() for attachment in self.attachments],
            'bottom_couch_box': self.bottom_couchbox_field
        }

    def to_summary_dict(self):
        return {
            'id': self.id,
            'position': self.position,
            'vault_id': self.vault_id
        }
