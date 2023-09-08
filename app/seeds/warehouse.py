from app.models import db, Warehouse, Row, Field, environment, SCHEMA
from sqlalchemy.sql import text


def seed_warehouse():
    # Create a warehouse instance
    warehouse = Warehouse()
    
    # Retrieve all rows and fields
    rows = Row.query.all()
    fields = Field.query.all()
    
    # Associate rows and fields with the warehouse
    warehouse.warehouse_rows = rows
    warehouse.warehouse_fields = fields

    db.session.add(warehouse)
    db.session.commit()

def undo_warehouse():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.warehouse RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM warehouse"))
        
    db.session.commit()
