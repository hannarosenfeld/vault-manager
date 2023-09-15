from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Stage(db.Model, UserMixin):
    __tablename__ = 'stage'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    staged_vaults = db.relationship('Vault', back_populates="stage", lazy='joined', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'vaults': [vault.to_dict() for vault in self.staged_vaults],
        }
