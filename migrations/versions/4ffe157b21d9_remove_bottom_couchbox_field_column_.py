"""Remove bottom_couchbox_field column from vaults

Revision ID: 4ffe157b21d9
Revises: 8d5f23abf035
Create Date: 2024-01-29 15:09:21.507269

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4ffe157b21d9'
down_revision = '8d5f23abf035'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('vaults') as batch_op:
        # Remove the column
        batch_op.drop_column('bottom_couchbox_field')

def downgrade():
    with op.batch_alter_table('vaults') as batch_op:
        # Add the column back with the same specifications as in the previous migration
        batch_op.add_column(sa.Column('bottom_couchbox_field', sa.Boolean(), nullable=True, server_default=None))