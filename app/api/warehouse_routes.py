from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Warehouse, Vault, db

warehouse_routes = Blueprint('warehouse', __name__)

@warehouse_routes.route('/add_vault', methods=['POST'])
@login_required
def add_vault_to_warehouse():
    """
    Add a vault to the warehouse
    """
    data = request.get_json()
    vault_id = data.get('vault_id')

    if not vault_id:
        return {'errors': 'vault_id is required'}, 400

    warehouse = Warehouse.query.get(1)  # Assuming there is only one warehouse with ID 1

    if not warehouse:
        return {'errors': 'Warehouse not found'}, 404

    vault = Vault.query.get(vault_id)

    if not vault:
        return {'errors': 'Vault not found'}, 404

    if vault in warehouse.warehouse_vaults:
        return {'errors': 'Vault is already in the warehouse'}, 400

    warehouse.warehouse_vaults.append(vault)
    db.session.commit()

    return {'message': 'Vault added to warehouse successfully'}


@warehouse_routes.route('/', methods=['GET'])
@login_required
def get_warehouse_vaults():
    """
    Retrieve all vaults in the warehouse
    """
    warehouse = Warehouse.query.get(1)  # Assuming there is only one warehouse with ID 1

    if not warehouse:
        return {'errors': 'Warehouse not found'}, 404

    warehouse_vaults = warehouse.warehouse_vaults
    return {'warehouse_vaults': [vault.to_dict() for vault in warehouse_vaults]}
