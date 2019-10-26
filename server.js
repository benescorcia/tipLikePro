var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./tiplikepro-app/build")));

var PORT = process.env.PORT || 3001;

app.post('/math', (req, res) => {
    res.json({answer: '/app/signin.html'});
});

app.use("/app/*", (req, res) => {
    console.log("HI :P", `./firebase${req.originalUrl}`)
    return res.sendFile(path.join(__dirname, `./firebase${req.originalUrl}`))
});

app.use("*", (req, res) => {
    console.log("HI :P", path.join(__dirname, "./tiplikepro-app/build/index.html"))
    return res.sendFile(path.join(__dirname, "./tiplikepro-app/build/index.html"))
});



// Server Listening 
app.listen(PORT, function() {
    console.log("App running on port " + PORT);

});