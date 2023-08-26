from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Vault

vault_routes = Blueprint('vaults', __name__)


@vault_routes.route('/')
def all_vaults():
    """
    Query for all vaults and returns them in a list of vault dictionaries
    """
    vaults = Vault.query.all()
    return {'vaults': [vault.to_dict() for vault in vaults]}

@vault_routes.route('/<int:id>')

def single_vault(id):
    """
    Query for a vault by id and returns that vault in a dictionary
    """
    vault = Vault.query.get(id)
    return vault.to_dict()
