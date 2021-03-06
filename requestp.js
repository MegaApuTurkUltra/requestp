//requestp.js - A simple promise based wrapper around XMLHttpRequest

function requestp (options) {
  'use strict';
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    if (options.headers) {
      for (var header of options.headers){
        req.setRequestHeader(header.header, header.value);
      }
    }
    if (options.mimetype) {
      req.overrideMimeType(options.mimetype);
    }
    if (options.user) {
      req.open(options.method, options.url, true, options.user, options.password);
    }
    else {
      req.open(options.method, options.url, true);
    }
    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      }
      else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(Error("Network Error"));
    };
    if (options.body) {
      req.send(options.body);
    }
    else {
      req.send();
    }
  });
};
requestp.get = function(arg){
  if (typeof arg === "string"){
    return requestp({
              method: "GET",
              url: arg
    })
  } else {
    arg.method = "GET";
    return requestp(arg)
  }
}
requestp.getJSON = function(arg){
  return requestp.get(arg).then(JSON.parse)
}
requestp.post = function(arg){
  arg.method = "POST";
  return requestp(arg)
}