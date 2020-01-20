'use strict';

const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb');

class UserController {

    constructor (userRepository, todoRepository) {
        this.userRepository = userRepository;
        this.todoRepository = todoRepository;
    }

    async getAllAsync (request, response) {
        try {           
            let users = await this.userRepository.getAllAsync();
            
            return response.status(200).send(users);
        }
        catch (error) {
            return response.status(400).send(error);
        }
    }

    async getByIdAsync (request, response) {
        try {
            let id = request.params.id;

            if (!ObjectID.isValid(id)) return response.status(404).send();

            let user = await this.userRepository.getByIdAsync(id);

            return response.status(200).send(user);
        }
        catch (error) {
            return response.status(400).send(error);
        }
    }

    async createAsync (request, response) {
        try {
            request.body.password = await bcrypt.hash(request.body.password, 10);

            await this.userRepository.createAsync(request.body);

            return response.status(201).send(request.body);
        } 
        catch (error) {
            return response.status(400).send(error);
        }
    }

    async updateAsync (request, response) {
        try {
            let id = request.params.id;
            
            if (!ObjectID.isValid(id)) return response.status(404).send();

            await this.userRepository.updateAsync(id, request.body);

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

            await this.userRepository.deleteAsync(id);
            await this.todoRepository.deleteManyAsync(id);

            return response.status(204).send();
        } 
        catch (error) {
            return response.status(400).send(error);
        }
    }

}

module.exports = { UserController }