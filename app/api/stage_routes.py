from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Stage, Warehouse, Row, Field, Vault, db

stage_routes = Blueprint('stage', __name__)


@stage_routes.route('/', methods=['GET'])
def get_stage_info():
    """
    Retrieve information about the stage
    """
    stage = Stage.query.get(1)  # Assuming there is only one stage with ID 1

    if not stage:
        return {'errors': 'Stage not found'}, 404

    return {'stage_info': stage.to_dict()}


@stage_routes.route('/vaults/<int:vault_id>', methods=['PUT'])
def add_vault_to_stage(vault_id):
    """
    Add a vault to the stage
    """
    stage = Stage.query.get(1) 
    warehouse = Warehouse.query.get(1)

    if not stage:
        return jsonify({'errors': 'Stage not found'}), 404

    vault = Vault.query.get(vault_id)

    if not vault:
        return jsonify({'errors': 'Vault not found'}), 404

    if vault.staged:
        return jsonify({'errors': 'Vault is already staged'}), 400

    # # Fetch the field from which the vault needs to be removed
    # field = Field.query.get(vault.field_id)
    # if field is None:
    #     return jsonify({'errors': 'Field not found for this vault'}), 404
    # field.vaults.remove(vault)
    # warehouse.warehouseVaults.remove(vault)
    
    vault.field_id = None
    vault.field_name = ''
    vault.position = ''
    vault.staged = True
    
    stage.staged_vaults.append(vault)

    print("🍋", {'vault' : vault.to_dict()})
    db.session.commit()

    return {'vault' : vault.to_dict()}


@stage_routes.route('/vaults', methods=['GET'])
@login_required
def get_staged_vaults():
    """
    Retrieve all staged vaults in the stage
    """
    stage = Stage.query.get(1)  # Assuming there is only one stage with ID 1
    if not stage:
        return {'errors': 'Stage not found'}, 404

    staged_vaults = stage.staged_vaults
    return {'staged_vaults': [vault.to_dict() for vault in staged_vaults]}


@stage_routes.route('/vaults/<int:vault_id>', methods=['DELETE'])
def remove_vault_from_stage(vault_id):
    """
    Remove a vault from the stage
    """
    stage = Stage.query.get(1)  # Assuming there is only one stage with ID 1

    if not stage:
        return {'errors': 'Stage not found'}, 404

    vault = Vault.query.get(vault_id)

    if not vault:
        return {'errors': 'Vault not found'}, 404

    if vault not in stage.staged_vaults:
        return {'errors': 'Vault is not staged'}, 400

    stage.staged_vaults.remove(vault)
    db.session.commit()

    return {'message': 'Vault removed from the stage successfully'}
