from .db import db, add_prefix_for_prod

company_customers = db.Table(
    'company_customers',
    db.Model.metadata,
    db.Column('customer_id', db.Integer, db.ForeignKey(add_prefix_for_prod('customers.id')), primary_key=True),
    db.Column('company_id', db.Integer, db.ForeignKey(add_prefix_for_prod('companies.id')), primary_key=True)
)