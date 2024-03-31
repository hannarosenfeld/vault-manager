from sqlalchemy.sql import text
from app.models import db, Warehouse, Field, Vault,Order, environment, SCHEMA, User  # Import User model

def seed_warehouse(users, fields, orders):
    allFields = Field.query.all()
    print("👰🏼‍♀️", allFields)
    warehouse = Warehouse()

    warehouse.name = "Warehouse 3"
    warehouse.cols = 9
    warehouse.rows = 12
    warehouse.warehouse_fields = allFields

    # Retrieve user instances based on their IDs
    user_instances = User.query.filter(User.id.in_(users)).all()
    warehouse.users = user_instances

    # Similarly, retrieve order instances based on their IDs and assign
    order_instances = Order.query.filter(Order.id.in_(orders)).all()
    warehouse.orders = order_instances

    db.session.add(warehouse)
    db.session.commit()

    return [warehouse]

def undo_warehouse():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.warehouse RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM warehouse"))
        
    db.session.commit()
