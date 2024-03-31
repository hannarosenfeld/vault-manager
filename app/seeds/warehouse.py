from app.models import db, Warehouse, Field, Vault, environment, SCHEMA
from sqlalchemy.sql import text

def seed_warehouse(users, fields, orders):
    print("👰🏼‍♀️", users, orders)
    warehouse = Warehouse()

    warehouse.name = "Warehouse 3"
    warehouse.cols = 9
    warehouse.rows = 12
    warehouse.warehouse_fields = fields
    warehouse.users = users
    warehouse.orders = orders

    db.session.add(warehouse)
    db.session.commit()

    return [warehouse]

def undo_warehouse():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.warehouse RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM warehouse"))
        
    db.session.commit()
