from app.models import db, Field, environment, SCHEMA
from sqlalchemy.sql import text


def seed_fields():
    fields = []

    # Create fields for each row
    for i in range(1, 10):  # Adjust the range to match the number of rows
        row_char = chr(64 + i)  # Convert integer to ASCII character ('A', 'B', ...)
        for field_num in range(1, 13):
            field_id = f"{row_char}{field_num:02d}"  # Ensure field_num has at least two digits
            field = Field(row_id=i, field_id=field_id)  # Use integer representation of row_id
            fields.append(field)

    db.session.add_all(fields)
    db.session.commit()


def undo_fields():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.fields RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM fields"))
    db.session.commit()
