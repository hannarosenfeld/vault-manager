"""Add bottom_couchbox_field column to vaults

Revision ID: 91ecd837b4dc
Revises: dad49622b653
Create Date: 2024-01-29 14:33:44.382566

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '91ecd837b4dc'
down_revision = 'dad49622b653'
branch_labels = None
depends_on = None

def upgrade():
    with op.batch_alter_table('vaults') as batch_op:
        # Add the new column without the default value
        batch_op.add_column(sa.Column('bottom_couchbox_field', sa.Boolean(), nullable=True, server_default=None))

def downgrade():
    with op.batch_alter_table('vaults') as batch_op:
        # Drop the new column
        batch_op.drop_column('bottom_couchbox_field')
