"""Change id to integer and add name column to Row model

Revision ID: 22a902963c91
Revises: da08a8a10158
Create Date: 2024-02-07 10:37:00.225112

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '22a902963c91'
down_revision = 'da08a8a10158'
branch_labels = None
depends_on = None


def upgrade():
    # Create a temporary table with the desired schema
    op.create_table(
        'tmp_rows',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=True),
        sa.Column('warehouse_id', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['warehouse_id'], ['warehouse.id'], ),
    )

    # Copy data from the old table to the temporary table
    op.execute("""
        INSERT INTO tmp_rows (id, name, warehouse_id)
        SELECT
            CASE
                WHEN id = 'A' THEN 1
                WHEN id = 'B' THEN 2
                WHEN id = 'C' THEN 3
                WHEN id = 'D' THEN 4
                WHEN id = 'E' THEN 5
                WHEN id = 'F' THEN 6
                WHEN id = 'G' THEN 7
                WHEN id = 'H' THEN 8
                WHEN id = 'I' THEN 9
            END,
            id,
            warehouse_id
        FROM rows
        WHERE warehouse_id = 1
    """)

    # Drop the old table
    op.drop_table('rows')

    # Rename the temporary table to the original table's name
    op.rename_table('tmp_rows', 'rows')

def downgrade():
    # Revert the changes made in upgrade()
    op.drop_column('rows', 'name')
    op.alter_column('rows', 'id', existing_type=sa.Integer(), type_=sa.String())
