"""Add bottom_couchbox_field column to fields

Revision ID: 8d5f23abf035
Revises: 91ecd837b4dc
Create Date: 2024-01-29 15:06:11.761532

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8d5f23abf035'
down_revision = '91ecd837b4dc'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('fields') as batch_op:
        # Add the new column without the default value
        batch_op.add_column(sa.Column('bottom_couchbox_field', sa.Boolean(), nullable=True, server_default=None))

def downgrade():
    with op.batch_alter_table('fields') as batch_op:
        # Drop the new column
        batch_op.drop_column('bottom_couchbox_field')
