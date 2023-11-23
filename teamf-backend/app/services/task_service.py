from config import mongo
from app.models.task_model import Task
from flask import jsonify, abort, Response
from bson import ObjectId
from datetime import datetime
from flask_jwt_extended import get_jwt_identity


class TaskService:
    @staticmethod
    def get_tasks_by_user_id():
        try:
            user_id = get_jwt_identity()
            tasks = mongo.test.tasks.find({"user_id": user_id})

            task_list = []
            for task in tasks:
                task_dict = {
                    "id": str(task.get('_id')),
                    "title": task.get('title', ''),
                    "description": task.get('description', ''),
                    "user_id": task.get('user_id', ''),
                    "due_date": parse_datetime(task.get('due_date', '')),
                    "completed_at": parse_datetime(task.get('completed_at', '')),
                    "created_at": parse_datetime(task.get('created_at', '')),
                    "updated_at": parse_datetime(task.get('updated_at', ''))
                }
                task_list.append(Task(**task_dict).to_dict())

            return task_list
        except Exception as e:
            return jsonify({'error': str(e)})

    @staticmethod
    def get_task_by_id(id):
        try:
            id_object = ObjectId(id)
            task = mongo.test.tasks.find_one({'_id': id_object})

            return Task(
                id=str(task.get('_id')),
                title=task['title'],
                description=task['description'],
                user_id=task['user_id'],
                due_date=task['due_date'],
                completed_at=task['completed_at'],
                created_at=task['created_at'],
                updated_at=task['updated_at']
            ).to_dict()
        except Exception as e:
            abort(str(e))

    @staticmethod
    def create_task(data):
        try:
            data['user_id'] = get_jwt_identity()
            data['created_at'] = datetime.now().isoformat()
            data['updated_at'] = datetime.now().isoformat()
            data['completed_at'] = 'completed_at' in data and data['completed_at'] or ''
            task = mongo.test.tasks.insert_one(data)

            response = {
                'id': str(task.inserted_id),
                'title': data['title'],
                'description': data['description'],
                'user_id': data['user_id'],
                'due_date': data['due_date'],
                'completed_at': data['completed_at'],
                'created_at': data['created_at'],
                'updated_at': data['updated_at']
            }

            return response
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @staticmethod
    def edit_task(id, data):
        try:
            data['updated_at'] = datetime.now().isoformat()
            data['completed_at'] = 'completed_at' in data and data['completed_at'] or ''

            id_object = ObjectId(id)

            mongo.test.tasks.update_one({'_id': id_object}, {'$set': data})

            response = {
                "message": "Task updated sucessfuly",
                "data": TaskService.get_task_by_id(id)
            }

            return response

        except Exception as e:
            abort(str(e))

    @staticmethod
    def delete_task(id):
        id_object = ObjectId(id)
        task = mongo.test.tasks.delete_one({'_id': id_object})
        return task.deleted_count > 0


def parse_datetime(value):
    return datetime.fromisoformat(value) if value else None
