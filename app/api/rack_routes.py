from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Rack, Warehouse, db
from sqlalchemy.exc import IntegrityError

rack_routes = Blueprint('rack', __name__)

# Route to get all racks for a specific warehouse
@rack_routes.route('/<int:warehouse_id>', methods=['GET'])
@login_required
def get_racks(warehouse_id):
    """
    Retrieve all racks for a specific warehouse
    """

    warehouse = Warehouse.query.get(warehouse_id)

    if not warehouse:
        return jsonify({'error': 'Warehouse not found'}), 404

    racks = Rack.query.filter(Rack.warehouse_id == warehouse_id).all()

    print("🚧 racks: ", racks)

    if not racks:
        return jsonify({'error': 'No racks found for this warehouse'}), 404

    return jsonify([rack.to_dict() for rack in racks])


# Route to create a new rack for a specific warehouse
@rack_routes.route('/<int:warehouse_id>', methods=['POST'])
@login_required
def create_rack(warehouse_id):
    """
    Create a new rack in the specified warehouse
    """
    warehouse = Warehouse.query.get(warehouse_id)

    if not warehouse:
        return jsonify({'error': 'Warehouse not found'}), 404

    data = request.json
    shelves = data.get('shelves')
    wall_side = data.get('wall_side')
    position = data.get('position')

    if not shelves or not wall_side or not position:
        return jsonify({'error': 'Missing required data (shelves, wall_side, position)'}), 400

    # Create the new rack
    try:
        rack = Rack(
            shelves=shelves,
            wall_side=wall_side,
            position=position,
            warehouse_id=warehouse_id
        )
        db.session.add(rack)
        db.session.commit()

        return jsonify(rack.to_dict()), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Integrity error, check the data constraints'}), 400

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
