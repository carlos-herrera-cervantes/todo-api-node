'use strict';

const i18n = require('i18n');
const path = require('path');

i18n.configure({ directory: path.join(__dirname, '..', 'Locales'), defaultLocale: 'es' });

const configureLanguages = (request, response, next) => {
  i18n.init(request, response);
  
  return next();
}

module.exports = { configureLanguages };
