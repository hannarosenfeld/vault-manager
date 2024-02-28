from flask_wtf import FlaskForm
from wtforms import StringField

class EditFieldForm(FlaskForm):
    name = StringField('name')
    type = StringField('type')
    field_id_1 = String('field_id_1')
    field_id_2 = String('field_id_2')
