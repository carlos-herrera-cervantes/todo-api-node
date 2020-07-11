'use strict';

const setRelation = (filter, queryParams) => {
  if ('relation' in queryParams) {
    filter.relation = JSON.parse(queryParams.relation);
    return filter;
  }

  filter.relation = [];
  return filter;
}

const setCriteria = (filter, queryParams) => {
  if (Object.entries(queryParams).length === 0) {
    filter.criteria = {};
    return filter;
  }

  const isNotValidCriterias = [ 'sort', 'paginate', 'page', 'pageSize', 'relation' ];
  const result = {};
  Object.entries(queryParams).forEach(([ key, value ]) => {
      if (!isNotValidCriterias.includes(key)) {
          result[key] = value;
      }
  });

  filter.criteria = result;
  return filter;
}

const setPagination = (filter, queryParams) => {
  const isValidPaginate = 'paginate' in queryParams && 'page' in queryParams && 'pageSize' in queryParams;

  if (isValidPaginate) {
    const { page, pageSize } = queryParams;
    const intPage = parseInt(page);
    const intPageSize = parseInt(pageSize);
    const parsePage = intPage == 1 ? 0 : intPage == 0 ? 0 : intPage -1;
    
    filter.pagination = { page: parsePage * intPageSize, pageSize: intPageSize };
    return filter;
  }

  filter.pagination = { page: 0, pageSize: 0 };
  return filter;
}

const setSort = queryParams => {
  let filter = {}

  if ('sort' in queryParams) {
    const sort = queryParams.sort;
    const isAscending = sort.includes('-');
    const result = {};
    const property = isAscending ? sort.split('-').pop() : sort;
    result[property] = isAscending ? -1 : 1;
    filter.sort = result;
    return filter;
  }

  filter.sort = {};
  return filter;
}

const getMongoFilter = queryParams => {
  const sort = setSort(queryParams);
  const paginate = setPagination(sort, queryParams);
  const criteria = setCriteria(paginate, queryParams);
  const relation = setRelation(criteria, queryParams);

  return relation;
}

module.exports = { getMongoFilter };
