from flask import Blueprint, jsonify
from app.models import Customer

customers_routes = Blueprint('customers', __name__)

@customers_routes.route('/')
def all_customers():
    """
    Query for all customers and returns them in a list of customer dictionaries
    """
    customers = Customer.query.all()
    return {'customers': [customer.to_dict() for customer in customers]}

@customers_routes.route('/<int:id>')
def single_customer(id):
    """
    Query for a customer by id and returns that customer in a dictionary
    """
    customer = Customer.query.get(id)
    return customer.to_dict()
