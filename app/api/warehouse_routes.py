from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Warehouse, Field, Vault, db

warehouse_routes = Blueprint('warehouse', __name__)


@warehouse_routes.route('/<int:warehouse_id>', methods=['DELETE'])
def delete_warehouse(warehouse_id):
    warehouse = Warehouse.query.get(warehouse_id)
    if not warehouse:
        return jsonify({'error': 'Warehouse not found'}), 404
    
    db.session.delete(warehouse)
    db.session.commit()
    return jsonify({'message': 'Warehouse deleted successfully'}), 200

@warehouse_routes.route('/', methods=['GET'])
@login_required
def get_warehouses():
    """
    Retrieve all warehouses
    """
    company_id = current_user.company_id
    warehouses = Warehouse.query.filter(Warehouse.company_id == company_id).all()

    if not warehouses:
        return {'errors': 'No warehouses found!'}, 404

    return [warehouse.to_dict() for warehouse in warehouses]


@warehouse_routes.route('/<int:warehouse_id>', methods=['GET'])
def get_warehouse_info(warehouse_id):
    """
    Retrieve information about the warehouse
    """
    warehouse = Warehouse.query.get(warehouse_id)

    if not warehouse:
        return {'errors': 'Warehouse not found'}, 404

    return {'warehouse_info': warehouse.to_dict()}


@warehouse_routes.route('/add-warehouse', methods=['POST'])
def add_warehouse():
    """
    Add a new warehouse along with rows and fields.
    """
    company_id = current_user.company_id
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
        warehouse.company_id = company_id
        db.session.commit()

        # Fetch warehouse with associated rows and fields
        warehouse = Warehouse.query.filter_by(name=name).first()
        warehouse_id = warehouse.id

        # Create colums and fields
        for i in range(1, cols + 1):
            col_char = chr(64+i)
            for field_num in range(1, rows + 1):
                field_name = f"{col_char}{field_num}"
                field = Field(
                    name=field_name,
                    warehouse_id = warehouse_id, #might change this to warehouse.id
                    full=False,
                    type='vault',
                    vaults=[]
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
