from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class Rack(db.Model):
    __tablename__ = 'racks'

    id = db.Column(db.Integer, primary_key=True)
    warehouse_id = db.Column(db.Integer, db.ForeignKey('warehouse.id'), nullable=False)

    contents = db.relationship('RackContent', backref='rack', lazy=True)