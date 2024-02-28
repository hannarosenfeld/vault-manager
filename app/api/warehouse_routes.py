from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Warehouse, Field, Vault, db

warehouse_routes = Blueprint('warehouse', __name__)


@warehouse_routes.route('/user/<int:user_id>', methods=['GET'])
def get_warehouses(user_id):
    """
    Retrieve all warehouses
    """
    warehouses = Warehouse.query.all()

    if not warehouses:
        return {'errors': 'No warehouses found!'}, 404

    return {warehouse.id: warehouse.to_dict() for warehouse in warehouses}


@warehouse_routes.route('/<int:warehouse_id>', methods=['GET'])
def get_warehouse_info(warehouse_id):
    """
    Retrieve information about the warehouse
    """
    warehouse = Warehouse.query.get(warehouse_id)

    if not warehouse:
        return {'errors': 'Warehouse not found'}, 404

    return {'warehouse_info': warehouse.to_dict()}


# # TODO : edit this route for new schema
# @warehouse_routes.route('/vaults/<int:vault_id>', methods=['PUT'])
# def add_vault_to_warehouse(vault_id):
#     """
#     Add a vault back to the warehouse with a new field_id and position
#     """
#     warehouse = Warehouse.query.get(1)
#     vault = Vault.query.get(vault_id)
#     stage = Stage.query.get(1)

#     if not vault:
#         return jsonify({'errors': 'Vault not found'}), 404

#     # if vault is in storage, set values according to selected warehouse position and move it
#     if vault in stage.staged_vaults:
#         new_field_id = request.json.get('fieldId')
#         # new_field_name = request.json.get('fieldName')
#         position = request.json.get('position')
#         vault.field_id = new_field_id
#         # vault.field_name = new_field_name
#         vault.position = position
#         vault.staged = False
#         vault.warehouse_id = 1
#         vault.stage_id = None

#         if vault in stage.staged_vaults:
#             stage.staged_vaults.remove(vault)

#     try:
#         warehouse.warehouse_vaults.append(vault)
#         db.session.commit()
#         return jsonify(vault.to_dict())

#     except Exception as e:
#         db.session.rollback()
#         return jsonify({'errors': str(e)}), 500


# @warehouse_routes.route('/vaults', methods=['GET'])
# @login_required
# def get_warehouse_vaults():
#     """
#     Retrieve all vaults in the warehouse
#     """
#     warehouse = Warehouse.query.get(1)  # Assuming there is only one warehouse with ID 1

#     if not warehouse:
#         return {'errors': 'Warehouse not found'}, 404

#     warehouse_vaults = warehouse.warehouse_vaults
#     return [vault.to_dict() for vault in warehouse_vaults]


# @warehouse_routes.route('/vaults/<int:vault_id>', methods=['DELETE'])
# def remove_vault_from_warehouse(vault_id):
#     """
#     Remove a vault from the warehouse
#     """
#     warehouse = Warehouse.query.get(1)  # Assuming there is only one warehouse with ID 1

#     if not warehouse:
#         return {'errors': 'Warehouse not found'}, 404

#     vault = Vault.query.get(vault_id)
#     field = Field.query.get(vault.field_id)

#     if not vault:
#         return {'errors': 'Vault not found'}, 404

#     if vault not in warehouse.warehouse_vaults:
#         return {'errors': 'Vault is not in the warehouse'}, 400

#     warehouse.warehouse_vaults.remove(vault)
#     field.full = False
#     db.session.commit()

#     return {'message': 'Vault removed from the warehouse successfully'}


@warehouse_routes.route('/add-warehouse', methods=['POST'])
def add_warehouse():
    """
    Add a new warehouse along with rows and fields.
    """
    data = request.json
    name = data.get('name')
    rows = data.get('numRows')
    cols = data.get('numCols')

    try:
        # Create warehouse
        warehouse = Warehouse(name=name)
        db.session.add(warehouse)
        warehouse.name = name
        warehouse.rows = rows
        warehouse.cols = cols
        db.session.commit()

        # Fetch warehouse with associated rows and fields
        warehouse = Warehouse.query.filter_by(name=name).first()
        warehouse_id = warehouse.id

        # Create colums and fields
        for col_num in range(1, cols + 1):
            col_name = chr(ord('A') + (col_num - 1) % 26)
            # row = Row(name=col_name, warehouse=warehouse)
            # db.session.add(row)

        for field_num in range(1, cols + 1):
            field_name = f"{col_name}{field_num}"
            field = Field(
                name=field_name,
                warehouse_id = warehouse_id, #might change this to warehouse.id
                full=False,
                type='vault',
                vaults=[]
                # row=row,
                # field_id=field_id,
                # warehouse=warehouse,
                # bottom_couchbox_field=False,
            )
            db.session.add(field)        

        db.session.commit()

        return jsonify(warehouse.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

    except Exception as e:
        db.session.rollback()
        return jsonify({'errors': str(e)}), 500
