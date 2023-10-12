from flask import Blueprint, jsonify
from app.models import db, Order

order_routes = Blueprint('orders', __name__)

@order_routes.route('/')
def get_all_rows():
    orders = Order.query.all()
    return jsonify([order.to_dict() for order in orders])
