from flask import Blueprint, jsonify, request
from app.models import db, Order

order_routes = Blueprint('orders', __name__)

@order_routes.route('/')
def get_all_rows():
    orders = Order.query.all()
    return jsonify([order.to_dict() for order in orders])

@order_routes.route('/', methods=['POST'])
def add_order():
    data = request.get_json()
    order_number = data.get('order_number')  # Assuming you send the order_number in the JSON data
    # Check if the order number already exists
    existing_order = Order.query.filter_by(order_number=order_number).first()
    if existing_order:
        return jsonify({'error': 'Order number already exists'}), 400

    # Create a new order
    new_order = Order(order_number=order_number)
    db.session.add(new_order)
    db.session.commit()

    return jsonify(new_order.to_dict()), 201
