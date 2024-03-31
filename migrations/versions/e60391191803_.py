"""empty message

Revision ID: e60391191803
Revises: 
Create Date: 2024-03-31 14:05:51.569288

"""
from alembic import op
import sqlalchemy as sa


import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'e60391191803'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('companies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('address', sa.String(), nullable=True),
    sa.Column('phone', sa.String(length=100), nullable=True),
    sa.Column('logo', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE companies SET SCHEMA {SCHEMA};")

    op.create_table('customers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE customers SET SCHEMA {SCHEMA};")

    op.create_table('company_customers',
    sa.Column('customer_id', sa.Integer(), nullable=False),
    sa.Column('company_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['company_id'], ['companies.id'], ),
    sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], ),
    sa.PrimaryKeyConstraint('customer_id', 'company_id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE company_customers SET SCHEMA {SCHEMA};")

    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('company_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['company_id'], ['companies.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE orders SET SCHEMA {SCHEMA};")

    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('company_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['company_id'], ['companies.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('warehouses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('rows', sa.Integer(), nullable=True),
    sa.Column('cols', sa.Integer(), nullable=True),
    sa.Column('address', sa.String(), nullable=True),
    sa.Column('company_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['company_id'], ['companies.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE warehouses SET SCHEMA {SCHEMA};")

    op.create_table('fields',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=True),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('full', sa.Boolean(), nullable=True),
    sa.Column('warehouse_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['warehouse_id'], ['warehouses.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE fields SET SCHEMA {SCHEMA};")

    op.create_table('warehouse_orders',
    sa.Column('order_id', sa.Integer(), nullable=False),
    sa.Column('warehouse_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ),
    sa.ForeignKeyConstraint(['warehouse_id'], ['warehouses.id'], ),
    sa.PrimaryKeyConstraint('order_id', 'warehouse_id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE warehouse_orders SET SCHEMA {SCHEMA};")

    op.create_table('warehouse_users',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('warehouse_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['warehouse_id'], ['warehouses.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'warehouse_id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE warehouse_users SET SCHEMA {SCHEMA};")

    op.create_table('field_orders',
    sa.Column('order_id', sa.Integer(), nullable=False),
    sa.Column('field_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['field_id'], ['fields.id'], ),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ),
    sa.PrimaryKeyConstraint('order_id', 'field_id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE field_orders SET SCHEMA {SCHEMA};")

    op.create_table('vaults',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('field_id', sa.Integer(), nullable=True),
    sa.Column('order_id', sa.Integer(), nullable=True),
    sa.Column('position', sa.String(length=100), nullable=True),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('customer_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['field_id'], ['fields.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE vaults SET SCHEMA {SCHEMA};")

    op.create_table('attachments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('vault_id', sa.Integer(), nullable=True),
    sa.Column('file_url', sa.String(), nullable=False),
    sa.Column('file_name', sa.String(), nullable=False),
    sa.Column('unique_name', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['vault_id'], ['vaults.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE attachments SET SCHEMA {SCHEMA};")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('attachments')
    op.drop_table('vaults')
    op.drop_table('field_orders')
    op.drop_table('warehouse_users')
    op.drop_table('warehouse_orders')
    op.drop_table('fields')
    op.drop_table('warehouses')
    op.drop_table('users')
    op.drop_table('orders')
    op.drop_table('company_customers')
    op.drop_table('customers')
    op.drop_table('companies')
    # ### end Alembic commands ###
