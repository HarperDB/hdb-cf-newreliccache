'use strict';

const config = require('../config');

const makeCacheRequest = async ({ hdbCore, url, method, minCreatedDate }) => {
  const cacheRequest = {
    body: {
      operation: 'search_by_conditions',
      schema: 'newrelic_cache',
      table: 'request_cache',
      operator: 'and',
      get_attributes: ['*'],
      hdb_user: config.HDB_USER,
      conditions: [
        {
          search_attribute: 'url',
          search_type: 'equals',
          search_value: url
        },
        {
          search_attribute: 'method',
          search_type: 'equals',
          search_value: method
        },
        {
          search_attribute: 'error',
          search_type: 'equals',
          search_value: false
        },
        {
          search_attribute: '__createdtime__',
          search_type: 'greater_than',
          search_value: minCreatedDate
        }
      ]
    }
  };

  try {
    return hdbCore.requestWithoutAuthentication(cacheRequest);
  } catch (e) {
    return false;
  }
}

module.exports = makeCacheRequest;
