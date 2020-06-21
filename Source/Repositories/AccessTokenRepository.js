'use strict';

const { AccessToken } = require('../Models/AccessToken');

const getOneAsync = async ({ criteria }) => await AccessToken.findOne(criteria ? criteria : {});

const createAsync = async accessToken => {
    const accessTokenCreated = await AccessToken.create(accessToken);
    return accessTokenCreated.save();
}

const accessTokenRepository = () => ({
    getOneAsync,
    createAsync
});

module.exports = { accessTokenRepository };