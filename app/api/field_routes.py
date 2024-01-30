from flask import Blueprint, jsonify
from app.models import db, Field, Vault, Row

field_routes = Blueprint('fields', __name__)


@field_routes.route('/')
def get_all_fields():
    fields = Field.query.all()
    return jsonify({ field.id : field.to_dict() for field in fields })

@field_routes.route('/<int:id>', methods=['PUT'])
def toggle_field_type(id):
    field = Field.query.get(id)
    sub_field = Field.query.get(id + 1)

    if not field:
        return jsonify(message="Field not found"), 404

    else:
        if field.type == "vault":
            if field.type == "vault" and sub_field.type == "vault":
                field.type = "couchbox"
                sub_field.bottom_couchbox_field = True
            elif field.type == "couchbox" and sub_field.type == "couchbox":
                field.type = "vault"
                sub_field.type = "vault"
                sub_field.bottom_couchbox_field = False

        db.session.commit()
        return jsonify(field.to_dict())
    
@field_routes.route('/<field_id>')
def get_field(field_id):
    field_id = int(field_id)
    field = Field.query.get(field_id)
    if not field:
        return jsonify(message="Field not found"), 404
    return jsonify(field.to_dict())


from flask import jsonify  # Make sure to import jsonify



@field_routes.route('/<field_id>/vaults')
def get_field_vaults(field_id):
    field_id = int(field_id)
    field = Field.query.get(field_id)
    if not field:
        return jsonify(message="Field not found"), 404
    
    field_vaults = []

    if field.vaults:
        print("🥎")
        for vault in field.vaults:
            print("🍋", vault.to_dict() if hasattr(vault, 'to_dict') else vault)
            if vault and hasattr(vault, 'to_dict'):
                field_vaults.append({
                    'id': vault.id,
                    'customer_id': vault.customer_id,
                    'field_id': vault.field_id,
                    'field_name': vault.field_name,
                    'position': vault.position,
                    'vault_id': vault.vault_id,
                    'order_number': vault.order_number,
                    'staged': vault.staged,
                    'type': vault.type,
                    'customer': vault.customer.to_summary_dict() if vault.customer else None,
                    'attachments': [attachment.to_dict() for attachment in vault.attachments]
                })

    print("✅", [vault for vault in field_vaults])
    return jsonify([vault if not hasattr(vault, 'to_dict') else vault.to_dict() for vault in field_vaults])


@field_routes.route('/<field_id>/row')
def get_field_row(field_id):
    field = Field.query.get(field_id)
    if not field:
        return jsonify(message="Field not found"), 404
    
    # If you have a many-to-one relationship between Field and Row
    # row = field.row.to_dict()

    # If you have a foreign key relationship
    row = Row.query.get(field.row_id).to_dict()

    return jsonify(row)

# @field_routes.route('/<int:field_id>/vaults/<int:vault_id>', methods=['DELETE'])
# def remove_vault_from_field(field_id, vault_id):
#     field = Field.query.get(field_id)
#     if not field:
#         return jsonify(error="Field not found"), 404

#     vault = Vault.query.get(vault_id)

#     if not vault:
#         return jsonify(error="Vault not found"), 404
    
#     if vault.field_id != field_id:
#         return jsonify(error="Vault is not associated with this field"), 400

#     print("❌ in route", field_id, vault_id, field.vaults, "🐚 vault: ", vault)

#     # Remove the vault from the field's vaults relationship
#     vault.field_id = None
#     field.vaults.remove(vault)

#     try:
#         db.session.commit()
#         return {'message': 'Vault removed from field successfully'}
#     except Exception as e:
#         db.session.rollback()
#         return {'error': 'Removing vault from field did not work'}

