from app.models import db, Row, Field, environment, SCHEMA
from sqlalchemy.sql import text

def seed_rows():
    row_names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    
    for i, name in enumerate(row_names, start=1):
        row = Row(id=i, name=name)

        # Retrieve the corresponding fields for the row
        fields_for_row = Field.query.filter_by(row_id=i).all()  # Use integer representation of row_id
        row.fields = fields_for_row

        db.session.add(row)

    db.session.commit()

def undo_rows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.rows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM rows"))
        
    db.session.commit()
