//All the rest request are solved by this file
//First Get Express
var express = require("express");
var router = express.Router();
//Define event service
var eventService = require("../service/eventService");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();


//deal with /events request
// router.get("/events", function(req, res) {
// 	//just do routing and not calc or deal
// 	eventService.getEvents()
// 		//when the getevents() get resolved
// 		//suppose it will trans back a promise, the promise will give a event list
// 		//And then I will give someone else the events
// 		.then(events => res.json(events));
// });

router.get("/events/:id", function(req, res) {
	var id = req.params.id;
	eventService.getEvents(+id)
		.then(events => res.json(events))
		.catch(function(e) {
			console.log(e);
		})
});

//Add a event you need to trans the info of the event to here
//jsonParser inject into router, this para can be used as
router.post("/events", jsonParser, function(req, res) {
	//para is the event trans from client side
	//req don't have body, but after go through jsonParser, 
	//req has a body which is a json file include the event
	eventService.addEvent(req.body)
		.then(function(event) {
			//if trans here a event
			res.json(event);
			//if trans here an error
		}, function(error) {
			res.status(400).send("event name already exists!");
		});
});

router.post("/events/:id", jsonParser, function(req, res) {
	var eventId = req.params.id;
	eventService.editEvent(req.body, +eventId)
		.then(function(event) {
			//if trans here a event
			res.json(event);
			//if trans here an error
		}, function(error) {
			res.status(400).send("event name already exists!");
		});
});


router.get("/rmevent/:id", function(req, res) {
	var id = req.params.id;
	eventService.removeEvent(+id)
		.then(events => res.json(events))
		.catch(function(e) {
			console.log(e);
		})
});


module.exports = router;