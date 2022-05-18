"use strict";

const needle = require("needle");

const callAPI = async ({ url, request, headers }) => {
  if (request.method.toLowerCase() === "post") {
    return needle(request.method, url, request.body, {
      headers,
      rejectUnauthorized: true,
      compressed: true,
      parse_response: false,
      json: true,
    })
      .then((resp) => resp)
      .catch((err) => err);
  }
  return needle(request.method, url, {
    headers,
    rejectUnauthorized: true,
    compressed: true,
    parse_response: false,
  })
    .then((resp) => resp)
    .catch((err) => err);
};

module.exports = callAPI;
