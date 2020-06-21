'use strict';

const { subtractAbsolute } = require('./MathExtensions');

const getPaginateProperty = ({ query, totalDocuments }) => {
  const { pageSize, page: pageQuery } = query;

  if (pageSize <= 0) { return; }

  const page = pageQuery == 0 ? 1 : pageQuery;
  const take = page * pageSize;
  const remainingDocuments = subtractAbsolute([ totalDocuments, take ]);

  return { page, pageSize, remainingDocuments, totalDocuments };
}

module.exports = { getPaginateProperty };
