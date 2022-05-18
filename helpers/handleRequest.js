'use strict';

const makeCacheRequest = require('../helpers/makeCacheRequest');
const incrementCacheHits = require('../helpers/incrementCacheHits');
const saveResultToCache = require('../helpers/saveResultToCache');
const callAPI = require('../helpers/callAPI');

const config = require('../config');

const handleRequest = async ({ hdbCore, request, reply, logger, url, headers, reqShouldCache, max_age_seconds = config.DEFAULT_MAX_AGE_SECONDS}) => {
  const method = request.method;
  const start = Date.now();
  const minCreatedDate = start - (max_age_seconds * 1000);
  let shouldCache;
  if(reqShouldCache === undefined) shouldCache = config.METHODS_TO_CACHE.includes(method);
  else shouldCache = reqShouldCache;
  let cacheResult = false;

  if (shouldCache) {
    cacheResult = await makeCacheRequest({ hdbCore, url, method, minCreatedDate });
  }

  if (cacheResult?.length) {
    reply.header('hdb-from-cache', true);

    const { id, hits, result, content_type, status } = cacheResult[0];

    reply.header('content-type', content_type);

    incrementCacheHits({ hdbCore, id, hits })

    // return result;

    return { status_code: status, response_body: result };
  } else {
    reply.header('hdb-from-cache', false);

    try {
      const response = await callAPI({ request, url, headers });
      const content_type = response.headers['content-type'];
      const result = response.body;
      const status = response.statusCode;
      const error = response.statusCode < 200 || response.statusCode > 299;
      const duration_ms = Date.now() - start;

      reply.header('content-type', response.headers['content-type']);

      if (shouldCache) {
        await saveResultToCache({ hdbCore, url, result, method, error, status, content_type, duration_ms });
      }

      return { status_code: response.statusCode, response_body: response.body };
    } catch (error) {
      const result = error.message;

      reply.header('content-type', 'application/json; charset=utf-8');

      await saveResultToCache({ hdbCore, url, result, method, error: true });

      return { status_code: 500, response_body: error.message };
    }
  }
}

module.exports = handleRequest;
