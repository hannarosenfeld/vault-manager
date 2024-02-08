from flask.cli import AppGroup
from .users import seed_users, undo_users
from .vaults import seed_vaults, undo_vaults
from .customers import seed_customers, undo_customers
from .fields import seed_fields, undo_fields
from .rows import seed_rows, undo_rows
from .warehouse import seed_warehouse, undo_warehouse
from .stage import seed_stage, undo_stage 
from .orders import seed_orders, undo_orders
from app.models import Row, Field, Warehouse, Stage, Customer, User, Order, Vault

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production' or 'development':
        # Before seeding in production, you want to run the seed undo 
        # command, which will truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        # undo_stage()
        # undo_vaults()
        # undo_fields()
        # undo_rows()
        # undo_orders()
        # undo_customers()
        # undo_users()
        # undo_warehouse()
        # when ready to go live, add conditional that checks of those rows exist, plus remove undo_.. commands
        # Seed data if any of the tables is empty
        # seed_users()
        # seed_customers()
        # seed_orders()
        # seed_rows()
        # seed_fields()
        # seed_vaults()
        # seed_warehouse()
        # seed_stage() 
            
        rows = Row.query.all()
        fields = Field.query.all()
        warehouse = Warehouse.query.all()
        stage = Stage.query.all()
        customers = Customer.query.all()
        users = User.query.all()
        orders = Order.query.all()
        vaults = Vault.query.all()

        if not users: seed_users()  
        if not customers : seed_customers()
        if not orders: seed_orders()
        if not rows: seed_rows() 
        if not fields: seed_fields() 
        if not vaults: seed_vaults()
        if not warehouse: seed_warehouse()
        if not stage: seed_stage()  

        # Query the count of records in each table
        num_rows = db.session.query(Row).count()
        num_fields = db.session.query(Field).count()
        num_warehouse = db.session.query(Warehouse).count()
        num_stage = db.session.query(Stage).count()
        num_customers = db.session.query(Customer).count()
        num_users = db.session.query(User).count()
        num_orders = db.session.query(Order).count()
        num_vaults = db.session.query(Vault).count()

        # Seed data if any of the tables is empty
        if num_users == 0:
            seed_users()
        if num_customers == 0:
            seed_customers()
        if num_orders == 0:
            seed_orders()
        if num_rows == 0:
            seed_rows()
        if num_fields == 0:
            seed_fields()
        if num_vaults == 0:
            seed_vaults()
        if num_warehouse == 0:
            seed_warehouse()
        if num_stage == 0:
            seed_stage()              

@seed_commands.command('undo')
def undo():
    undo_stage()
    undo_vaults()
    undo_fields()
    undo_rows()
    undo_customers()
    undo_users()
    