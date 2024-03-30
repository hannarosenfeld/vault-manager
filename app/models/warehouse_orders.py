from .db import db, add_prefix_for_prod

warehouse_orders = db.Table(
    'warehouse_orders',
    db.Model.metadata,
    db.Column('order_id', db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id')), primary_key=True),
    db.Column('warehouse_id', db.Integer, db.ForeignKey(add_prefix_for_prod('warehouses.id')), primary_key=True)
)