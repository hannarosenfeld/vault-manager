from app.models import db, Field, environment, SCHEMA
from sqlalchemy.sql import text

def seed_fields():
    fields = []

    # Create fields for each row
    for row_char in ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']:
        for field_num in range(1, 13):
            field_id = f"{row_char}{field_num}"
            field = Field(row_id=row_char, field_id=field_id)  # Assuming you have an "empty" attribute in Field model
            fields.append(field)

    db.session.add_all(fields)
    db.session.commit()

def undo_fields():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.fields RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM fieldss"))
    db.session.commit()