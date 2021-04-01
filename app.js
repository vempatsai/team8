var express=require('express');

var coffeecontroller=require('./controller/coffeecontroller');

var app=express();
var session = require('express-session');
var express = require('express');
var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//set up a template engine

app.set('view engine','ejs');

// static files


app.use(express.static('./public'));

//fire controller
coffeecontroller(app);


// listen to port

app.listen(3000);

console.log('your are listening to port 3000');
