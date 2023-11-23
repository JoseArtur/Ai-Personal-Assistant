from flask import Blueprint, jsonify, request
from app.services.task_service import TaskService
from flask_jwt_extended import jwt_required

tasks = Blueprint('tasks', __name__)


@tasks.route('/api/tasks/', methods=['GET'])
@jwt_required()
def get_tasks_by_user_id():
    try:
        tasks_list = TaskService.get_tasks_by_user_id()
        return jsonify(tasks_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@tasks.route('/api/tasks/<id>', methods=['GET'])
def get_task_by_id(id):
    try:
        task = TaskService.get_task_by_id(id)
        return jsonify(task), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@tasks.route('/api/tasks/', methods=['POST'])
@jwt_required()
def create_task():
    try:
        content = request.json
        data = TaskService.create_task(content)
        return jsonify({'message': 'Task created successfully', 'data': data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@tasks.route('/api/tasks/<id>', methods=['DELETE'])
def delete_task(id):
    try:
        if (TaskService.delete_task(id)):
            message, error = 'Task deleted successfully', 200
        else:
            message, error = 'Task not found', 404
        return jsonify(message), error
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@tasks.route('/api/tasks/<id>', methods=['PUT'])
def edit_task(id):
    try:
        content = request.json
        task = TaskService.edit_task(id, content)
        return jsonify(task), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
