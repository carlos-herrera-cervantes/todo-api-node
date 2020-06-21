'use strict';

const _ = require('lodash');

const configurePagination = query => {
  let { page, pageSize } = query;

  page = page === 1 
    ? 0 : page === 0 
    ? 0 : page - 1;

  return { page: page * pageSize, pageSize };
}

const configureSort = query => {
  for (let property in query) {
    var field = property.toLowerCase().includes('sort') ? query[property] : false;
    if (field) { break; }
  }

  if (!field) { return; }

  const isAscending = field.includes('-');
  const objectQuery = {};
  const property = isAscending ? field.split('-').pop() : field;
  const value = isAscending ? -1 : 1;

  objectQuery[property] = value;

  return objectQuery;
}

const createObjectQuery = query => {
  if (!query) { return {}; }

  const criteria = {};

  for (let property in query) {
    if (process.env.QUERY_PARAMS.includes(property.toLowerCase())) continue;

    criteria[property] = query[property];
  }

  const sort = configureSort(query);
  const { page, pageSize } = configurePagination(query);
  const object = { criteria, sort, page, pageSize, relation: JSON.parse(_.get(query, 'relation', '[]')) };

  return object;
}

const requestExtensions = () => ({ configureSort, createObjectQuery });

module.exports = { requestExtensions };
