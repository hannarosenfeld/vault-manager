"""empty message

Revision ID: 06c7a281630b
Revises: 
Create Date: 2024-02-08 10:05:49.521986

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '06c7a281630b'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('customers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('color', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE customers SET SCHEMA {SCHEMA};")
    
    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('order_number', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE orders SET SCHEMA {SCHEMA};")
    
    op.create_table('stage',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE stage SET SCHEMA {SCHEMA};")
    
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    
    op.create_table('warehouse',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE warehouse SET SCHEMA {SCHEMA};")
    
    op.create_table('rows',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('warehouse_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['warehouse_id'], ['warehouse.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE rows SET SCHEMA {SCHEMA};")
    
    op.create_table('fields',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('row_id', sa.String(), nullable=True),
    sa.Column('field_id', sa.String(length=20), nullable=False),  # Updated length and removed unique constraint
    sa.Column('warehouse_id', sa.Integer(), nullable=True),
    sa.Column('full', sa.Boolean(), nullable=True),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('bottom_couchbox_field', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['row_id'], ['rows.id'], ),
    sa.ForeignKeyConstraint(['warehouse_id'], ['warehouse.id'], ),
    sa.PrimaryKeyConstraint('id'),
    # Removed unique constraint
    )
    if environment == "production":
        op.execute(f"ALTER TABLE fields SET SCHEMA {SCHEMA};")
    
    op.create_table('vaults',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('customer_id', sa.Integer(), nullable=True),
    sa.Column('field_name', sa.String(), nullable=False),  # Updated to field name instead of id
    sa.Column('position', sa.String(length=100), nullable=False),
    sa.Column('vault_id', sa.String(length=100), nullable=False),
    sa.Column('staged', sa.Boolean(), nullable=True),
    sa.Column('customer_name', sa.String(length=255), nullable=True),
    sa.Column('order_number', sa.String(), nullable=False),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('warehouse_id', sa.Integer(), nullable=True),
    sa.Column('stage_id', sa.Integer(), nullable=True),
    sa.Column('order_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['field_name'], ['fields.field_id'], ondelete='CASCADE'),  # Updated to field_name
    sa.ForeignKeyConstraint(['stage_id'], ['stage.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['warehouse_id'], ['warehouse.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE vaults SET SCHEMA {SCHEMA};")
    
    with op.batch_alter_table('vaults', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_vaults_customer_id'), ['customer_id'], unique=False)

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
    with op.batch_alter_table('vaults', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_vaults_customer_id'))

    op.drop_table('vaults')
    op.drop_table('fields')
    op.drop_table('rows')
    op.drop_table('warehouse')
    op.drop_table('users')
    op.drop_table('stage')
    op.drop_table('orders')
    op.drop_table('customers')
    # ### end Alembic commands ###
