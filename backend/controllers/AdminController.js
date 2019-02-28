///let utils = require('../../utils');
//let dynamoDB = utils.connectToDB();
//const jwt = require('jsonwebtoken');
//const secret =  require('../../Models/secrets');
const request = require("request");

module.exports = {
	home:home,
	portal:portal
}

function home(req,res){
	res.render('./admin/index.ejs',{
	});
}
function portal(req,res){
	res.render('./admin/portal/index.ejs',{
	});
}