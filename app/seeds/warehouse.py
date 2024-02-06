from app.models import db, Warehouse, Row, Field, Vault, environment, SCHEMA
from sqlalchemy.sql import text

def seed_warehouse():
    # Create a warehouse instance
    warehouse = Warehouse()
    
    # Retrieve all rows and fields
    rows = Row.query.all()
    fields = Field.query.all()
    
    # Retrieve the Vault instances you want to include in the warehouse
    vaults = Vault.query.filter(Vault.id.in_([1, 2, 3])).all()  # Replace [1, 2, 3] with the actual IDs of the vaults you want to include
    
    # Associate rows, fields, and vaults with the warehouse
    warehouse.warehouse_rows = rows
    warehouse.warehouse_fields = fields
    warehouse.warehouse_vaults = vaults
    warehouse.name = "Warehouse 3"
    
    db.session.add(warehouse)
    db.session.commit()

def undo_warehouse():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.warehouse RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM warehouse"))
        
    db.session.commit()
