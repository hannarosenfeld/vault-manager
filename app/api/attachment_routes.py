from flask import Blueprint, jsonify
from app.models import db, Vault

attachment_routes = Blueprint('attachments', __name__)

@attachment_routes.route('/<int:vaultId>')
def get_all_vault_attachments(vaultId):
    vault = Vault.query.get(vaultId)
    attachments = vault.attachments

    return { attachment.id : attachment.to_dict() for attachment in attachments }