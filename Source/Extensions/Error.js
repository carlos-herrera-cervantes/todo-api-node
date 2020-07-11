'use strict';

const { internalServerError } = require('../Extensions/Response');

const handleExceptionAsync = async (func, ...args) => {
    try {
        await func(...args);
    }
    catch (error) {
        const [, response] = args;
        console.error(error);
        return internalServerError(false, response, error.message);
    }
}

const handleException = (func, ...args) => {
    try {
        func(...args);
    }
    catch (error) {
        const [, response] = args;
        console.error(error);
        return internalServerError(false, response, error.meesage);
    }
}

module.exports = { handleExceptionAsync, handleException };