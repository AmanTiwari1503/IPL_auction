// var mailer  = require("./email");
// var mailer  = require("./mailers/inviteMailer");
// const delay = require('delay');
// var fs = require("fs")
// mailer.sendMail("rudrakshgupta.1998@gmail.com")

var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('./Book1.csv'),
    output: process.stdout,
    console: false
});

rd.on('line', function(line) {
    console.log(line.split(","));
     //delay(50);
});

// mailer.sendMail("parasbhaisora1@gmail.com")