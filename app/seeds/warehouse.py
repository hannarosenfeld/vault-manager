from sqlalchemy.sql import text
from app.models import db, Warehouse, Field, Vault, Order, environment, SCHEMA, User  # Import User model

def seed_warehouse(users, fields, orders):
    allFields = Field.query.all()
    user_instances = User.query.all()
    order_instances = Order.query.all()

    warehouses_data = [
        {"name": "Warehouse 1", "cols": 9, "rows": 12},
        {"name": "Warehouse 2", "cols": 9, "rows": 12},
        {"name": "Warehouse 3", "cols": 9, "rows": 12},
        {"name": "Warehouse 4", "cols": 9, "rows": 12},
    ]

    warehouses = []
    for warehouse_data in warehouses_data:
        warehouse = Warehouse()
        warehouse.name = warehouse_data["name"]
        warehouse.cols = warehouse_data["cols"]
        warehouse.rows = warehouse_data["rows"]
        warehouse.warehouse_fields = allFields
        warehouse.users = user_instances
        warehouse.orders = order_instances

        db.session.add(warehouse)
        warehouses.append(warehouse)

    db.session.commit()

    return warehouses

def undo_warehouse():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.warehouse RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM warehouse"))
        
    db.session.commit()