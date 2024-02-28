from .db import db, add_prefix_for_prod

warehouse_users = db.Table(
    'warehouse_users',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('warehouse_id', db.Integer, db.ForeignKey(add_prefix_for_prod('warehouses.id')), primary_key=True)
)