'use strict';

const https = require('https');

module.exports.getPhotoPaths = async function(keywords) {

    // keywords = ["dog", "cat", "rabbit"];

    const options = {
        hostname: 'search-smart-photo-album-js7vrgydwdwvwkomkfrtntwz7y.us-east-1.es.amazonaws.com',
        path: '/_search?q=labels:' + keywords.join(),
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return new Promise((resolve, reject) => {
        https.get(options, (resp) => {
            let data = '';
            
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                let parsedData = JSON.parse(data);

                let photosPath = [];
                if (parsedData  && parsedData.hits && parsedData.hits.hits){
                    
                    let imageobjects = parsedData.hits.hits;
                    
                    photosPath = imageobjects.map(function (item) {
                        return `${item._source.bucket}/${item._source.objectKey}`
                    });

                }
                resolve(photosPath);
            });

        }).on("error", (err) => {
            console.log("Error Getting S3 Image Paths from Elastic");
            console.log("Error: " + err.message);
            reject(err.message);
        });
    });
};