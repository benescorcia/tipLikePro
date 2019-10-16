var mongoose = require("mongoose");

//SCHEMA SETUP
var photoSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Photo", photoSchema);