from flask import Blueprint, jsonify, request
from app.services.user_service import UserService

users = Blueprint('users', __name__)


@users.route('/api/user/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json()

        if not data or 'username' not in data or 'email' not in data or 'password' not in data:
            return jsonify({'message': 'Invalid request'}), 400

        username = data['username']
        email = data['email']
        password = data['password']

        existing_user_username = UserService.find_user_by_username(username)
        existing_user_email = UserService.find_user_by_email(email)

        if existing_user_username:
            return jsonify({'message': 'Username already in use'}), 409
        if existing_user_email:
            return jsonify({'message': 'Email already in use'}), 409

        user_id = UserService.save_user(username, email, password)

        if user_id:
            return jsonify({'message': 'Registration successful', 'user_id': str(user_id)}), 201
        else:
            return jsonify({'message': 'Registration failed'}), 500
    except Exception as e:
        print(f"Error in register_user: {str(e)}")
        return jsonify({'message': 'An error occurred'}), 500


@users.route('/api/user/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data or 'username' not in data or 'password' not in data:
            return jsonify({'message': 'Invalid request'}), 400

        username = data['username']
        password = data['password']

        user = UserService.find_user_by_username(username)
        isAuth = UserService.authenticate_user(user, password)

        if isAuth:
            token = UserService.generate_token(user)
            return jsonify({'message': 'Login successful', 'token': token}), 200
        else:
            return jsonify({'message': 'Invalid username or password'}), 401
    except Exception as e:
        print(f"Error in login route: {str(e)}")
        return jsonify({'message': 'An error occurred'}), 500


@users.route('/api/user', methods=['GET'])
def get_users():
    try:
        users_list = UserService.get_users()
        return jsonify(users_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
