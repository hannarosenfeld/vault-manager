from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Customer, Vault, Field, Order, Attachment, db
from app.forms import VaultForm, EditVaultForm
from werkzeug.utils import secure_filename
import os
from dotenv import load_dotenv
import boto3
import botocore
import uuid

load_dotenv()

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


@vault_routes.route('/<int:field_id>')
@login_required
def all_field_vaults(field_id):
    """
    Query for all vaults and returns them in a list of vault dictionaries
    """
    field = Field.query.get(field_id)
    vault_ids = field.to_dict()['vaults']
    vaults = [Vault.query.get(id) for id in vault_ids]
    return { vault.id : vault.to_dict() for vault in vaults }


@vault_routes.route('/')
@login_required
def all_vaults():
    """
    Query for all vaults and returns them in a list of vault dictionaries
    """
    vaults = Vault.query.all()
    return { vault.id : vault.to_dict() for vault in vaults }

@vault_routes.route('/staged')
@login_required
def all_vaults_staged():
    """
    Query for all vaults and returns them in a list of vault dictionaries
    """
    vaults = Vault.query.filter_by(field_id=None)
    return { vault.id : vault.to_dict() for vault in vaults }

# @vault_routes.route('/<int:id>')
# def single_vault(id):
#     """
#     Query for a vault by id and returns that vault in a dictionary
#     """
#     vault = Vault.query.get(id)
#     return vault.to_dict()

@vault_routes.route('/', methods=['POST'])
@login_required
def add_vault():
    form = VaultForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    try:
        if form.validate_on_submit():
            customer_name = form.data['customer_name']
            order_name = form.data['order_number']

            existent_customer = Customer.query.filter_by(name=customer_name).first() if customer_name else None
            existent_order = Order.query.filter_by(name=order_name).first() if order_name else None

            new_vault = Vault(
                name=form.data['vault_id'],
                customer_id=existent_customer.id if existent_customer else None,
                field_id=form.data['field_id'],
                order_id=existent_order.id if existent_order else None,
                position=form.data['position'],
                type=form.data['type'],
                note=form.data['note'],
                empty=form.data['empty']
            )

            db.session.add(new_vault)
            db.session.commit()

            if not existent_customer:
                if customer_name:
                    new_customer = Customer(name=customer_name)
                    db.session.add(new_customer)
                    db.session.commit()

            if not existent_order:
                if order_name:
                    new_order = Order(name=order_name)
                    db.session.add(new_order)
                    db.session.commit()
                    new_order.order_vaults.append(new_vault)

            field = Field.query.get(new_vault.field_id)

            # TODO check conditionally if production or local, if local field.vaults.count() == 1
            if field.type == "couchbox" and field.vaults.count() == 3:
                field.full = True

            # Handle file upload
            attachment = form.data['attachment']

            if attachment:
                # Get AWS credentials from environment variables
                aws_access_key_id = os.getenv('AWS_ACCESS_KEY')
                aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')
                s3_bucket_name = os.getenv('AWS_BUCKET_NAME')
                unique_name = f'{secure_filename(attachment.filename)}-{uuid.uuid4()}'
                s3_key = f'attachments/{unique_name}'

                # Store file information in the database (adjust the model and fields accordingly)
                new_attachment = Attachment(
                    vault_id=new_vault.id,
                    file_name=attachment.filename,
                    unique_name=unique_name,
                    file_url=f'https://{s3_bucket_name}.s3.amazonaws.com/{s3_key}',
                )
                db.session.add(new_attachment)

                # Save file to AWS S3
                s3 = boto3.client('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)
                s3.upload_fileobj(attachment, s3_bucket_name, s3_key, ExtraArgs={'ContentType': 'application/pdf'})

            db.session.commit()

            dict_new_vault = new_vault.to_dict()

            return dict_new_vault

    except Exception as e:
        return jsonify({'error': str(e)}), 500

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
            if form.data['staging']:
                field_id = vault.field_id
                vault.field_id = None
                vault.position = None
                field = Field.query.get(field_id)

                db.session.commit()
                return {'vault': vault.to_dict(), 'field': field.to_dict()}

            vault.name = form.data['name']
            vault.note = form.data['note']

            # Check if customer exists, if not, create a new customer
            customer_name = form.data['customer_name']
            existent_customer = Customer.query.filter_by(name=customer_name).first()
            if not existent_customer:
                new_customer = Customer(name=customer_name)
                db.session.add(new_customer)
                db.session.commit()
                vault.customer_id = new_customer.id
            else:
                vault.customer_id = existent_customer.id

            # Update order
            order_name = form.data['order_number']
            existent_order = Order.query.filter_by(name=order_name).first()
            if not existent_order:
                new_order = Order(name=order_name)
                db.session.add(new_order)
                db.session.commit()
                vault.order_id = new_order.id
            else:
                vault.order_id = existent_order.id

            db.session.commit()

            # Handle file uploads
            for key, value in request.files.items():
                if key.startswith('attachment'):
                    attachment = value

                    # Get AWS credentials from environment variables
                    aws_access_key_id = os.getenv('AWS_ACCESS_KEY')
                    aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')
                    s3_bucket_name = os.getenv('AWS_BUCKET_NAME')
                    unique_name = f'{secure_filename(attachment.filename)}-{uuid.uuid4()}'
                    s3_key = f'attachments/{unique_name}'

                    # Store file information in the database
                    new_attachment = Attachment(
                        vault_id=vault.id,
                        file_name=attachment.filename,
                        unique_name=unique_name,
                        file_url=f'https://{s3_bucket_name}.s3.amazonaws.com/{s3_key}',
                    )
                    db.session.add(new_attachment)

                    # Save file to AWS S3
                    s3 = boto3.client('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)
                    s3.upload_fileobj(attachment, s3_bucket_name, s3_key, ExtraArgs={'ContentType': 'application/pdf'})

            db.session.commit()
            return vault.to_dict()
        else:
            return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400

    print("💅🏻")

    if request.method == 'DELETE':
        customer = Customer.query.get(vault.customer_id)
        customer_to_delete = None
        vault_id = vault.id
        db.session.delete(vault)
        field = Field.query.get(vault.field_id)
        if field:
            field.full = False
        db.session.commit()

        if (len(customer.vaults) == 0):
            customer_to_delete = customer.id
            db.session.delete(customer)
            db.session.commit()

        return jsonify({'vaultId': vault_id, "customer_to_delete": customer_to_delete})


@vault_routes.route('/moveVault/<int:selected_field_id>/<int:vault_id>/<string:position>', methods=['PUT'])
# TODO: in the future, add a form for moving vault and take in vault info through form body, not through the route
@login_required
def move_vault_to_warehouse(selected_field_id, vault_id, position):
    vault = Vault.query.get(vault_id)
    if (vault):
        vault.field_id = selected_field_id
        vault.position = position
        db.session.commit()
        return vault.to_dict()

    else:
        return {"message" : "vault not found"}

