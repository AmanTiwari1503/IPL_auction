var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: "enter_access_key",
  secretAccessKey: "enter_secret_key",
  region: "ap-south-1",
  endpoint: new AWS.Endpoint('https://dynamodb.ap-south-1.amazonaws.com')
});
var dynamodb = new AWS.DynamoDB();
var params = {
    TableName: 'Player_Data',
    KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
        { // Required HASH type attribute
            AttributeName: 'pname',
            KeyType: 'HASH',
        },
        { // Optional RANGE key type for HASH + RANGE tables
            AttributeName: 'matches', 
            KeyType: 'RANGE', 
        }
    ],
    AttributeDefinitions: [ // The names and types of all primary and index key attributes only
        {
            AttributeName: 'pname',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'matches',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        },
        // ... more attributes ...
    ],
    ProvisionedThroughput: { // required provisioned throughput for the table
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5, 
    },
};
dynamodb.createTable(params, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(data); // successful response

});