var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: "AKIAIWEFDSW73LWVHX5A",
  secretAccessKey: "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",
  region: "ap-south-1",
  endpoint: new AWS.Endpoint('https://dynamodb.ap-south-1.amazonaws.com')
});
// Db info
const teamName = 'Player_Data'
const dynamoDB = new AWS.DynamoDB.DocumentClient();

var fs = require('fs'),
     readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('./Book1.csv'),
    output: process.stdout,
    console: false
});

rd.on('line', function(line) {
    // console.log(line);
     var arr = line.split(",");
     var params = {
        TableName: teamName,
        Item: { // a map of attribute name to AttributeValue
    
            "pname":arr[0],
            "matches":arr[1],
            "speciality":arr[6],
            "sr":arr[2],
            "baAvg":arr[3],
            "boAvg":arr[4],
            "economy":arr[5],
            "imagelink":arr[7] 
        // attribute_value (string | number | boolean | null | Binary | DynamoDBSet | Array | Object)
        // more attributes...
        },
    };
    dynamoDB.put(params, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(data); // successful response
});
});