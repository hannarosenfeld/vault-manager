from .db import db, add_prefix_for_prod

field_orders = db.Table(
    'field_orders',
    db.Model.metadata,
    db.Column('order_id', db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id')), primary_key=True),
    db.Column('field_id', db.Integer, db.ForeignKey(add_prefix_for_prod('fields.id')), primary_key=True)
)