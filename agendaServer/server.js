var express = require("express");
var app = express();
//Get the router
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");
var mongoose = require("mongoose");
var path = require("path");

mongoose.connect("mongodb://user:user@ds137360.mlab.com:37360/mydatabase");

//handle static files, if you request these file, gonna return stuff inside public
app.use(express.static(path.join(__dirname, '../public')));

//according to the express router usages
//every request form /api/v1, give it to restRouter
app.use('/', indexRouter);
app.use("/api/v1", restRouter);

//If not adding this line, when you refresh the page, it won't work, because, if you can load index.html,
//all the bundled js can be loaded so that the client side will start routing
app.use(function(req, res) {
	//send index.html to start client side
	res.sendFile("index.html", { root: path.join(__dirname, '../public/')});
});

app.listen(3000, function() {
	console.log("app listening on port 3000!");
})
