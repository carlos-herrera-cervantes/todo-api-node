'use strict';

const { subtractAbsolute } = require('./MathExtensions');

const getPaginateProperty = ({ query, documents, totalDocuments }) => {
  let pageSize = query.pageSize;

  if (pageSize <= 0) { return; }

  let page = query.page == 0 ? 1 : query.page + 1;
  let take = page * pageSize;
  let remainingDocuments = subtractAbsolute([ totalDocuments, take ]);

  return { page, pageSize, remainingDocuments, totalDocuments };
}

module.exports = { getPaginateProperty };
