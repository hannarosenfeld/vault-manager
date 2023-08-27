from app.models import db, Customer, environment, SCHEMA
from sqlalchemy.sql import text


def seed_customers():
    c1 = Customer(
        name="Office Furniture", color="ea373d"
    )
    c2 = Customer(
        name="Knox"
    )    
    c3 = Customer(
        name="Zang"
    )    
    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)

    db.session.commit()


def undo_customers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.customers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM customers"))
        
    db.session.commit()