from flask import Blueprint, jsonify
from app.models import db, Row
from app.models.row import Row
from app.models.field import Field  # Import Field model if needed

row_routes = Blueprint('rows', __name__)

@row_routes.route('/')
def get_all_rows():
    rows = Row.query.all()
    return jsonify([row.to_dict() for row in rows])

@row_routes.route('/<row_id>')
def get_row(row_id):
    row = Row.query.get(row_id)
    if not row:
        return jsonify(message="Row not found"), 404
    return jsonify(row.to_dict())

@row_routes.route('/<row_id>/fields')
def get_row_fields(row_id):
    row = Row.query.get(row_id)
    if not row:
        return jsonify(message="Row not found"), 404
    
    # If you have a one-to-many relationship between Row and Field
    # fields = [field.to_dict() for field in row.fields]

    # If you have an array of field IDs stored in Row model
    fields = [field.to_dict() for field in Field.query.filter_by(row_id=row.id)]
    
    return jsonify(fields)



