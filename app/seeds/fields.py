from app.models import db, Field, environment, SCHEMA
from sqlalchemy.sql import text

def seed_fields():
    fields = []

    # Create fields for each row
    for row_char in 'ABCDEFGHI':
        for field_num in range(1, 13):
            field_id = f"{row_char}{field_num:02d}"  # Ensure field_num has at least two digits
            field = Field(row_id=row_char, field_id=field_id)
            fields.append(field)

    db.session.add_all(fields)
    db.session.commit()


def undo_fields():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.fields RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM fields"))
    db.session.commit()
