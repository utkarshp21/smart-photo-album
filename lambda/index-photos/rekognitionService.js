const aws = require('aws-sdk');

let rekognition = new aws.Rekognition({
  apiVersion: '2016-06-27'
});

module.exports.detectLabels = async function(bucket, path) {
       
    var params = {
        Image: {
            S3Object: {
                Bucket: bucket, 
                Name: path
            }
        }, 
        MaxLabels: 5, 
        MinConfidence: 90   
    };
    return new Promise((resolve, reject) => {
        rekognition.detectLabels(params, function(err, data) {
            if (err) {
                // an error occurred
                console.log("Detect Labels Failed[" + bucket  + ":" + path + "]");
                console.log(err, err.stack); 
                reject(err);
            }
            else {
                // successful response
                let labels = [];
                data['Labels'].forEach(function (item, index) {
                    labels.push(item.Name); 
                });
                console.log("Labels extracted  - " + labels);   
                resolve(labels);
            }
        });
    });
};
/*
   data = {
    Labels: [
       {
      Confidence: 99.25072479248047, 
      Name: "People"
     }, 
       {
      Confidence: 99.25074005126953, 
      Name: "Person"
     }
    ]
   }
   */