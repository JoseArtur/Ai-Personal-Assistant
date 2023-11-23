from flask import Blueprint, jsonify
from app.services.user_service import UserService

main = Blueprint('main', __name__)


@main.route('/', methods=['GET'])
def get_main():
    return '<h1> TeamF backend Service <h1/>'
