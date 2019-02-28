/**
 * Created by Aman
 */
const utils = require('../../utils');
const jwt = require('jsonwebtoken');
// Db info
const teamName = 'Player_Data3'
const dynamoDB = utils.connectToDB(); 
//const secret = require('../Models/secrets');
function params(pname) {
    return{
    TableName: 'Player_Data3',
    KeyConditionExpression: 'pname = :value',
    ExpressionAttributeValues: { // a map of substitutions for all attribute values
      ':value': pname,
    }, // a string representing a constraint on the attribute
  }
}

function registerplayer(req,res){
	const user = req.body;
	if(!user)
		return utils.error(res,400,"Invalid Data");
	const pname = req.body.pname;
	const matches = req.body.matches;
	const speciality = req.body.speciality;
	const strikerate = req.body.strikerate;
	const battingavg = req.body.battingavg;
	const bowlingavg = req.body.bowlingavg;
	const economy = req.body.economy;
	if(!pname)
		return utils.error(res,400,"Name is missing");
	if(!matches)
		return utils.error(res,400,"Number of Matches is missing");
	if (!speciality)
    	return utils.error(res, 400, "Speciality is missing");
    if(!battingavg && !bowlingavg)
    	return utils.error(res,400,"One of batting or bowling average is missing");
    if(!strikerate && !economy)
    	return utils.error(res,400,"One of strike rate or economy is missing");
    console.log(params(pname));
    dynamoDB.query(params(pname), function(err,data){
    	if(err)
    	{
    		return utils.error(res,500,"Internal Server Error");
    	}
    	else{
    		if(data.Items.length !== 0)
    			return utils.error(res,400, "Player with this name already exists");
    		else{
    			const addparams = {
    				TableName :"Player_Data3",
    				Item : user,
    			};
    			dynamoDB.put(addparams, function(err,data){
    				if(err)
    				{
    					return utils.error(res,500,"Internal Server Error");
    				}
    				else
    				{
    					console.log(data.Items);
    					return res.redirect('/admin');
    				}
    			})
    		}
    	}

    })
}

module.exports = {
  registerplayer:registerplayer,
  //validateToken: validateToken,
};
