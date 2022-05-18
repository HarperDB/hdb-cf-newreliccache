"use strict";

const handleResponse = async ({ response_body, status_code, reply }) => {
  try {
    if (status_code !== 200) {
      reply.code(status_code).send(response_body);
    } else {
      reply.code(200).send(response_body);
    }
  } catch (error) {
    reply.header("content-type", "application/json; charset=utf-8");
    reply.code(status_code).send({ error: error.message });
  }
};

module.exports = handleResponse;
