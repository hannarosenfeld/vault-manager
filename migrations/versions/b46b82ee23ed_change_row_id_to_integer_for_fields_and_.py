"""Change row_id to integer for fields and update corresponding values

Revision ID: b46b82ee23ed
Revises: 22a902963c91
Create Date: 2024-02-07 11:09:11.392766

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b46b82ee23ed'
down_revision = '22a902963c91'
branch_labels = None
depends_on = None


def upgrade():
    # Rename the existing 'fields' table to 'old_fields'
    op.rename_table('fields', 'old_fields')

    # Create a new table with the desired schema
    op.create_table(
        'fields',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('row_id', sa.Integer(), nullable=True),
        sa.Column('field_id', sa.String(3), unique=True, nullable=False),
        sa.Column('warehouse_id', sa.Integer(), nullable=True),
        sa.Column('full', sa.Boolean(), default=False),
        sa.Column('type', sa.String(), default="vault"),
        sa.Column('bottom_couchbox_field', sa.Boolean(), default=False),
    )

    # Copy data from the old table to the new table
    op.execute("""
        INSERT INTO fields (id, row_id, field_id, warehouse_id, full, type, bottom_couchbox_field)
        SELECT id,
               CASE
                   WHEN row_id = 'A' THEN 1
                   WHEN row_id = 'B' THEN 2
                   WHEN row_id = 'C' THEN 3
                   WHEN row_id = 'D' THEN 4
                   WHEN row_id = 'E' THEN 5
                   WHEN row_id = 'F' THEN 6
                   WHEN row_id = 'G' THEN 7
                   WHEN row_id = 'H' THEN 8
                   WHEN row_id = 'I' THEN 9
               END,
               field_id,
               warehouse_id,
               full,
               type,
               bottom_couchbox_field
        FROM old_fields
    """)

    # Optionally, you can drop the old table if it's no longer needed
    op.drop_table('old_fields')


def downgrade():
    pass
