from .db import db


class Attachment(db.Model):
    __tablename__ = 'attachments'

    id = db.Column(db.Integer, primary_key=True)
    vault_id = db.Column(db.Integer, db.ForeignKey('vaults.id'), nullable=False)
    file_url = db.Column(db.String, nullable=False)
    unique_name = db.Column(db.String, nullable=False) # add unique name for S3 upload

    vault = db.relationship('Vault', back_populates='attachments')
