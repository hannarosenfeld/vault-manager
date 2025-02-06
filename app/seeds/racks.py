from app.models import db, Rack, Warehouse, Customer
from sqlalchemy.sql import text

def seed_racks():
    # Get the customer and warehouse by their ids
    warehouse = Warehouse.query.get(1)
    customer = Customer.query.get(1)

    # Create some sample racks
    rack1 = Rack(
        shelves=5,
        wall_side='top-left',
        position='1-1',
        orientation='horizontal',
        warehouse_id=warehouse.id
    )

    rack2 = Rack(
        shelves=3,
        wall_side='top-left',
        position='1-2',
        orientation='horizontal',
        warehouse_id=warehouse.id
    )

    # Add racks to the session
    db.session.add(rack1)
    db.session.add(rack2)

    # Commit to save to the database
    db.session.commit()
    print("🌟 Sample racks seeded!")

def undo_racks():
    # Undo the seed by deleting racks, using schema and environment settings
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.racks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM racks"))
        
    db.session.commit()
    print("🔄 Racks data reverted!")
