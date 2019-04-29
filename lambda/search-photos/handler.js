'use strict';
const elasticSearchService = require('./elasticService');
const lexService = require('./lexService');

module.exports.search = async (event, context) => {
  
  let searchText = event["searchQuery"];
  let keywords = await lexService.extractKeywords(searchText);

  let imagePaths = await elasticSearchService.getPhotoPaths(keywords);

  return {
    statusCode: 200,
    body: {
      imagePaths: imagePaths,
      userQuery: event["searchQuery"],
    },
  };

};
