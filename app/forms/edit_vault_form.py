from flask_wtf import FlaskForm
from wtforms import StringField, FieldList, IntegerField


class EditVaultForm(FlaskForm):
    customer_name = StringField('customer_name')
    vault_id = StringField('vault_id')
    order_number = StringField('order_number')
    attachments_to_delete = FieldList(IntegerField('attachment_to_delete'))
