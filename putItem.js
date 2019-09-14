var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: "AKIAJ3AVHXVIGWHPFS2Q",
  secretAccessKey: "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",
  region: "ap-south-1",
  endpoint: new AWS.Endpoint('https://dynamodb.ap-south-1.amazonaws.com')
});
// Db info
const teamName = 'Tryst_team'
const dynamoDB = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: teamName,
    Item: { // a map of attribute name to AttributeValue
    
        "email":"admin.iitd@gmail.com",
        "password":"adminiitd",
        "name":"Admin"
        // attribute_value (string | number | boolean | null | Binary | DynamoDBSet | Array | Object)
        // more attributes...
    },
};
dynamoDB.put(params, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(data); // successful response
});