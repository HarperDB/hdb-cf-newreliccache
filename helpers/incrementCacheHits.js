'use strict';

const config = require('../config');

const incrementCacheHits = ({ hdbCore, id, hits }) => {
  try {
    const hitRequest = {
      body: {
        operation: 'update',
        schema: 'newrelic_cache',
        table: 'request_cache',
        hdb_user: config.HDB_USER,
        records: [{ id, hits: hits + 1 }]
      }
    };

    return hdbCore.requestWithoutAuthentication(hitRequest);
  } catch (e) {
    return false;
  }
}

module.exports = incrementCacheHits;
