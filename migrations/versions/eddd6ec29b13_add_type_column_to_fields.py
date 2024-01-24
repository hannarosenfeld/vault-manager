"""Add type column to fields

Revision ID: eddd6ec29b13
Revises: a3ac0c066edf
Create Date: 2024-01-24 10:07:28.367500

"""
from alembic import op
import sqlalchemy as sa

from app.models.db import add_prefix_for_prod

# revision identifiers, used by Alembic.
revision = 'eddd6ec29b13'
down_revision = 'a3ac0c066edf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('attachments', schema=None) as batch_op:
        batch_op.alter_column('vault_id',
                              existing_type=sa.INTEGER(),
                              nullable=True,
                              existing_nullable=False,
                              existing_server_default=None,
                              existing_autoincrement=False,
                              cascade="all, delete-orphan")

    with op.batch_alter_table('fields', schema=None) as batch_op:
        batch_op.add_column(sa.Column('type', sa.String(), nullable=True, default="vault"))

    # ### end Alembic commands ###

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('fields', schema=None) as batch_op:
        batch_op.drop_column('type')

    with op.batch_alter_table('attachments', schema=None) as batch_op:
        batch_op.drop_constraint('attachments_vault_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key('attachments_vault_id_fkey', 'vaults', ['vault_id'], ['id'])
        batch_op.alter_column('vault_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###
