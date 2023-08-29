from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Row(db.Model, UserMixin):
    __tablename__ = 'rows'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.String, primary_key=True)
    fields = db.relationship('Field', backref='row', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'fields': [field.to_dict() for field in self.fields],
        }