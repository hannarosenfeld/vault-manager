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


@vault_routes.route('/')
def all_vaults():
    """
    Query for all vaults and returns them in a list of vault dictionaries
    """
    vaults = Vault.query.all()
    return { vault.id : vault.to_dict() for vault in vaults }


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

    try:
        if form.validate_on_submit():
            customer_name = form.data['customer_name']
            customer = Customer.query.filter_by(name=customer_name).first()

            new_vault = Vault(
                customer_name=form.data['customer_name'],
                customer=customer,
                customer_id=customer.id if customer else None,
                field_id=form.data['field_id'],
                field_name=form.data['field_name'],
                position=form.data['position'],
                vault_id=form.data['vault_id'],
                order_number=form.data['order_number'],
                type=form.data['type'],
                warehouse_id=form.data['warehouse_id'],
            )

            # check if the order_number exists
            existent_order = Order.query.filter_by(order_number=new_vault.order_number).first()

            if existent_order:
                existent_order.order_vaults.append(new_vault)
                db.session.commit()

            # if the order does not yet exist, create it and then add the new vault to its list of vaults
            if not existent_order:
                new_order = Order(order_number=new_vault.order_number)  # Create a new order
                new_order.order_vaults.append(new_vault)  # Add the created vault to the order
                db.session.add(new_order)
                db.session.commit()

            field = Field.query.get(new_vault.field_id)

            # TODO check conditionally if production or local, if local field.vaults.count() == 1
            if field.type == "couchbox" and field.vaults.count() == 3:
                field.full = True

            elif field.vaults.count() == 2:
                for vault in field.vaults:
                    if vault.type == "T" and new_vault.type == "T":
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
                    file_url = f'https://{s3_bucket_name}.s3.amazonaws.com/{s3_key}',
                )
                db.session.add(new_attachment)
                db.session.commit()

                # Save file to AWS S3
                s3 = boto3.client('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)
                s3.upload_fileobj(attachment, s3_bucket_name, s3_key, ExtraArgs={'ContentType':'application/pdf'})


            db.session.add(new_vault)
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
            vault.customer_name = form.data['customer_name']
            vault.vault_id = form.data['vault_id']
            vault.order_number = form.data['order_number']

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

    if request.method == 'DELETE':
        db.session.delete(vault)
        field = Field.query.get(vault.field_id)
        field.full = False
        db.session.commit()
        return {'message': 'Vault deleted successfully'}
