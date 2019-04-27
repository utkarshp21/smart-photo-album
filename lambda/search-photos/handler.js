'use strict';
const elasticSearchService = require('./elasticSearchService');


module.exports.search = async (event, context) => {
  
  
  let paths = await elasticSearchService.getPhotoPaths(query);
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      paths: paths,
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
