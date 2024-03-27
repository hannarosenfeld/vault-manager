from flask_wtf import FlaskForm
from wtforms import StringField

class EditFieldForm(FlaskForm):
    name = StringField('name')
    field_type = StringField('field_type')
    field_id_1 = StringField('field_id_1')
    field_id_2 = StringField('field_id_2')
