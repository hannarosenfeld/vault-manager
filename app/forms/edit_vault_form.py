from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from flask_wtf.file import FileField

class EditVaultForm(FlaskForm):
    customer_name = StringField('customer_name')
    name = StringField('name')
    order_number = StringField('order_number')
    attachment_to_delete = StringField('attachment_to_delete')
    staging = BooleanField('staging')