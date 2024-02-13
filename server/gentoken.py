import jwt
from datetime import datetime, timedelta

SECRET_KEY = 'crudFlask'

TOKEN_EXPIRATION_TIME = 7200

def generate_token(user_id):
    try:
        payload = {
            'user_id': user_id,
            'exp': datetime.utcnow() + timedelta(seconds=TOKEN_EXPIRATION_TIME)
        }

        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        return token
    except Exception as e:
        print('Error generating token: ', str(e))
        return None