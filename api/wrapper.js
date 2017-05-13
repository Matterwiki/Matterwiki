/* This is the wrapper for the Matterwiki API
The main function in the wrapper is the .call(endpoint,type,body,token) which returns a
promise with the response.
*/

var Promise = require("bluebird");
var os = require("os");
var hostname = os.hostname();
import request from "request";

const MatterwikiAPI = new API();

function API() {
  this.call = function(
    endpoint,
    type,
    token = null,
    body = null,
    query = null
  ) {
    return new Promise(function(resolve, reject) {
      // Create the endpoint URL
      endpoint =
        "http://" +
        hostname +
        ":" +
        (process.env.PORT || 5000).toString() +
        "/api/" +
        endpoint;

      console.log("Sending a " + type + " request to " + endpoint);

      request(
        {
          url: endpoint,
          method: type,
          headers: {
            "x-access-token": token
          },
          body: body,
          json: true
        },
        function(error, response, body) {
          if (body.error.error) {
            reject(body);
          } else {
            resolve(body);
          }
        }
      );
    });
  };
}

export default MatterwikiAPI;
