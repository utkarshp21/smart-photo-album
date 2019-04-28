'use strict';
const elasticSearchService = require('./elasticService');
const lexService = require('./lexService');

module.exports.search = async (event, context) => {
  
  // console.log("Received query - " + event.queryStringParameters.q);
  let searchText = "Show me dogs";//event.queryStringParameters.q;
  let keywords = await lexService.extractKeywords(searchText);
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
