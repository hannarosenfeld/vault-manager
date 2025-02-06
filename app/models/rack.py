from .db import db
from sqlalchemy import CheckConstraint, Enum

class Rack(db.Model):
    __tablename__ = 'racks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    shelves = db.Column(db.Integer, nullable=False)
    wall_side = db.Column(Enum('top-left', 'top-right', 'bottom', 'left', 'right', name='wall_side_enum'), nullable=False)
    orientation = db.Column(Enum('horizontal', 'vertical', name='position_enum'), nullable=False)
    position = db.Column(db.String(20), nullable=False, unique=True)
    
    warehouse_id = db.Column(db.Integer, db.ForeignKey('warehouses.id'), nullable=False)

    # Relationship with RackContent
    contents = db.relationship('RackContent', backref='rack', lazy=True, cascade="all, delete")

    # Constraints
    __table_args__ = (
        CheckConstraint('shelves BETWEEN 1 AND 10', name='check_shelves_limit'),
    )

    def to_dict(self):
        return {
            'id': self.id,
            'shelves': self.shelves,
            'wall_side': self.wall_side,
            'position': self.position,
            'orientation': self.orientation,
            'warehouse_id': self.warehouse_id,
            'contents': self.contents
        }
