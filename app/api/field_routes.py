from flask import Blueprint, jsonify
from app.models import db, Field, Vault

field_routes = Blueprint('fields', __name__)


@field_routes.route('/')
def get_all_fields():
    fields = Field.query.all()
    return jsonify({ field.id : field.to_dict() for field in fields })


@field_routes.route('/<int:id>', methods=['PUT'])
def toggle_field_type(id):

    form = EditFieldForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    try:
        if form.validate_on_submit():

            name = form.data['name']
            type = form.data['type']
            field_id_1 = form.data['field_id_1']
            field_id_2 = form.data['field_id_2']

            field1 = Field.query.get(field_id_1)

            if not field1:
                return jsonify(message="Field 1 not found"), 404

            field1.name = name

            if type == 'couchbox':
                field2 = Field.query.get(field_id_2)

                if not field2:
                    return jsonify(message="Field 2 not found"), 404

                if field1.type == 'vault' and field.type2 == 'vault':
                    field1.type = 'couchbox-T'
                    field2.type = 'couchbox-B'
                else:
                    return jsonify(message="Cannot switch to couchbox")

                db.session.commit()

                return jsonify([field1.to_dict(), field2.to_dict()])
            # TODO: change field.type to "couchbox-T / couchbox-B"
            # if field.type == "vault" and sub_field.type == "vault":
            #     field.type = "couchbox" 
            #     sub_field.type = "couchbox"
            #     sub_field.bottom_couchbox_field = True
            # elif field.type == "couchbox" and sub_field.type == "couchbox":
            #     field.type = "vault"
            #     sub_field.type = "vault"
            #     sub_field.bottom_couchbox_field = False

            db.session.commit()
            return jsonify(field1.to_dict())
    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400

@field_routes.route('/<field_id>')
def get_field(field_id):
    field_id = int(field_id)
    field = Field.query.get(field_id)
    if not field:
        return jsonify(message="Field not found"), 404
    return jsonify(field.to_dict())


# @field_routes.route('/<field_id>/vaults')
# def get_field_vaults(field_id):
#     field_id = int(field_id)
#     field = Field.query.get(field_id)
#     if not field:
#         return jsonify(message="Field not found"), 404
    
#     field_vaults = []

#     if field.vaults:
#         for vault in field.vaults:
#             if vault and hasattr(vault, 'to_dict'):
#                 field_vaults.append({
#                     'id': vault.id,
#                     'customer_id': vault.customer_id,
#                     'field_id': vault.field_id,
#                     # 'field_name': vault.field_name,
#                     'position': vault.position,
#                     'vault_id': vault.vault_id,
#                     'order_number': vault.order_number,
#                     'staged': vault.staged,
#                     'type': vault.type,
#                     'customer': vault.customer.to_summary_dict() if vault.customer else None,
#                     'attachments': [attachment.to_dict() for attachment in vault.attachments]
#                 })

#     return jsonify([vault if not hasattr(vault, 'to_dict') else vault.to_dict() for vault in field_vaults])


# @field_routes.route('/<field_id>/row')
# def get_field_row(field_id):
#     field = Field.query.get(field_id)
#     if not field:
#         return jsonify(message="Field not found"), 404
    
#     row = Row.query.get(field.row_id).to_dict()

#     return jsonify(row)

