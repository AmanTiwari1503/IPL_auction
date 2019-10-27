/**
 * Created by Aman
 */
const utils = require('../../utils');
const jwt = require('jsonwebtoken');
// Db info
const teamName = 'Player_Data'
const regTable = 'Team_Data'
const dynamoDB = utils.connectToDB(); 
//const secret = require('../Models/secrets');
function params(pname) {
    return{
    TableName: teamName,
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
    const imagelink = req.body.imagelink;
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
    				TableName :teamName,
                    Item: {
        				"pname":pname,
                        "matches":matches,
                        "speciality":speciality,
                        "sr":strikerate,
                        "baAvg":battingavg,
                        "boAvg":bowlingavg,
                        "economy":economy,
                        "imagelink":imagelink,
                        "plowner":[],
                        "soldin":"-"
                    },
    			};
    			dynamoDB.put(addparams, function(err,data){
    				if(err)
    				{
    					return utils.error(res,500,"Internal Server Error");
    				}
    				else
    				{
    					console.log(data.Items);
    					return res.redirect('/admin/portal');
    				}
    			})
    		}
    	}

    });
}

function tparams(email) {
    return{
    TableName: regTable,
    KeyConditionExpression: 'email = :value',
    ExpressionAttributeValues: { // a map of substitutions for all attribute values
      ':value': email,
    }, // a string representing a constraint on the attribute
  }         
}

function registerteam(req,res){
    const user = req.body;
    if(!user)
        return utils.error(res,400,"Invalid Data");
    const tname = req.body.tname;
    const email = req.body.email;
    const psswd = req.body.psswd;
    if(!tname)
        return utils.error(res,400,"Name is missing");
    if(!email)
        return utils.error(res,400,"Email is missing");
    if (!psswd)
        return utils.error(res, 400, "Password is missing");
    dynamoDB.query(tparams(email), function(err,data){
        if(err)
        {
            return utils.error(res,500,"Internal Server Error");
        }
        else{
            if(data.Items.length !== 0)
                return utils.error(res,400, "Team already exists");
            else{
                const addparams = {
                    TableName :regTable,
                    Item: {
                        "tname":tname,
                        "email":email,
                        "password":psswd,
                        "moneyrem":"10",
                        "currplayers":[],
                    },
                };
                dynamoDB.put(addparams, function(err,data){
                    if(err)
                    {
                        return utils.error(res,500,"Internal Server Error");
                    }
                    else
                    {
                        console.log(data.Items);
                        return res.redirect('/admin/portal');
                    }
                })
            }
        }

    });
}

function findplayer(req,res){
    const user = req.body;
    if(!user)
        return utils.error(res,400,"Invalid Data");
    const name1 = req.body.name1;
    if(!name1)
        return utils.error(res,400,"Name is missing");
    dynamoDB.query(params(name1), function(err,data){
        if(err)
        {
            return utils.error(res,500,"Internal Server Error");
        }
        else{
            if(data.Items.length === 0)
                return utils.error(res,400, "No such player exists");
            else{
                    console.log(data.Items);
                    return res.json({
                        user: data.Items,
                    })
                }
        }

    });
}

function plparams(pname){
    return {
        TableName :teamName,
        KeyConditionExpression: 'pname = :value',
        ExpressionAttributeValues: { // a map of substitutions for all attribute values
            ':value': pname,
    }, // a string representing a constraint on the attribute
    }
}

function betting(req,res){
    const user = req.body;
    // console.log(user);
    if(!user)
        return utils.error(res,400,"Invalid Data");
    const name2 = user.name2;
    const team2 = user.team2;
    const amount = user.amount;
    if(!name2)
        return utils.error(res,400,"Player is missing");
    if(!team2)
        return utils.error(res,400,"Team name is missing");
    if (!amount)
        return utils.error(res, 400, "Enter a valid amount");
    dynamoDB.query(plparams(name2),function(err,data){
        if(err)
            return utils.error(res, 500, "Internal Server Error");
        else
        {
            if(data.Items.length === 0)
                return utils.error(res,400, "No such player exists");
            else
            {
                console.log(data.Items[0].plowner);
                if(data.Items[0].plowner !== "-")
                    return utils.error(res, 400, "Player already sold")
                else
                {
                    dynamoDB.query(tparams(team2),function(err,newData){
                        if(err)
                        {
                            console.log(err);
                            return utils.error(res,500,"Internal Server Error");
                        }
                        else
                        {
                            // console.log(name2);
                            // console.log(newData.Items[0].currplayers);
                            var par = {
                                TableName:teamName,
                                Key:{
                                    "pname":name2,
                                    "matches":data.Items[0].matches,
                                },
                                UpdateExpression:"set plowner = :r,soldin = :q",
                                ExpressionAttributeValues:{
                                    ":r":newData.Items[0].tname,
                                    ":q":amount,
                                },
                            };
                            dynamoDB.update(par,function(err,datan){
                                if(err)
                                {
                                    console.log(err);
                                    return utils.error(res,500,"Internal Server Error");
                                }
                                else
                                    console.log(datan);
                            });
                           var amt = Number(newData.Items[0].moneyrem,10) - Number(amount,10);
                           var tmp = amt - parseInt(amt);
                           if(tmp > 0.9999999)
                           {
                             amt = Math.round(amt);
                           }
                           if(amt<0)
                           {
                            var errmes="Cannot buy this player for given amount. Not enough money remaining";
                            return utils.error(res, 400, errmes);
                           }
                           else
                            {
                            var para = {
                                TableName:regTable,
                                Key:{
                                    "email":newData.Items[0].email,
                                    "password":newData.Items[0].password,
                                },
                                UpdateExpression:"set moneyrem = :r, currplayers = list_append(if_not_exists(#currplayers,:x),:y)",
                                ExpressionAttributeNames: {
                                     '#currplayers': 'currplayers',
                                },
                                ExpressionAttributeValues:{
                                    ":r":amt.toString(),
                                    ":y":[name2],
                                    ":x":[name2],
                                }
                            };
                            dynamoDB.update(para,function(error,datanew){
                                if(error)
                                {
                                    console.log(error);
                                    return utils.error(res, 500, "Internal Server Error");
                                }
                                else
                                {
                                    console.log(datanew);
                                }
                             })
                        }
                        }
                    })
                }
                return res.json({
                    user1:"Successful",
                })
            }
        }
    });
}

var scanparams = {
    TableName: regTable,
    ProjectionExpression: "tname, moneyrem",
};

function getAllTeams(req,res){
dynamoDB.scan(scanparams,function(err,data){
    if(err)
        return utils.error(res,500,"Internal Server Error");
    else
    {
        // console.log("Scan suceeded");
        return res.json({
            user:data.Items,
        })
    }
});
}

var scanparams1 = {
    TableName: teamName,
    ProjectionExpression:"pname, plowner, soldin",
}

function findAllPlayersInfo(req,res){
dynamoDB.scan(scanparams1,function(err,data){
    if(err)
        return utils.error(res,500,"Internal Server Error");
    else
    {
        // console.log("Scan suceeded");
        // console.log(data.Items);
        return res.json({
            user:data.Items,
        })
    }
});
}

module.exports = {
  registerplayer:registerplayer,
  registerteam:registerteam,
  findplayer:findplayer,
  betting:betting,
  getAllTeams:getAllTeams,
  findAllPlayersInfo:findAllPlayersInfo,
  //validateToken: validateToken,
};
