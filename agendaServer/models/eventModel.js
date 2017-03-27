var mongoose = require("mongoose");
var EventSchema = mongoose.Schema({
	id: Number,
	date: Number,
	desc: String
});
//name is eventModel
var eventModel = mongoose.model("EventModel", EventSchema);

module.exports = eventModel;