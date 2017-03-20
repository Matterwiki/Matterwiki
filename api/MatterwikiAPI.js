/* This is the wrapper for the Matterwiki API
The main function in the wrapper is the .call(endpoint,type,body,token) which returns a
promise with the response.
*/

var Promise = require("bluebird");
var os = require("os");
var hostname = os.hostname();
import unirest from "unirest";

const MatterwikiAPI = new API()

function API() {

  this.call = function(endpoint,type,token=null,body={},query={}) {
    return new Promise(function(resolve,reject){
      endpoint = "http://localhost:5000/api/"+endpoint;
      var headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": token
      };
      console.log("Sending a "+type+" request to "+endpoint);
      unirest(type,endpoint,headers,body,
          function(response,error) {
            if(response.error.error) {
              console.log("API CALL ERROR"+ response.error.error);
                reject(response.error.message);
            }
            else {
                resolve(response.body);
            }
          });
    });
  }
}

export default MatterwikiAPI;
