from app.models import db, Row, Field, environment, SCHEMA
from sqlalchemy.sql import text


def seed_rows():
    for row_char in ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']:
        row = Row(id=row_char)

        # Retrieve the corresponding fields for the row
        fields_for_row = Field.query.filter_by(row_id=row_char).all()
        row.fields = fields_for_row

        db.session.add(row)

    db.session.commit()


def undo_rows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.rows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM rows"))
        
    db.session.commit()