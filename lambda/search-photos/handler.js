'use strict';
const elasticSearchService = require('./elasticSearchService');
const lexService = require('./lexService');

module.exports.search = async (event, context) => {
  
  console.log(event.queryStringParameters.q);
  let searchText = event.queryStringParameters.q;
  let keywords = lexService.extractKeywords(searchText);
  let paths = await elasticSearchService.getPhotoPaths(keywords);
  
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
