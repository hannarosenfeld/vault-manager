from flask import Blueprint, jsonify, request
from app.models import Customer, db
from app.forms import CustomerForm

customers_routes = Blueprint('customers', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@customers_routes.route('/')
def all_customers():
    """
    Query for all customers and returns them in a list of customer dictionaries
    """
    print("📬 in route")
    customers = Customer.query.all()
    return {'customers': [customer.to_dict() for customer in customers]}

@customers_routes.route('/<int:id>')
def single_customer(id):
    """
    Query for a customer by id and returns that customer in a dictionary
    """
    customer = Customer.query.get(id)
    return customer.to_dict()

@customers_routes.route('/', methods=['POST'])
def add_customer():
    form = CustomerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_customer = Customer(
            name=form.data['name'],
        )

        db.session.add(new_customer)
        db.session.commit()

        return new_customer.to_dict()

    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400


@customers_routes.route('/<int:id>', methods=['PUT'])
def update_customer_name(id):
    """
    Update a customer's name by ID and return the updated customer in a dictionary
    """
    customer = Customer.query.get(id)
    if customer:
        # Get the new name from the request data
        new_name = request.json.get('name')

        if new_name:
            # Update the customer's name
            customer.name = new_name
            db.session.commit()

            return customer.to_dict()

    return jsonify({'error': 'Customer not found or name not provided'}), 400


@customers_routes.route('/api/customers/search', methods=['GET'])
def search_customers():
    query = request.args.get('query', '')
    customers = Customer.query.filter(Customer.name.ilike(f'%{query}%')).all()
    # The ilike function performs a case-insensitive search for customer names containing the query string.

    # Convert the matching customers to a list of dictionaries
    customer_list = [customer.to_summary_dict() for customer in customers]

    return jsonify(customer_list)
