"""Add name field to Warehouse model and update existing record

Revision ID: da08a8a10158
Revises: 4ffe157b21d9
Create Date: 2024-02-06 11:57:31.712733

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'da08a8a10158'
down_revision = '4ffe157b21d9'
branch_labels = None
depends_on = None


def upgrade():
    # Add the name column to the warehouse table
    op.add_column('warehouse', sa.Column('name', sa.String(), nullable=True))

    # Update the existing record with ID 1
    op.execute("UPDATE warehouse SET name='Warehouse 3' WHERE id=1;")


def downgrade():
    # Revert the update
    op.execute("UPDATE warehouse SET name=NULL WHERE id=1;")
    # Drop the name column
    op.drop_column('warehouse', 'name')