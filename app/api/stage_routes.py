from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Vault, Stage, db

stage_routes = Blueprint('stage', __name__)

@stage_routes.route('/<int:id>', methods=['PUT'])
def stage_vault(id):
    """
    Stage a vault by setting the 'staged' property to True and associating it with the stage.
    """

    vault = Vault.query.get(id)
    print("🪴 in route", vault)

    if not vault:
        return {'errors': 'Vault not found'}, 404

    # Set the 'staged' property to True
    vault.staged = True

    # Get the existing stage or create one if it doesn't exist
    stage = Stage.query.first() or Stage()

    # Add the vault to the 'staged_vaults' relationship
    stage.staged_vaults.append(vault)

    db.session.commit()  # Commit the changes to the database

    return vault.to_dict()


@stage_routes.route('/', methods=['GET'])
def get_staged_vaults():
    """
    Query for all staged vaults in the stage and return them in a list of vault dictionaries
    """
    stage = Stage.query.first()

    if not stage:
        return {'staged_vaults': []}  # Return an empty list if there's no stage

    staged_vaults = stage.staged_vaults
    return {'staged_vaults': [vault.to_dict() for vault in staged_vaults]}