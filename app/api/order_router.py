from flask import Blueprint, jsonify, request
from app.models import db, Order

order_routes = Blueprint('orders', __name__)

@order_routes.route('/')
def get_all_rows():
    orders = Order.query.all()
    return jsonify([order.to_dict() for order in orders])

@order_routes.route('/<int:id>')
def get_order(id):
    """
    Query for a order by id and returns that order in a dictionary
    """
    order = Order.query.get(id)
    return order.to_dict()
