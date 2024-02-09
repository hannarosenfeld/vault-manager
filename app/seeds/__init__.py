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
    if environment == 'production' or environment == 'development':
        # Seed data if any of the tables is empty
        # if not User.query.all(): 
            seed_users()  
        # if not Customer.query.all(): 
            seed_customers()
        # if not Order.query.all(): 
            seed_orders()
        # if not Row.query.all(): 
            seed_rows() 
        # if not Field.query.all(): 
            seed_fields()
        # if not Warehouse.query.all(): 
            seed_warehouse()             
        # if not Vault.query.all(): 
            seed_vaults()
        # if not Stage.query.all(): 
            seed_stage()  

@seed_commands.command('undo')
def undo():
    undo_stage()
    undo_vaults()
    undo_fields()
    undo_rows()
    undo_customers()
    undo_users()
    undo_warehouse()
