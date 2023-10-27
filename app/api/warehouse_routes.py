from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Warehouse, Field, Vault, Stage, db
# from sqlalchemy.orm import make_transient

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

    if not vault:
        return jsonify({'errors': 'Vault not found'}), 404

    # if vault is in storage, set values according to selected warehouse position and move it
    if vault in stage.staged_vaults:
        new_field_id = request.json.get('fieldId')
        new_field_name = request.json.get('fieldName')
        position = request.json.get('position')
        vault.field_id = new_field_id
        vault.field_name = new_field_name
        vault.position = position
        vault.staged = False
        vault.warehouse_id = 1
        vault.stage_id = None

        if vault in stage.staged_vaults:
            stage.staged_vaults.remove(vault)        

    try:
        warehouse.warehouse_vaults.append(vault)
        db.session.add(vault) # not sure if this is needed?
        db.session.commit()
        return jsonify(vault.to_dict())

    except Exception as e:
        db.session.rollback()
        return jsonify({'errors': str(e)}), 500


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
    return [vault.to_dict() for vault in warehouse_vaults]


@warehouse_routes.route('/vaults/<int:vault_id>', methods=['DELETE'])
def remove_vault_from_warehouse(vault_id):
    """
    Remove a vault from the warehouse
    """
    warehouse = Warehouse.query.get(1)  # Assuming there is only one warehouse with ID 1

    if not warehouse:
        return {'errors': 'Warehouse not found'}, 404

    vault = Vault.query.get(vault_id)
    field = Field.query.get(vault.field_id)

    if not vault:
        return {'errors': 'Vault not found'}, 404

    if vault not in warehouse.warehouse_vaults:
        return {'errors': 'Vault is not in the warehouse'}, 400

    warehouse.warehouse_vaults.remove(vault)
    field.full = False
    db.session.commit()

    return {'message': 'Vault removed from the warehouse successfully'}
