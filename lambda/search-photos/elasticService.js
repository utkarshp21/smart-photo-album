'use strict';

const https = require('https');
const AWS = require('aws-sdk')

module.exports.getPhotoPaths = async function(label) {
    const options = {
        hostname: 'vpc-photos-pwijntujtjh2df7m2evxyujm7u.us-east-1.es.amazonaws.com',
        path: '/_search?q=labels:' + label,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return new Promise((resolve, reject) => {
        https.get(options, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                // console.log("printing chunks");
                data += chunk;
            });
            resp.on('end', () => {
                let parsedData = JSON.parse(data);
                let paths = [];
                if (parsedData  && parsedData.hits && parsedData.hits.hits){
                    let ids = parsedData.hits.hits;
                    paths = ids.map(function (elem) {
                        return {
                            "id": {S:elem._id},
                        };
                    });
                }
                console.log("Received " + paths.length + " ES indices");
                resolve(paths);
            });

        }).on("error", (err) => {
            console.log("Error Getting S3 Paths from Elastic");
            console.log("Error: " + err.message);
            reject(err.message);
        });
    });
}