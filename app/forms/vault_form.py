from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from flask_wtf.file import FileField
from wtforms.validators import DataRequired

class VaultForm(FlaskForm):
    customer_name = StringField('customer_name', validators=[DataRequired()])
    field_id = IntegerField('field_id', validators=[DataRequired()])
    position = StringField('position', validators=[DataRequired()])
    vault_id = StringField('vault_id', validators=[DataRequired()])
    order_number = StringField('order_number', validators=[DataRequired()])
    type = StringField('type', validators=[DataRequired()])
    attachment = FileField('attachment')
    note = TextAreaField('note')  # Added note field
