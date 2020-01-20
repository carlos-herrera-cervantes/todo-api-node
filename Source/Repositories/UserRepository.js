'use strict';

const { User } = require('../Models/User');

class UserRepository {
    constructor () { }

    async getAllAsync () {
        let users = await User.find();

        return users;
    }

    async getByIdAsync (id) {
        let user = await User.findById(id);

        return user;
    }

    async getByEmail (email) {
        let user = await User.findOne({ email });

        return user;
    }

    async createAsync (user) {
        let userObject = await User.create(user);

        await userObject.save();
    }

    async updateAsync (id, userUpdated) { await User.findOneAndUpdate({ _id: id }, { $set: userUpdated }, { new: true }); }

    async deleteAsync (id) { await User.findOneAndRemove({ _id: id }); }
}

module.exports = { UserRepository }