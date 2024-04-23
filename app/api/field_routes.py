from flask import Blueprint, jsonify, request
from app.models import db, Field, Vault, Warehouse
from app.forms import EditFieldForm, PostFieldForm

field_routes = Blueprint('fields', __name__)


@field_routes.route('/<int:warehouseId>')
def get_all_fields(warehouseId):
    # fields = Field.query.all()
    fields = Field.query.filter_by(warehouse_id=warehouseId)
    return jsonify({ field.id : field.to_dict() for field in fields })

@field_routes.route('/', methods=['POST', 'DELETE'])
def add_field():

    form = PostFieldForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    def update_char(name, increment):
        if 'A' <= name[0] <= 'Z':
            char_num = ord(name[0])
            name = chr(char_num+increment)+name[1:]
            return name

    try:
        if form.validate_on_submit():
            warehouse_id = form.data['warehouse_id']
            direction = form.data['direction']
            opperation = form.data['opperation']
            warehouse_columns = form.data['warehouse_columns']
            warehouse_rows = form.data['warehouse_rows']
            count = form.data['count']
            res = []
            fields = Field.query.filter_by(warehouse_id=warehouse_id)
            warehouse = Warehouse.query.get(warehouse_id)

            if request.method == 'POST' and opperation == 'add':

                if direction == 'left':
                    warehouse.cols = warehouse.cols + count # increase columns by count

                    for field in fields:
                        new_name = update_char(field.name, count)
                        field.name = new_name
                        res.append(field.to_dict())
                    for i in range(1, count+1):
                        col_char = chr(64+i)
                        for j in range(1, warehouse_rows+1):
                            name = f"{col_char}{j}"
                            print(name)
                            new_field = Field(name=name, warehouse=warehouse)
                            db.session.add(new_field)
                            db.session.commit()
                            res.append(new_field.to_dict())

                    db.session.commit()
                    return { 'fields': res, 'warehouseId': warehouse_id }

                if direction == 'right':
                    warehouse.cols = warehouse.cols + count # increase columns by count

                    largest_field_name_letter = max([field.name for field in fields])
                    largest_field_name_letter_as_number = ord(largest_field_name_letter[0])
                    for i in range(1, count+1):

                        col_char = chr(largest_field_name_letter_as_number+i)
                        for j in range(1, warehouse_rows+1):
                            name = f"{col_char}{j}"
                            print(name)
                            new_field = Field(name=name, warehouse=warehouse)
                            db.session.add(new_field)
                            db.session.commit()
                            res.append(new_field.to_dict())
                    return { 'fields': res, 'warehouseId': warehouse_id }
                
                elif direction == 'bottom':
                    letters = sorted(set([field.name[0] for field in fields]))

                    for letter in letters:
                        for i in range(1, count+1):                        
                            new_field = Field(name=f"{letter}{warehouse.rows + i}", warehouse=warehouse)
                            db.session.add(new_field)
                            db.session.commit()
                            res.append(new_field.to_dict())

                    warehouse.rows = warehouse.rows + count
                    db.session.commit()
                    return { 'fields': res, 'warehouseId': warehouse_id }
                
                else:
                    return jsonify(message="direction not specified")

            elif request.method == 'DELETE' and opperation == 'subtract':
                if direction == 'left':
                    warehouse.cols = warehouse.cols - count # decreasing warehouse cols by count
                    # for count, for each iteration, find smallest letter, then delete all fields with that letter
                    for i in range(1, count+1):
                        smallest_field_name_letter = min([field.name for field in fields])[0]
                        all_fields_with_that_letter = Field.query.filter(Field.name.like(f'{smallest_field_name_letter}%')).all()
                        for field in all_fields_with_that_letter:
                            db.session.delete(field)
                            db.session.commit()

                    for i in range(1, count+1):
                        new_fields = Field.query.filter_by(warehouse_id=warehouse_id)
                        for field in new_fields:
                            new_field_name = f"{chr(ord(field.name[0]) - 1)}{field.name[1:]}"
                            field.name = new_field_name
                            db.session.commit()

                elif direction == 'right':
                    warehouse.cols = warehouse.cols - count # decreasing warehouse cols by count

                    for i in range(1, count+1):
                        smallest_field_name_letter = max([field.name for field in fields])[0]
                        all_fields_with_that_letter = Field.query.filter(Field.name.like(f'{smallest_field_name_letter}%')).all()
                        for field in all_fields_with_that_letter:
                            db.session.delete(field)
                            db.session.commit()        

                elif direction == 'bottom':
                    letters = sorted(set([field.name[0] for field in fields]))
                    for letter in letters:
                        for i in range(warehouse.rows-count+1, warehouse.rows+1):                        
                            field_to_delete = Field.query.filter_by(name=f"{letter}{i}", warehouse=warehouse).first()
                            field_id = field_to_delete.id
                            res.append(field_id)
                            db.session.delete(field_to_delete)
                            db.session.commit()
                            
                    new_warehouse_row_count = warehouse.rows - count
                    warehouse.rows = new_warehouse_row_count
                    db.session.commit()                

                    return { 'fields': res, 'warehouseId': warehouse.id, 'newWarehouseRowsCount': new_warehouse_row_count }

                else:
                    return jsonify(message="direction not specified")
            else:
                return jsonify(message="method or opperation are not correct")


    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    # return jsonify({'errors': form.errors}), 400
    # return jsonify({'errors': '🪐 there is some other error'}), 400
        



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
                if checkVaultCount(field1.vaults) > 0 or checkVaultCount(field2.vaults) > 0:
                    return jsonify(message="Please stage all vaults in fields to continue")

                if not field2:
                    return jsonify(message="Field 2 not found"), 404

                if field1.type == 'vault' and field2.type == 'vault':
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