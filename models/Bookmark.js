var mongoose = require("mongoose");

//SCHEMA SETUP
var bookmarkSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("Bookmark",bookmarkSchema);
