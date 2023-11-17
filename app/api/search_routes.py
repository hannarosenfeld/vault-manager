from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Customer, Order, Field, Warehouse, db

search_routes = Blueprint('search', __name__)


@search_routes.route('/<string:type>/<int:id>')
@login_required
def search_warehouse(id, type):
    """
    Query for all search and returns them in a list of search dictionaries
    """
    print("🍋", id, type)
    # rest of your code...

    if (type == "customer"):
        customer = Customer.query.get(id)
        print("🌺 in router", customer.to_dict())

    if customer:
        customer_vaults = [vault.to_dict() for vault in customer.vaults]

        for vault in customer_vaults:
            print("🌙 in loop", vault)
            field_id = vault['field_id']  # Access 'field_id' from the dictionary
            print("🌙", field_id)
            field = Field.query.get(field_id)
            field.contains_searched_item = True
            print("🔥")
            warehouse = Warehouse.query.get(1)
            warehouse.searchmode = True
            print("🌸", vault)
            db.session.commit()

        return customer.to_dict()

    return jsonify({'error': 'Customer not found'}), 404