from flask.cli import AppGroup
from .users import seed_users, undo_users
from .vaults import seed_vaults, undo_vaults
from .customers import seed_customers, undo_customers
from .fields import seed_fields, undo_fields
# from .rows import seed_rows, undo_rows
from .warehouse import seed_warehouse, undo_warehouse
# from .stage import seed_stage, undo_stage 
from .orders import seed_orders, undo_orders
from app.models import Field, Warehouse, Customer, User, Order, Vault

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # if environment == 'production' or environment == 'development':
        # Seed data if any of the tables is empty
        users = None
        fields = None
        customers = None
        orders = None
        warehouses = None

        if not User.query.all(): 
            users = seed_users()  
        if not Customer.query.all(): 
            customers = seed_customers()
        if not Order.query.all(): 
            orders = seed_orders()
        if not Field.query.all(): 
            fields = seed_fields(orders)
        if not Warehouse.query.all(): 
            seed_warehouse(users, fields, orders)             
        if not Vault.query.all(): 
            seed_vaults(customers)

@seed_commands.command('undo')
def undo():
    # undo_stage()
    undo_vaults()
    undo_fields()
    # undo_rows()
    undo_customers()
    undo_users()
    undo_warehouse()
