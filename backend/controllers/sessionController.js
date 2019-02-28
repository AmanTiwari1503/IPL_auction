/**
 * Created by Aman
 */
const utils = require('../../utils');
const jwt = require('jsonwebtoken');
// Db info
const teamName = 'Tryst_team'
const dynamoDB = utils.connectToDB(); 
var localStorage = require('localStorage');
//const secret = require('../Models/secrets');
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
function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password)
    return utils.error(res, 401, "Email or Password is wrong");
  dynamoDB.query(params(email), function (err, data) {
    if (err) {
      return utils.error(res, 500, "Internal Server Error");
    } else {
      if (!data.Items)
        return utils.error(res, 401, "Email does not exist");
      if (data.Items[0].password !== password)
      {
        console.log(data.Items[0].password);
        console.log(password);
        return utils.error(res, 401, "Password incorrect");
      }
      delete data.Items[0].password;
      const token = utils.generateToken(data.Items);
      console.log(data.Items);
      /*return res.json({
        user: data.Items,
        token: token,
      })*/
      localStorage.setItem('USER',JSON.stringify(data.Items));
      localStorage.setItem('TRYST', token);
      console.log(token);
      //window.location.href = "/admin/portal";
      //return res.redirect('/admin/portal');
    }
  })
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
  //validateToken: validateToken,
};