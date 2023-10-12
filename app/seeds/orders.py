from app.models import db, Orders, environment, SCHEMA
from sqlalchemy.sql import text

def seed_orders():
    o1 = Orders(order_number="000")
    o2 = Orders(order_number="001")
    o3 = Orders(order_number="002")

    db.session.add(o1)
    db.session.add(o2)
    db.session.add(o3)

    db.session.commit()

def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.order RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))
        
    db.session.commit()
