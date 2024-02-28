from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Vault(db.Model, UserMixin):
    __tablename__ = 'vaults'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    field_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('fields.id'), ondelete='CASCADE'))
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id'), ondelete='CASCADE'))
    position = db.Column(db.String(100), nullable=False)
    custommer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('customers.id'), ondelete='CASCADE'))
    
    field = db.relationship('Field', back_populates='vaults', foreign_keys='Vault.field_id')
    order = db.relationship('Order', back_populates='order_vaults')
    customer = db.relationship('Customer', back_populates='vaults')
    attachments = db.relationship('Attachment', back_populates='vault', cascade='all, delete-orphan')

    # field_name = db.Column(db.String, db.ForeignKey(add_prefix_for_prod('fields.field_id'), ondelete='CASCADE'))
    # staged = db.Column(db.Boolean, default=False)
    # customer_name = db.Column(db.String(255))
    # type = db.Column(db.String)
    # warehouse_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('warehouse.id'), ondelete='CASCADE'))
    # warehouse = db.relationship('Warehouse', back_populates='warehouse_vaults')
    # stage_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stage.id'), ondelete='CASCADE'), nullable=True)
    # stage = db.relationship('Stage', back_populates='staged_vaults')
    # customer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('customers.id'), ondelete='SET NULL'), nullable=True, index=True)
    # order_name = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'field_id': self.field_id,
            'customer_id': self.customer_id,
            'position': self.position,
            'order_id': self.order_id,
            'type': self.type,
            'attachments': [attachment.to_dict() for attachment in self.attachments],
            # 'warehouse_id': self.warehouse_id
            # 'staged': self.staged,
            # 'vault_id': self.vault_id,

        }

    # def to_summary_dict(self):
    #     return {
    #         'id': self.id,
    #         'position': self.position,
    #         'vault_id': self.vault_id
    #     }
