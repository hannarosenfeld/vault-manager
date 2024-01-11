from flask_wtf import FlaskForm
from wtforms import StringField
from flask_wtf.file import FileField

class EditVaultForm(FlaskForm):
    customer_name = StringField('customer_name')
    vault_id = StringField('vault_id')
    order_number = StringField('order_number')
    attachment_to_delete = StringField('attachment_to_delete')