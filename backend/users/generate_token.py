import jwt
from stockify import settings

def generate_token(payload):
    token = jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256").decode("utf-8")
    return token