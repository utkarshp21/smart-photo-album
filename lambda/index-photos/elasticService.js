let AWS = require('aws-sdk');


module.exports.indexDoc = async function (imageKey, labels, bucket, createdTimeStamp) {
    
    let elasticObject = {
        "objectKey": imageKey,
        "bucket": bucket,
        "labels": labels,
        "imageUploadedTimeStamp": createdTimeStamp,
    };

    console.log("Elactic Object Print:", elasticObject);
    const domain = "vpc-photo-search-album-zelam7lth2thitno4brjoztjxq.us-east-1.es.amazonaws.com";
    // const domain = "search-smart-photo-album-js7vrgydwdwvwkomkfrtntwz7y.us-east-1.es.amazonaws.com";
    const region = "us-east-1";
    let index = 'photos';
    let type = '_doc';
    let id = bucket + "-" + imageKey.split('.').join("-");
    console.log("ID: ", id);
    const endpoint = new AWS.Endpoint(domain);
    
    let request = new AWS.HttpRequest(endpoint, region);
    request.method = 'PUT';
    request.path += index + '/' + type + '/' + id;
    request.body = JSON.stringify(elasticObject);
    request.headers['host'] = domain;
    request.headers['Content-Type'] = 'application/json';
    
    
    let credentials = new AWS.EnvironmentCredentials('AWS');
    let signer = new AWS.Signers.V4(request, 'es');
    signer.addAuthorization(credentials, new Date());
    
    let client = new AWS.HttpClient();
    
    return new Promise((resolve, reject) => {
        client.handleRequest(request, null, function(response) {
            console.log(response.statusCode + ' ' + response.statusMessage);
            let elasticResponse = '';
            response.on('data', function (chunk) {
                elasticResponse += chunk;
            });
            response.on('end', function () {
                console.log("Indexing Complete");
                console.log('Response body: ' + elasticResponse);
                resolve(elasticResponse);
            });
            }, function(error) {
                console.log("Indexing Failed");
                reject(error);
            }
        );
    });
    
};




