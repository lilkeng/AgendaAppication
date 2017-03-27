

var EventModel = require("../models/eventModel");

// var getEvents = function() {
// 	//trans back a promise, how to get a promise: give it back two function: 
// 	//resolve and reject, 
// 	return new Promise((resolve, reject) => {
// 		EventModel.find({}, function (err, problems) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(problems);
//       }
//     });
// 	});
// }

var getEvents = function(date) {
	return new Promise((resolve, reject) => {
		EventModel.find({ date : date}, function (err, events) {
      if (err) {
        reject(err);
      } else {
        resolve(events);
      }
    });
	});
}

var addEvent = function(newEvent) {
  console.log(newEvent.desc);
	return new Promise((resolve, reject) => {
      //regular problem
      newEvent.id = new Date().valueOf();
      console.log(newEvent);
      //problem MongoDB knows
      var mongoEvent = new EventModel(newEvent);
      mongoEvent.save();
      resolve(newEvent);
	});
}

var editEvent = function(updatedEvent, id) {
  console.log(updatedEvent.desc);
  return new Promise((resolve, reject) => {
      //regular problem
      var newContent = updatedEvent.desc;
      EventModel.update({ id: id }, { $set: { desc: newContent }}, function (err, event) {
        if (err) {
          reject(err);
        } else {
          resolve(updatedEvent);
        }
      });
  });
}

var removeEvent = function(eventId) {
  return new Promise((resolve, reject) => {
    EventModel.remove({ id : eventId}, function (err, event) {
      if (err) {
        reject(err);
      } else {
        resolve(event);
      }
    });
  });
}

//return an object
module.exports = {
	//return individual function
	getEvents: getEvents,
	addEvent: addEvent,
  editEvent: editEvent,
  removeEvent: removeEvent
}