from flask.cli import AppGroup
from .users import seed_users, undo_users
from .vaults import seed_vaults, undo_vaults
from .customers import seed_customers, undo_customers
from .fields import seed_fields, undo_fields
from .rows import seed_rows, undo_rows
from .warehouse import seed_warehouse, undo_warehouse
from .stage import seed_stage, undo_stage  # Import the seed_stage and undo_stage functions
from .orders import seed_orders, undo_orders
from app.models import Row, Field, Warehouse, Stage

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
        # rows = Row.query.get.all()
        # fields = Field.query.get.all()
        # warehouse = Warehouse.query.get.all()
        # stage = Stage.query.get.all()

        seed_users()
        seed_customers()
        seed_orders()
        seed_rows() # if not rows:
        seed_fields() # if not fields:
        seed_vaults()
        seed_warehouse()
        seed_stage()

@seed_commands.command('undo')
def undo():
    undo_stage()  # Undo the Stage model first
    undo_vaults()
    undo_fields()
    undo_rows()
    undo_customers()
    undo_users()
    # Add other undo functions here
