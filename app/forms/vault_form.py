from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class VaultForm(FlaskForm):
    customer = StringField('customer', validators=[DataRequired()])
    field = IntegerField('field', validators=[DataRequired()])
    position = StringField('position', validators=[DataRequired()])
    vault_id = StringField('vault id', validators=[DataRequired()])
    

