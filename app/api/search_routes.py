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

                for vault in customer_vaults:
                    field_id = vault['field_id']  # Access 'field_id' from the dictionary
                    field = Field.query.get(field_id)
                    field.contains_searched_item = True
                    warehouse = Warehouse.query.get(1)
                    warehouse.searchmode = True
                    db.session.commit()

                return customer.to_dict()

        if (type == "order"):
            order = Order.query.get(id)

            if order:
                order_vaults = [vault.to_dict() for vault in order.order_vaults]

                for vault in order_vaults:
                    field_id = vault['field_id']
                    field = Field.query.get(field_id)
                    field.contains_searched_item = True
                    warehouse = Warehouse.query.get(1)
                    warehouse.searchmode = True
                    db.session.commit()
                    
                return order.to_dict()

        return jsonify({'error': 'Item not found'}), 404


    
    elif request.method == 'PUT':
        if (type == "customer"):
            customer = Customer.query.get(id)

            if customer:
                customer_vaults = [vault.to_dict() for vault in customer.vaults]

                for vault in customer_vaults:
                    field_id = vault['field_id']  # Access 'field_id' from the dictionary
                    field = Field.query.get(field_id)
                    field.contains_searched_item = False
                    warehouse = Warehouse.query.get(1)
                    warehouse.searchmode = False
                    db.session.commit()

                return customer.to_dict()

        if (type == "order"):
            order = Order.query.get(id)

            if order:
                order_vaults = [vault.to_dict() for vault in order.order_vaults]

                for vault in order_vaults:
                    field_id = vault['field_id']
                    field = Field.query.get(field_id)
                    field.contains_searched_item = False
                    warehouse = Warehouse.query.get(1)
                    warehouse.searchmode = False
                    db.session.commit()

                return order.to_dict()

        return jsonify({'error': 'Item not found'}), 404
