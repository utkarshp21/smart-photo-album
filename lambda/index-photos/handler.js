'use strict';

const rekognitionService = require('./rekognitionService');
const elasticService = require('./elasticService');

module.exports.index = async (event, context) => {
  
  let bucket = event.Records[0].s3.bucket.name
  let imageKey = event.Records[0].s3.object.key;
  
  let createdTimeStamp = event.Records[0].eventTime;
  
  let labels = await rekognitionService.detectLabels(bucket, imageKey);
  
  let response = await elasticService.indexDoc(imageKey, labels, bucket, createdTimeStamp);
 
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: response,
      input: event,
    }),
  };
};
