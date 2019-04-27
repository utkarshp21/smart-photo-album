var AWS = require('aws-sdk');


const domain = "https://vpc-photos-pwijntujtjh2df7m2evxyujm7u.us-east-1.es.amazonaws.com";
const region = "us-east-1";
var index = 'node-test';
var type = '_doc';
var id = '1';
var json = {
  "title": "Moneyball",
  "director": "Bennett Miller",
  "year": "2011"
};


module.exports.indexDoc = async function(path, labels) {
    
    var endpoint = new AWS.Endpoint(domain);
    var request = new AWS.HttpRequest(endpoint, region);
    request.method = 'PUT';
    request.path += index + '/' + type + '/' + id;
    request.body = JSON.stringify(json);
    request.headers['host'] = domain;
    request.headers['Content-Type'] = 'application/json';
    // Content-Length is only needed for DELETE requests that include a request
    // body, but including it for all requests doesn't seem to hurt anything.
    request.headers["Content-Length"] = request.body.length;
    
    var credentials = new AWS.EnvironmentCredentials('AWS');
    var signer = new AWS.Signers.V4(request, 'es');
    signer.addAuthorization(credentials, new Date());
    
    var client = new AWS.HttpClient();
    return new Promise((resolve, reject) => {
        client.handleRequest(request, null, function(response) {
            console.log(response.statusCode + ' ' + response.statusMessage);
            response.on('end', function (chunk) {
                console.log("Indexing Complete");
                resolve("Done");
            });
            }, function(error) {
                console.log("Indexing Failed");
                reject(error);
            }
        );
    });
    
};