from .db import db

class RackContent(db.Model):
    __tablename__ = 'rack_contents'

    id = db.Column(db.Integer, primary_key=True)
    rack_id = db.Column(db.Integer, db.ForeignKey('rack.id'), nullable=False)
    description = db.Column(db.String(255), nullable=False)
