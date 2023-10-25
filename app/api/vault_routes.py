from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Customer, Vault, Field, db
from app.forms import VaultForm, EditVaultForm

vault_routes = Blueprint('vaults', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@vault_routes.route('/')
def all_vaults():
    """
    Query for all vaults and returns them in a list of vault dictionaries
    """
    vaults = Vault.query.all()
    return {'vaults': [vault.to_dict() for vault in vaults]}


@vault_routes.route('/<int:id>')
def single_vault(id):
    """
    Query for a vault by id and returns that vault in a dictionary
    """
    vault = Vault.query.get(id)
    return vault.to_dict()


@vault_routes.route('/', methods=['POST'])
@login_required
def add_vault():
    form = VaultForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        customer_name = form.data['customer_name']
        customer = Customer.query.filter_by(name=customer_name).first()

        new_vault = Vault(
            customer_name=form.data['customer_name'],
            customer=customer,
            customer_id=customer.id if customer else None,  # Use the existing customer's id or None
            field_id=form.data['field_id'],
            field_name=form.data['field_name'],
            position=form.data['position'],
            vault_id=form.data['vault_id'],
            order_number=form.data['order_number'],
            type=form.data['type'],
            warehouse_id=1,
        )
        
        field = Field.query.get(new_vault.field_id)

        print("🌸 field", field.to_dict())

        # BUG ORIGINATES HERE!!!
        # dict in python are not sorted! 
        if field.vaults.count() > 0:
            for vault in field.vaults:
                print("🌸 vault: ", vault.to_dict())
                if vault.type == "T" or new_vault.type == "T":
                    field.full = True

        db.session.add(new_vault)
                    
        db.session.commit()

        dict_new_vault = new_vault.to_dict()

        return dict_new_vault

    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400


@vault_routes.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def manage_vault(id):
    """
    Query for a vault by id and manage it (GET, PUT/EDIT, DELETE)
    """
    vault = Vault.query.get(id)

    if not vault:
        return {'errors': 'Vault not found'}, 404

    if request.method == 'GET':
        return vault.to_dict()

    if request.method == 'PUT':
        form = EditVaultForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            vault.customer_name= form.data['customer_name']
            vault.vault_id = form.data['vault_id']
            vault.order_number= form.data['order_number']

            db.session.commit()
            return vault.to_dict()
        else:
            return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400

    if request.method == 'DELETE':
        db.session.delete(vault)
        db.session.commit()
        return {'message': 'Vault deleted successfully'}
