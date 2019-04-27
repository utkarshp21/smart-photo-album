'use strict';

const rekognitionService = require('./rekognitionService');
const elasticService = require('./elasticService');

module.exports.index = async (event, context) => {
  
  let bucket = "photo-album-b2";
  let path = "416x416.jpg";//event.Records[0].s3.object.key;
  console.log("S3 image path - " + path);
  let labels = await rekognitionService.detectLabels(bucket,path);
  let response = await elasticService.indexDoc(path, labels);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
