"""empty message

Revision ID: 822bc6ef0895
Revises: 
Create Date: 2023-08-30 10:37:11.508677

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '822bc6ef0895'
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

    op.create_table('rows',
    sa.Column('id', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE rows SET SCHEMA {SCHEMA};")

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

    op.create_table('fields',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('row_id', sa.String(), nullable=True),
    sa.Column('empty', sa.Boolean(), nullable=True),
    sa.Column('field_id', sa.String(length=3), nullable=False),
    sa.ForeignKeyConstraint(['row_id'], ['rows.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('field_id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE fields SET SCHEMA {SCHEMA};")

    op.create_table('vaults',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('customer_id', sa.Integer(), nullable=True),
    sa.Column('field_id', sa.Integer(), nullable=False),
    sa.Column('field_name', sa.String(), nullable=False),
    sa.Column('position', sa.String(length=100), nullable=False),
    sa.Column('vault_id', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['field_id'], ['fields.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['field_name'], ['fields.field_id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE vaults SET SCHEMA {SCHEMA};")

    with op.batch_alter_table('vaults', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_vaults_customer_id'), ['customer_id'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('vaults', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_vaults_customer_id'))

    op.drop_table('vaults')
    op.drop_table('fields')
    op.drop_table('users')
    op.drop_table('rows')
    op.drop_table('customers')
    # ### end Alembic commands ###
