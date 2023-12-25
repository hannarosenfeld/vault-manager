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
    if environment == 'production':
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

        rows = Row.query.all()
        fields = Field.query.all()
        warehouse = Warehouse.query.all()
        stage = Stage.query.all()
        customers = Customer.query.all()
        users = User.query.all()
        orders = Order.query.all()
        vaults = Vault.query.all()

        print("💖")
        if not users: seed_users()
        if not customers : seed_customers()
        if not orders: seed_orders()
        if not rows: seed_rows() 
        if not fields: seed_fields() 
        if not vaults: seed_vaults()
        if not warehouse: seed_warehouse()
        if not stage: seed_stage()

@seed_commands.command('undo')
def undo():
    undo_stage()  # Undo the Stage model first
    undo_vaults()
    undo_fields()
    undo_rows()
    undo_customers()
    undo_users()
    # Add other undo functions here