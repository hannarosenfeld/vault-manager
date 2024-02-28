from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

Warehouse_User = db.Table(
    'warehouse_user',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), primary_key=True),
    db.Column('warehouse_id', db.Integer, db.ForeignKey(add_prefix_for_prod('warehouse.id')), primary_key=True)
)