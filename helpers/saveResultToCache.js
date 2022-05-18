'use strict';

const config = require('../config');

const saveResultToCache = async ({ hdbCore, url, result, method, status, content_type, duration_ms, error = false }) => {
  const cacheRequest = {
    body: {
      operation: 'insert',
      schema: 'newrelic_cache',
      table: 'request_cache',
      records: [{ url, result, method, error, duration_ms, content_type, status, hits: 0 }],
      hdb_user: config.HDB_USER
    }
  }

  return hdbCore.requestWithoutAuthentication(cacheRequest);
}

module.exports = saveResultToCache;
