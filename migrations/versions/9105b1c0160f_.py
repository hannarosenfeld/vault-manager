"""empty message

Revision ID: 9105b1c0160f
Revises: fd1a97e45e81
Create Date: 2025-02-28 08:52:46.265645

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9105b1c0160f'
down_revision = 'fd1a97e45e81'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('field_orders')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('field_orders',
    sa.Column('order_id', sa.INTEGER(), nullable=False),
    sa.Column('field_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['field_id'], ['fields.id'], ),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ),
    sa.PrimaryKeyConstraint('order_id', 'field_id')
    )
    # ### end Alembic commands ###
