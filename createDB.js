var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: "AKIAIWEFDSW73LWVHX5A",
  secretAccessKey: "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",
  region: "ap-south-1",
  endpoint: new AWS.Endpoint('https://dynamodb.ap-south-1.amazonaws.com')
});
var dynamodb = new AWS.DynamoDB();
var params = {
    TableName: 'Team_Data',
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