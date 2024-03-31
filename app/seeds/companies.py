from app.models import db, Company, environment, SCHEMA
from sqlalchemy.sql import text


def seed_companies():
    c1 = Company(
        company_users=[1,2],
        name="Naglee",
        company_orders=[1,2,3],
        company_warehouses=[1],
        company_customers=[1,2,3],
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