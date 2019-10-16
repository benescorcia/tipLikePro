var mongoose = require("mongoose");

//SCHEMA SETUP
var contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Contact", contactSchema);