'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginController {

    constructor (userRepository) { 
        this.userRepository = userRepository;
    }

    async Login (request, response) {
        try {
            let user = await this.userRepository.getByEmail(request.body.email);
            
            if (!user) return response.status(404).send({ message: 'El usuario no está registrado' });

            let isValidPassword = await bcrypt.compare(request.body.password, user.password);

            if (!isValidPassword) return response.status(400).send({ message: 'Usuario o contraseña incorrectos' });

            let token = jwt.sign({ email: request.body.email }, process.env.SECRET_KEY);

            return response.status(200).send({ token });
        }
        catch (error) { console.log(error); return response.status(500).send({ message: error }); }
    }

}

module.exports = { LoginController }