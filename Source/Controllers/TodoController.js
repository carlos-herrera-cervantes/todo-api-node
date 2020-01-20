'use strict';

const { ObjectID } = require('mongodb');

class TodoController {
    constructor (todoRepository, userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }

    async getAllAsync (request, response) {
        try {
            let todos = await this.todoRepository.getAllAsync();

            return response.status(200).send(todos);
        } 
        catch (error) {
            return response.status(400).send(error);
        }
    }

    async getByIdAsync (request, response) {
        try {
            let id = request.params.id;

            if (!ObjectID.isValid(id)) return response.status(404).send();

            let todo = await this.todoRepository.getByIdAsync(id);

            return response.status(200).send(todo);
        } 
        catch (error) {
            return response.status(400).send(error);
        }
    }

    async createAsync (request, response) {
        try {
            let userId = request.params.id;

            request.body.createdAt = new Date().getTime();
            request.body.user = userId;

            let todo = await this.todoRepository.createAsync(request.body);
            
            let user = await this.userRepository.getByIdAsync(userId);
            user.todos.push(todo);

            await this.userRepository.updateAsync(userId, user);

            return response.status(201).send(request.body);    
        } 
        catch (error) {
            console.log(error);
            return response.status(400).send(error);
        }
    }

    async updateAsync (request, response) {
        try {
            let id = request.params.id;

            if (!ObjectID.isValid(id)) return response.status(404).send();

            await this.todoRepository.updateAsync(id, request.body);

            return response.status(201).send(request.body);
        } 
        catch (error) {
            return response.status(400).send(error);    
        }
    }

    async deleteAsync (request, response) {
        try {
            let id = request.params.id;

            if (!ObjectID.isValid(id)) return response.status(404).send();

            await this.todoRepository.deleteAsync(id);

            return response.status(204).send();
        } 
        catch (error) {
            return response.status(400).send(error);    
        }
    }
}

module.exports = { TodoController }