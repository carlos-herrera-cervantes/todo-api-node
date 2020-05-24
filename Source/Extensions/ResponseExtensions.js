'use strict';

const { subtractAbsolute } = require('./MathExtensions');

const getPaginateProperty = ({ query, documents, totalDocuments }) => {
  const pageSize = query.pageSize;

  if (pageSize <= 0) { return; }

  const page = query.page == 0 ? 1 : query.page + 1;
  const take = page * pageSize;
  const remainingDocuments = subtractAbsolute([ totalDocuments, take ]);

  return { page, pageSize, remainingDocuments, totalDocuments };
}

module.exports = { getPaginateProperty };
