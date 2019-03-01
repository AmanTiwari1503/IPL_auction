var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: "AKIAIWEFDSW73LWVHX5A",
  secretAccessKey: "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",
  region: "ap-south-1",
  endpoint: new AWS.Endpoint('https://dynamodb.ap-south-1.amazonaws.com')
});
// Db info
const teamName = 'Team_Data'
const dynamoDB = new AWS.DynamoDB.DocumentClient();

function params(tname){
	return{
    TableName: "Player_Data",
    Key:{
    	'pname':'Hardik Pandya',
    },
    UpdateExpression: 'SET owner '+tname,
/*    ExpressionAttributeValues: { // a map of substitutions for all attribute values
      ':value': tname,
    }, // a string representing a constraint on the attribute*/
}
};

dynamoDB.query(params("lions"), function(err,data){
	if(err)
		console.log(err);
	else
		console.log(data);
});