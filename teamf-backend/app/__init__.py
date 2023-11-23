import app.routes
from flask import Flask
from flask_jwt_extended import JWTManager
from app.routes.user_route import users
from app.routes.task_route import tasks
from app.routes import main
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # TODO: Allow only specific origins (?)

app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")
app.config['JWT_EXPIRATION_TIME'] = os.getenv("JWT_EXPIRATION_TIME")
jwt = JWTManager(app)

app.register_blueprint(main)
app.register_blueprint(users)
app.register_blueprint(tasks)
