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


# @warehouse_routes.route('/vaults/<int:vault_id>', methods=['PUT'])
# def add_vault_to_warehouse(vault_id):
#     """
#     Add a vault to the warehouse
#     """
#     warehouse = Warehouse.query.get(1)  # Assuming there is only one warehouse with ID 1

#     if not warehouse:
#         return {'errors': 'Warehouse not found'}, 404

#     vault = Vault.query.get(vault_id)

#     if not vault:
#         return {'errors': 'Vault not found'}, 404

#     if vault in warehouse.warehouse_vaults:
#         return {'errors': 'Vault is already in the warehouse'}, 400

#     warehouse.warehouse_vaults.append(vault)
#     db.session.commit()

#     return {'message': 'Vault added to the warehouse successfully'}


@warehouse_routes.route('/vaults/<int:vault_id>', methods=['PUT'])
def add_vault_to_warehouse(vault_id):
    """
    Add a vault back to the warehouse with a new field_id
    """
    warehouse = Warehouse.query.get(1)  
    vault = Vault.query.get(vault_id)
    stage = Stage.query.get(1)

    if not vault:
        return jsonify({'errors': 'Vault not found'}), 404

    # # Fetch the field from which the vault needs to be removed
    # field = Field.query.get(vault.field_id)

    # if field is None:
    #     return jsonify({'errors': 'Field not found for this vault'}), 404

    # Set the vault's field_id to the new field_id
    new_field_id = request.json.get('fieldId')  # Get the new fieldId from the request body
    vault.field_id = new_field_id

    # Mark the vault as not staged
    vault.staged = False
    vault.warehouse_id=1
    vault.stage_id=None
    
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
