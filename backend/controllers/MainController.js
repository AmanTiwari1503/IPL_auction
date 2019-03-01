///let utils = require('../../utils');
//let dynamoDB = utils.connectToDB();
//const jwt = require('jsonwebtoken');
//const secret =  require('../../Models/secrets');
const request = require("request");

module.exports = {
	home:home,
	userportal:userportal
}

function home(req,res){
	res.render('index.ejs',{
	});
}

function userportal(req,res){
	res.render('userportal/index.ejs',{
	});
}