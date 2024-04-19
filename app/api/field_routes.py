from flask import Blueprint, jsonify, request
from app.models import db, Field, Vault
from app.forms import EditFieldForm, PostFieldForm

field_routes = Blueprint('fields', __name__)


@field_routes.route('/<int:warehouseId>')
def get_all_fields(warehouseId):
    fields = Field.query.all()
    Field.query.filter_by(warehouse_id=warehouseId)
    return jsonify({ field.id : field.to_dict() for field in fields })

@field_routes.route('/<int:dir>/<int:count>', methods=['POST', 'DELETE'])
def add_field():
    form = PostFieldForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    try:
        if form.validate_on_submit():
            warehouse_id = form.data['warehouse_id']
            direction = form.data['direction']
            opperation = form.data['opperation']
            warehouse_columns = form.data['warehouse_columns']
            warehouse_rows = form.data['warehouse_rows']
            count = form.data['count']

            if request.method == 'POST' and opperation == 'add':
                if direction == 'left':
                    print('test')

                elif direction == 'right':
                    print('test')
                
                elif direction == 'bottom':
                    print('test')

                else:
                    return jsonify(message="direction not specified")

            elif request.method == 'DELETE' and opperation == 'subtract':
                if direction == 'left':
                    print('test')
                elif direction == 'right':
                    print('test')
                
                elif direction == 'bottom':
                    print('test')

                else:
                    return jsonify(message="direction not specified")
            else:
                return jsonify(message="method or opperation are not correct")


    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400
        



@field_routes.route('/single/<int:id>', methods=['PUT'])
def toggle_field_full(id):

    form = EditFieldForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    try:
        if form.validate_on_submit():

            field1 = Field.query.get(id)

            field1.full = not(field1.full)

            db.session.commit()
            return jsonify(field1.to_dict())


    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400



@field_routes.route('/<int:id>/', methods=['PUT'])
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
            field2 = Field.query.get(field_id_2)


            if not field1:
                return jsonify(message="Field 1 not found"), 404

            if not field2:
                return jsonify(message="Field 2 not found"), 404


            def checkVaultCount(vaults):
                count = 0
                for vault in vaults:
                    count += 1
                return count

            if type == 'couchbox':

                print("🙃 =======> ", field1)
                print("🙃 =======> ", field2.vaults)

                if checkVaultCount(field1.vaults) > 0 or checkVaultCount(field2.vaults) > 0:
                    return jsonify(message="Please stage all vaults in fields to continue")

                if not field2:
                    return jsonify(message="Field 2 not found"), 404

                if field1.type == 'vault' and field2.type == 'vault':
                    print('🥹 hittingggg')
                    field1.type = 'couchbox-T'
                    field2.type = 'couchbox-B'
                else:
                    return jsonify(message="Cannot switch to couchbox")

                db.session.commit()

                return jsonify([field1.to_dict(), field2.to_dict()])

            if type == 'vault':

                if checkVaultCount(field1.vaults) > 0:
                    return jsonify(message="Please stage all vaults in field to continue")

                if field1.type == 'couchbox-T' and field2.type == 'couchbox-B':
                    field1.type = 'vault'
                    field2.type = 'vault'
                else: 
                    return jsonify(message="Cannot switch to vault")
                
                db.session.commit()

                return jsonify([field1.to_dict(), field2.to_dict()])


    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400