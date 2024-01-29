"""Set default value for 'type' column in fields

Revision ID: dad49622b653
Revises: eddd6ec29b13
Create Date: 2024-01-24 11:49:44.922268

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dad49622b653'
down_revision = 'eddd6ec29b13'
branch_labels = None
depends_on = None


def upgrade():
    # Set the default value for 'type' column to 'vault'
    op.execute("UPDATE fields SET type='vault' WHERE type IS NULL")


def downgrade():
    pass
