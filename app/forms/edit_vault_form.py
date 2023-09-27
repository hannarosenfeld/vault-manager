from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class EditVaultForm(FlaskForm):
    customer_name = StringField('customer_name')
    vault_id = StringField('vault_id')
    order_number= StringField('order_number')