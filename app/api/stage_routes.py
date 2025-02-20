from flask import Blueprint, request, jsonify
from app.models import Vault, db

stage_routes = Blueprint('stage', __name__)

@stage_routes.route('/vaults/<int:vault_id>', methods=['POST'])
def stage_vault(vault_id):
    try:
        vault = Vault.query.get(vault_id)
        
        if not vault:
            return jsonify({"error": "Vault not found"}), 404

        vault.field_id = None
        vault.position = None
        db.session.commit()

        return jsonify(vault.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@stage_routes.route('/vaults', methods=['GET'])
def get_all_staged_vaults():
    try:
        staged_vaults = Vault.query.filter_by(field_id=None).all()
        return jsonify([vault.to_dict() for vault in staged_vaults]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500