from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Row(db.Model, UserMixin):
    __tablename__ = 'rows'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)  # Changed id column to integer
    name = db.Column(db.String)  # Added a new column called "name"
    fields = db.relationship('Field', back_populates="row")
    warehouse_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('warehouse.id')))
    warehouse = db.relationship('Warehouse', back_populates='warehouse_rows')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,  # Include the name in the to_dict method
            'fields': [field.to_dict() for field in self.fields],
            'warehouse_id': self.warehouse_id
        }
