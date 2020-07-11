'use strict';

const { AccessToken } = require('../Models/AccessToken');

const getOneAsync = async mongoFilter => await AccessToken.findOne(mongoFilter.criteria);

const createAsync = async accessToken => await AccessToken.create(accessToken);

const deleteManyAsync = async mongoFilter => await AccessToken.deleteMany(mongoFilter.criteria);

module.exports = { getOneAsync, createAsync, deleteManyAsync };