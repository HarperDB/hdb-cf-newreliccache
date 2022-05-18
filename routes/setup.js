'use strict';

const setup = async (server, { hdbCore, logger }) => {
  server.route({
    url: '/setup',
    method: 'GET',
    handler: async (request) => {
      const results = {};

      request.body = {
        operation: 'create_schema',
        schema: 'newrelic_cache'
      }

      try {
        results.schema_result = await hdbCore.requestWithoutAuthentication(request);
      } catch (e) {
        results.schema_result = e;
      }

      request.body = {
        operation: 'create_table',
        schema: 'newrelic_cache',
        table: 'request_cache',
        hash_attribute: 'id'
      }

      try {
        results.cache_table_result = await hdbCore.requestWithoutAuthentication(request);
      } catch (e) {
        results.cache_table_result = e;
      }

      await new Promise(resolve => setTimeout(resolve, 100));

      request.body = {
        operation: 'create_attribute',
        schema: 'newrelic_cache',
        table: 'request_cache',
        attribute: 'url'
      }

      try {
        results.cache_table_attribute_url_result = await hdbCore.requestWithoutAuthentication(request);
      } catch (e) {
        results.cache_table_attribute_url_result = e;
      }

      request.body = {
        operation: 'create_attribute',
        schema: 'newrelic_cache',
        table: 'request_cache',
        attribute: 'method'
      }

      try {
        results.cache_table_attribute_method_result = await hdbCore.requestWithoutAuthentication(request);
      } catch (e) {
        results.cache_table_attribute_method_result = e;
      }

      request.body = {
        operation: 'create_attribute',
        schema: 'newrelic_cache',
        table: 'request_cache',
        attribute: 'error'
      }

      try {
        results.cache_table_attribute_error_result = await hdbCore.requestWithoutAuthentication(request);
      } catch (e) {
        results.cache_table_attribute_error_result = e;
      }

      request.body = {
        operation: 'create_table',
        schema: 'newrelic_cache',
        table: 'server_locations',
        hash_attribute: 'id'
      }

      try {
        results.server_location_table_result = await hdbCore.requestWithoutAuthentication(request);
      } catch (e) {
        results.server_location_table_result = e;
      }

      return results;
    }
  });
};

module.exports = setup;
