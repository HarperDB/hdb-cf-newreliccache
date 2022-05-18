"use strict";

const handleRequest = require("../helpers/handleRequest");
const handleResponse = require("../helpers/handleResponse");

const OPENWEATHERMAP_APPID = "ENTER_YOUR_API_KEY_HERE";

module.exports = async (server, { hdbCore, logger }) => {
  server.route({
    url: "/getWeather",
    method: "GET",
    handler: async (request, reply) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?appid=${OPENWEATHERMAP_APPID}&units=${request.query.units}&lat=${request.query.lat}&lon=${request.query.lon}`;

      const result = await handleRequest({
        hdbCore,
        request,
        reply,
        logger,
        url,
        max_age_seconds: 30,
      });

      // transform result here
      const transformedResult = result;

      return handleResponse({
        response_body: transformedResult.response_body,
        status_code: transformedResult.status_code,
        reply: reply,
      });
    },
  });
};
