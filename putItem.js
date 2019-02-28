var AWS = require("aws-sdk");
const utils = require('./utils');
const jwt = require('jsonwebtoken');
// Db info
const teamName = 'Tryst_team'
const dynamoDB = utils.connectToDB(); 

var params = {
    TableName: teamName,
    Item: { // a map of attribute name to AttributeValue
    
        "email":"tiwariaman2000@gmail.com",
        "password":"asdf",
        "name":"Aman"
        // attribute_value (string | number | boolean | null | Binary | DynamoDBSet | Array | Object)
        // more attributes...
    },
};
dynamoDB.put(params, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(data); // successful response
});