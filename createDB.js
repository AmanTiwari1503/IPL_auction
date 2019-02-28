var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: "None",
  secretAccessKey: "None",
  region: "None",
  endpoint: "http://localhost:8000"
});
var dynamodb = new AWS.DynamoDB();
var params = {
    TableName: 'Tryst_team',
    KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
        { // Required HASH type attribute
            AttributeName: 'email',
            KeyType: 'HASH',
        },
        { // Optional RANGE key type for HASH + RANGE tables
            AttributeName: 'password', 
            KeyType: 'RANGE', 
        }
    ],
    AttributeDefinitions: [ // The names and types of all primary and index key attributes only
        {
            AttributeName: 'email',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'password',
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