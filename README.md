# New Relic API Cache Demo

A hackathon project for New Relic FutureHack 2022.

## Routes

---

### /getWeather

This endpoint accepts a query string containing `units`, `lat`, and `lon`, and returns the weather for that location. 

To get the weather, it executes a call to OpenWeatherMap's API. This call can take anywhere from 100ms to 500ms.

This application adds a cache layer to that request. Cached responses return in under 50ms- a significant improvement over the origin API request. This results  in a major user experience improvement.

We've instrumented HarperDB using the Node.js New Relic agent. The result is the ability to see response times in the New Relic dashboard, and set a cache timeout value that strikes a balance between timeliness and response time.


**example (you can just paste this into a browser)**

`GET https://functions-newrelic01-newrelic.harperdbcloud.com/newreliccache/getWeather?units=imperial&lat=39.7392&lon=-104.9903`
