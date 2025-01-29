class RackContent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rack_id = db.Column(db.Integer, db.ForeignKey('rack.id'), nullable=False)
    description = db.Column(db.String(255), nullable=False)
