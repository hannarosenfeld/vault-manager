"""empty message

Revision ID: 7628caa75335
Revises: 817a70b84f88
Create Date: 2025-02-28 09:14:04.900537

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7628caa75335'
down_revision = '817a70b84f88'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('warehouse_orders')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('warehouse_orders',
    sa.Column('order_id', sa.INTEGER(), nullable=False),
    sa.Column('warehouse_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ),
    sa.ForeignKeyConstraint(['warehouse_id'], ['warehouses.id'], ),
    sa.PrimaryKeyConstraint('order_id', 'warehouse_id')
    )
    # ### end Alembic commands ###
