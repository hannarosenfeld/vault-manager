"""empty message

Revision ID: 5cd2344926cc
Revises: 
Create Date: 2023-08-28 16:26:57.719256

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5cd2344926cc'
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
    op.create_table('rows',
    sa.Column('id', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('fields',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('row_id', sa.String(), nullable=True),
    sa.Column('empty', sa.Boolean(), nullable=True),
    sa.Column('field_id', sa.String(length=3), nullable=False),
    sa.ForeignKeyConstraint(['row_id'], ['rows.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('field_id')
    )
    op.create_table('vaults',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('customer_id', sa.Integer(), nullable=True),
    sa.Column('field_id', sa.Integer(), nullable=False),
    sa.Column('field_name', sa.String(), nullable=False),
    sa.Column('position', sa.String(length=100), nullable=False),
    sa.Column('vault_id', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], ),
    sa.ForeignKeyConstraint(['field_id'], ['fields.id'], ),
    sa.ForeignKeyConstraint(['field_name'], ['fields.field_id'], ),
    sa.PrimaryKeyConstraint('id')
    )
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
