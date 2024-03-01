from flask import Blueprint, jsonify
from app.models import db, Field, Vault

field_routes = Blueprint('fields', __name__)


@field_routes.route('/<int:warehouseId>')
def get_all_fields(warehouseId):
    fields = Field.query.all()
    Field.query.filter_by(warehouse_id=warehouseId)
    return jsonify({ field.id : field.to_dict() for field in fields })


@field_routes.route('/<int:id>', methods=['PUT'])
def edit_field(id):

    form = EditFieldForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    try:
        if form.validate_on_submit():

            print("EDIT FIELD FORM DATA ======> ", form.data)

            name = form.data['name']
            type = form.data['type']
            field_id_1 = form.data['field_id_1']
            field_id_2 = form.data['field_id_2']

            field1 = Field.query.get(field_id_1)

            if not field1:
                return jsonify(message="Field 1 not found"), 404

            if name:
                field1.name = name

            if type == 'couchbox':
                field2 = Field.query.get(field_id_2)

                if len(field1.vaults) > 0 or len(field2.vaults) > 0:
                    return jsonify(message="Please stage all vaults in fields to continue")

                if not field2:
                    return jsonify(message="Field 2 not found"), 404

                if field1.type == 'vault' and field.type2 == 'vault':
                    field1.type = 'couchbox-T'
                    field2.type = 'couchbox-B'
                else:
                    return jsonify(message="Cannot switch to couchbox")

                db.session.commit()

                return jsonify([field1.to_dict(), field2.to_dict()])

            if type == 'vault':

                if len(field1.vaults) > 0:
                    return jsonify(message="Please stage all vaults in field to continue")

                if field1.type == 'couchbox-T' and field.type2 == 'couchbox-B':
                    field1.type = 'vault'
                    field2.type = 'vault'
                else: 
                    return jsonify(message="Cannot switch to vault")
                
                db.session.commit()

                return jsonify([field1.to_dict(), field2.to_dict()])

            db.session.commit()
            return jsonify(field1.to_dict())

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400