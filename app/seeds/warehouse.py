from app.models import db, Warehouse, Row, Field, Vault, environment, SCHEMA
from sqlalchemy.sql import text

def seed_warehouse():
    warehouse = Warehouse()

    warehouse.name = "Warehouse 3"
    warehouse.cols = 9
    warehouse.rows = 12
    warehouse.warehouse_fields = list(range(1, 109))
    warehouse.users = [1,2]
    # rows = Row.query.all()
    # fields = Field.query.all()
    # warehouse.warehouse_vaults = vaults
    # vaults = Vault.query.filter(Vault.id.in_([1, 2, 3])).all()  # Replace [1, 2, 3] with the actual IDs of the vaults you want to include
    # Associate rows, fields, and vaults with the warehouse
    # warehouse.warehouse_rows = rows
    
    db.session.add(warehouse)
    db.session.commit()

def undo_warehouse():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.warehouse RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM warehouse"))
        
    db.session.commit()
