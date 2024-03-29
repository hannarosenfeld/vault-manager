from app.models import db, Company, environment, SCHEMA
from sqlalchemy.sql import text


def seed_companies(users, warehouses, orders, customers):
    c1 = Company(
        users=users,
        name="Naglee",
        orders=orders,
        warehouses=warehouses,
        customers=customers,
        address="1525 Grand Central Ave, Elmira, NY 14901",
        phone="6077334671"
    )
    db.session.add(c1)
    db.session.commit()

def undo_companies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.companies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM companies"))
        
    db.session.commit()