from .db import db
from sqlalchemy import CheckConstraint

class Rack(db.Model):
    __tablename__ = 'racks'

    id = db.Column(db.Integer, primary_key=True)
    shelves = db.Column(db.Integer, nullable=False)

    warehouse_id = db.Column(db.Integer, db.ForeignKey('warehouse.id'), nullable=False)

    # Relationship with RackContent
    contents = db.relationship('RackContent', backref='rack', lazy=True, cascade="all, delete")

    # Constraint to enforce max 10 shelves
    __table_args__ = (
        CheckConstraint('shelves BETWEEN 1 AND 10', name='check_shelves_limit'),
    )

    def to_dict(self):
        return {
            'id': self.id,
            'shelves': self.shelves,
            'warehouse_id': self.warehouse_id,
            'contents': self.contents
        }