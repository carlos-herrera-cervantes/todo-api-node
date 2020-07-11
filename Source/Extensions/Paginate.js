'use strict';

const getPaginateObject = (queryParameters, totalDocuments) => {
  const { page, pageSize } = queryParameters;
  const intPage = parseInt(page);
  const intPageSize = parseInt(pageSize);
  const take = intPage * intPageSize;
  const subtractedItems = totalDocuments - take;
  const remainingDocuments = subtractedItems <= 0 ? 0 : subtractedItems;

  return {
    page: intPage,
    pageSize: intPageSize,
    remainingDocuments,
    totalDocuments
  }
}

module.exports = { getPaginateObject };
