/**
 * Created by Aman
 */
const utils = require('../../utils');
const jwt = require('jsonwebtoken');
// Db info
const teamName = 'Tryst_team';
const dynamoDB = utils.connectToDB(); 
// var localStorage = require('localStorage');
const secret = require('../../Models/secret');
function params(email) {
    return{
    TableName: teamName,
    KeyConditionExpression: 'email = :value',
    ExpressionAttributeValues: { // a map of substitutions for all attribute values
      ':value': email,
    }, // a string representing a constraint on the attribute
  }
}
// function for session login
// @review change password sys
function login(req,res) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password)
    return utils.error(res, 401, "Email or Password is missing");
  dynamoDB.query(params(email), function (err, data) {
    if (err) {
      console.log(err);
      return utils.error(res, 500, "Internal Server Error");
    } else {
      if (data.Items.length ===0)
        return utils.error(res, 401, "Email does not exist");
      if (data.Items[0].password !== password)
      {
        return utils.error(res, 401, "Password incorrect");
      }
      delete data.Items[0].password;
      const token = utils.generateToken(data.Items);
      console.log(data.Items);
      return res.json({
        user: data.Items,
        token: token,
      })
      // localStorage.setItem('USER',JSON.stringify(data.Items));
      // localStorage.setItem('TRYST', token);
      // console.log(token);
    }
  })
}

function validateToken(req,res){
    const token = req.body.token || req.query.token;
      jwt.verify(token, secret.encry, function(err, decoded){
        if (err){
        // console.log(err);
        // console.log(token)
        return utils.error(res, 401, "Invalid Token");
      }
      else
      {
        return res.json({
          token:token,
        })
      }
      });
  }

  function validateUserToken(req,res){
    const token = req.body.token || req.query.token;
      jwt.verify(token, secret.encry, function(err, decoded){
        if (err){
        // console.log(err);
        // console.log(token)
        return utils.error(res, 401, "Invalid Token");
      }
      else
      {
        return res.json({
          token:token,
        })
      }
      });
  }

function params1(email) {
    return{
    TableName: "Team_Data",
    KeyConditionExpression: 'email = :value',
    ExpressionAttributeValues: { // a map of substitutions for all attribute values
      ':value': email,
    }, // a string representing a constraint on the attribute
  }
}

function userlogin(req,res) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password)
    return utils.error(res, 401, "Email or Password is missing");
  dynamoDB.query(params1(email), function (err, data) {
    if (err) {
      return utils.error(res, 500, "Internal Server Error");
    } else {
      if (data.Items.length === 0)
        return utils.error(res, 401, "Email does not exist");
      if (data.Items[0].password !== password)
      {
        return utils.error(res, 401, "Password incorrect");
      }
      delete data.Items[0].password;
      delete data.Items[0].moneyrem;
      delete data.Items[0].currplayers;
      const token = utils.generateToken(data.Items);
      console.log(data.Items);
      return res.json({
        user: data.Items,
        token: token,
      })
      // localStorage.setItem('USER',JSON.stringify(data.Items));
      // localStorage.setItem('TRYST', token);
      // console.log(token);
    }
  })
}

function findMyPlayers(req,res){
  console.log(req.body.infor);
  const obj = JSON.parse(req.body.infor);
  const email = obj[0].email;
  console.log(email);
  dynamoDB.query(params1(email),function(err,data){
    if(err)
    {
      console.log(err);
        return utils.error(res,500,"Internal Server Error");
    }
    else
    {
        // console.log("Scan suceeded");
        return res.json({
            user:data.Items[0].currplayers,
            ab:data.Items[0].moneyrem,
        })
    }
});
}


/*function validateToken(req, res) {
  const token = req.body.token || req.query.token;
  if (!token) {
    return utils.error(res, 401, "Token not found");
  }
  jwt.verify(token, secret.encry, function(err, user) {
    if (err)
      return utils.error(res, 401, "Invalid Token");
    dynamoDB.get(params(user.email), function (err, data) {
      if (err) {
        return utils.error(res, 500, "Internal Server Error");
      } else {
        if (!data.Item)
          return utils.error(res, 401, "Invalid Token");
        delete data.Item['password'];
        const token = utils.generateToken(data.Item);
        return res.json({
          user: data.Item,
          token: token,
        })
      }
    })
  });
}*/


module.exports = {
  login: login,
  userlogin:userlogin,
  findMyPlayers:findMyPlayers,
  validateToken: validateToken,
  validateUserToken:validateUserToken,
};