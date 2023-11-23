from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from simple_chalk import green, red

load_dotenv()

db_user_name = os.getenv("DB_USER")
db_user_password = os.getenv("DB_PASSWORD")
db_cluster = os.getenv("DB_CLUSTER")

uri = f"mongodb+srv://{db_user_name}:{db_user_password}@{db_cluster}.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
mongo = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    mongo.admin.command('ping')
    print(green("You successfully connected to MongoDB!"))
except Exception as e:
    print(red("Unable to connect to the database: "), e)
