'use strict';

const configurePagination = query => {
  query.page = query.page === 1 ? 0 : query.page === 0 ? 0 : query.page - 1;

  return { page: query.page * query.pageSize, pageSize: query.pageSize };
}

const configureSort = query => {
  for (let property in query) {
    var field = property.toLowerCase().includes('sort') ? query[property] : false;
    if (field) { break; }
  }

  if (!field) { return; }

  const isAscending = field.includes('-');
  const objectQuery = {};

  objectQuery[isAscending ? field.split('-').pop() : field] = isAscending ? -1 : 1;

  return objectQuery;
}

const createObjectQuery = query => {
  if (!query) { return {}; }
  
  const criteria = { };

  for (let property in query) {
    if (process.env.QUERY_PARAMS.includes(property.toLowerCase())) continue;

    criteria[property] = query[property];
  }

  const sort = configureSort(query);
  const { page, pageSize } = configurePagination(query);
  const object = { criteria, sort, page, pageSize };

  return object;
}

const requestExtensions = () => ({ configureSort, createObjectQuery });

module.exports = { requestExtensions };