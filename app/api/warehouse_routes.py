from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Warehouse, Vault, db

warehouse_routes = Blueprint('warehouse', __name__)


@warehouse_routes.route('/', methods=['GET'])
def get_warehouse_info():
    """
    Retrieve information about the warehouse
    """
    warehouse = Warehouse.query.get(1)  # Assuming there is only one warehouse with ID 1

    if not warehouse:
        return {'errors': 'Warehouse not found'}, 404

    return {'warehouse_info': warehouse.to_dict()}

print("🍄 in router")

@warehouse_routes.route('/vaults/<int:vault_id>', methods=['PUT'])
def add_vault_to_warehouse(vault_id):
    """
    Add a vault to the warehouse
    """
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

    return {'message': 'Vault added to the warehouse successfully'}


@warehouse_routes.route('/vaults', methods=['GET'])
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
