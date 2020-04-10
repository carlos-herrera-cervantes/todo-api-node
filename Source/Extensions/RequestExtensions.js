'use strict';

const configureSort = query => {
  for (let property in query) {
    var field = property.toLowerCase().includes('sort') ? query[property] : false;
    if (field) { break; }
  }

  if (!field) { return; }

  let isAscending = field.includes('-');
  let objectQuery = {};
  
  objectQuery[isAscending ? field.split('-').pop() : field] = isAscending ? -1 : 1;

  return objectQuery;
}

const createObjectQuery = query => {
  if (!query) { return {}; }

  let object = { criteria: {} };

  for (let property in query) {
    if (property.toLowerCase().includes('sort')) continue;

    object.criteria[property] = query[property];
  }

  let sort = configureSort(query);

  sort ? object.sort = sort : object;

  return object;
}

const requestExtensions = () => ({ configureSort, createObjectQuery });

module.exports = { requestExtensions };
