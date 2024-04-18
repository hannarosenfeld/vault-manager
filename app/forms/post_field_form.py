from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class PostFieldForm(FlaskForm):
    warehouse_id = IntegerField('warehouse_id')
    direction = StringField('direction')
    opperation = StringField('opperation')
    warehouse_columns = IntegerField('warehouse_columns')
    warehouse_rows = IntegerField('warehouse_rows')
    count = IntegerField('count')
