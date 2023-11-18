from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Customer, Order, Field, Warehouse, db

search_routes = Blueprint('search', __name__)


@search_routes.route('/<string:type>/<int:id>', methods=['GET', 'PUT'])
@login_required
def search_warehouse(id, type):
    if request.method == 'GET':
        if (type == "customer"):
            customer = Customer.query.get(id)

            if customer:
                customer_vaults = [vault.to_dict() for vault in customer.vaults]
                fields_containing_searched_customer = []
                for vault in customer_vaults:
                    field_id = vault['field_id']
                    field = Field.query.get(field_id)
                    fields_containing_searched_customer.append(field.id)

            return fields_containing_searched_customer

        if (type == "order"):
            order = Order.query.get(id)

            if order:
                order_vaults = [vault.to_dict() for vault in order.order_vaults]
                fields_containing_searched_order = []    
                for vault in order_vaults:
                    field_id = vault['field_id']
                    field = Field.query.get(field_id)
                    fields_containing_searched_order.append(field.id)
                    
            return fields_containing_searched_order

        return jsonify({'error': 'Item not found'}), 404
    
