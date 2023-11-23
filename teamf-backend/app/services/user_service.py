from flask import jsonify
from config import mongo
from app.models.user_model import User
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token


class UserService:
    @staticmethod
    def get_users():
        users_data = mongo.test.users.find()
        return [User(id=str(user.get('_id')), username=user['username'], email=user['email']).to_dict() for user in users_data]

    @staticmethod
    def save_user(username, email, password):
        try:
            hashed_password = generate_password_hash(password)
            user = User(username=username, email=email)
            user.password = hashed_password
            user.created_at = datetime.now().isoformat()

            generated_user = mongo.test.users.insert_one(user.to_dict())

            return generated_user.inserted_id

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @staticmethod
    def find_user_by_username(username):
        try:
            users = mongo.test.users
            return users.find_one({'username': username})
        except Exception as e:
            print(f"Error in find_user_by_username: {str(e)}")
            return None

    @staticmethod
    def find_user_by_email(email):
        try:
            users = mongo.test.users
            return users.find_one({'email': email})
        except Exception as e:
            print(f"Error in find_user_by_email: {str(e)}")
            return None

    @staticmethod
    def authenticate_user(user, password):
        try:
            return user and check_password_hash(user['password'], password)
        except Exception as e:
            print(f"Error in authenticate_user: {str(e)}")
            return None

    @staticmethod
    def generate_token(user):
        try:
            token = create_access_token(identity=str(user['_id']))
            user['token'] = token
            users = mongo.test.users
            users.update_one({'_id': user['_id']}, {'$set': {'token': token}})
            return token
        except Exception as e:
            print(f"Error in generate_token: {str(e)}")
            return None
