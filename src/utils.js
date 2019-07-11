import { notify } from "./notifications.js";

/*
gets a JSON from specified URL via HTTP request

*/

const get = (url, responseType) => {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    let req = new XMLHttpRequest();
    req.responseType = responseType;

    req.open("GET", url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      } else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        if (window.ga) {
          window.ga("send", "event", "serviceFailure", req.status, url);
        }
        notify(`Failed with status ${req.status}: ${req.statusText}`);
        reject(Error(`Failed with status ${req.status}: ${req.statusText}`));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject("Network Error");
    };

    // Make the request
    req.send();
  });
};

export { get };
