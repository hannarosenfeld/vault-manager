from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class VaultForm(FlaskForm):
    customer_name = StringField('customer_name', validators=[DataRequired()])
    field_id = IntegerField('field_id', validators=[DataRequired()])
    field_name = StringField('field_id', validators=[DataRequired()])
    position = StringField('position', validators=[DataRequired()])
    vault_id = StringField('vault_id', validators=[DataRequired()])
    order_number= StringField('order_number', validators=[DataRequired()])