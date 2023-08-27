from flask import Blueprint, jsonify
from app.models import db, Field
from app.models.field import Field
from app.models.row import Row  # Import Row model if needed

field_routes = Blueprint('fields', __name__)

@field_routes.route('/')
def get_all_fields():
    fields = Field.query.all()
    return jsonify([field.to_dict() for field in fields])

@field_routes.route('/<field_id>')
def get_field(field_id):
    field = Field.query.get(field_id)
    if not field:
        return jsonify(message="Field not found"), 404
    return jsonify(field.to_dict())

@field_routes.route('/<field_id>/row')
def get_field_row(field_id):
    field = Field.query.get(field_id)
    if not field:
        return jsonify(message="Field not found"), 404
    
    # If you have a many-to-one relationship between Field and Row
    # row = field.row.to_dict()

    # If you have a foreign key relationship
    row = Row.query.get(field.row_id).to_dict()

    return jsonify(row)



