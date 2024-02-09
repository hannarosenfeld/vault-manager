from app.models import db, Row, Field, environment, SCHEMA
from sqlalchemy.sql import text

from app.models import db, Row, Field, environment, SCHEMA

def seed_rows():
    row_names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    
    for name in row_names:
        row = Row(name=name)

        fields_for_row = Field.query.filter_by(row_id=i).all()
        row.fields = fields_for_row

        db.session.add(row)

    db.session.commit()


def undo_rows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.rows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM rows"))
        
    db.session.commit()
