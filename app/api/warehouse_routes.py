from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Warehouse, Field, Vault, Stage, db

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


@warehouse_routes.route('/vaults/<int:vault_id>', methods=['PUT'])
def add_vault_to_warehouse(vault_id):
    """
    Add a vault back to the warehouse with a new field_id and position
    """
    warehouse = Warehouse.query.get(1)
    vault = Vault.query.get(vault_id)
    stage = Stage.query.get(1)

    print("🍟 in route", vault.customer)
    if not vault:
        return jsonify({'errors': 'Vault not found'}), 404

    new_field_id = request.json.get('fieldId')
    position = request.json.get('position')  # Get the position from the request body

    # if position not in ('T', 'M', 'B'):
    #     return jsonify({'errors': 'Invalid position'}), 400

    # Set the vault's field_id and position to the new values
    vault.field_id = new_field_id
    vault.position = position

    # Mark the vault as not staged
    vault.staged = False
    vault.warehouse_id = 1
    vault.stage_id = None

    # Remove the vault from the stage (assuming you have a similar route for removing from the stage)
    stage.staged_vaults.remove(vault)

    # Add the vault back to the warehouse
    warehouse.warehouse_vaults.append(vault)

    print("🌺 in route:", vault.field_id)

    # Commit the changes to the database
    db.session.commit()

    return jsonify(vault.to_dict()), 200


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


@warehouse_routes.route('/vaults/<int:vault_id>', methods=['DELETE'])
def remove_vault_from_warehouse(vault_id):
    """
    Remove a vault from the warehouse
    """
    warehouse = Warehouse.query.get(1)  # Assuming there is only one warehouse with ID 1

    if not warehouse:
        return {'errors': 'Warehouse not found'}, 404

    vault = Vault.query.get(vault_id)

    if not vault:
        return {'errors': 'Vault not found'}, 404

    if vault not in warehouse.warehouse_vaults:
        return {'errors': 'Vault is not in the warehouse'}, 400

    warehouse.warehouse_vaults.remove(vault)
    db.session.commit()

    return {'message': 'Vault removed from the warehouse successfully'}
