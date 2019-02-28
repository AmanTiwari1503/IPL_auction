/**
 * Created by Nikhil on 23/05/17.
 */
const utils = require('./utils');
//const jwt = require('jsonwebtoken');
// Db info
const teamName = 'Tryst_team'
const dynamoDB = utils.connectToDB(); 
//const secret = require('../Models/secrets');
var params = {
    TableName: 'Tryst_team',
    KeyConditionExpression: 'email = :value',
    ExpressionAttributeValues: { // a map of substitutions for all attribute values
      ':value': 'tiwariaman2000@gmail.com',
    }, // a string representing a constraint on the attribute
};

dynamoDB.query(params, function(err,data){
	if(err)
		console.log(err);
	else
		console.log(data);
});