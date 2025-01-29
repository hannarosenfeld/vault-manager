from .db import db

class RackContent(db.Model):
    __tablename__ = 'rack_contents'

    id = db.Column(db.Integer, primary_key=True)
    pallet_number = db.Column(db.String(50), nullable=True)

    content_type = db.Column(db.Enum('couch', 'pallet', name='content_type_enum'), nullable=False)

    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    description = db.Column(db.Text, nullable=True)

    rack_id = db.Column(db.Integer, db.ForeignKey('rack.id'), nullable=False)

    # Relationships
    rack = db.relationship('Rack', backref='contents')
    customer = db.relationship('Customer', backref='rack_contents')

    def to_dict(self):
        return {
            'id': self.id,
            'pallet_number': self.pallet_number,
            'content_type': self.content_type,
            'customer_id': self.customer_id,
            'description': self.description,
            'rack_id': self.rack_id
        }    