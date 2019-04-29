const AWS = require('aws-sdk')
const lexRuntime = new AWS.LexRuntime();

module.exports.extractKeywords = async function(query) {

    var params = {
        botAlias: '$LATEST',
        botName: 'PhotoSearch',
        inputText: query, 
        userId: 'STRING_VALUE',
    };

    return new Promise((resolve, reject) => {
        lexRuntime.postText(params, function(err, data) {
            console.log("lex Data", data);
            console.log("lex Data Slots", data.slots);
            if (err) {
                console.log("Failed to get labels from query");
                console.log(err, err.stack);
                reject(err);
            }
            else {
                let keywords = [];
                if (data && data.slots){
                    for (var a in data.slots) {
                        keywords.push(data.slots[a]);
                    }
                }
                console.log("Returning keywords To Search - " + keywords);
                resolve(keywords);
            }    
        });
    });
};