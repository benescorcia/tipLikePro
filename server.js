var express = require("express");
var app = express();
var exphbs = require('express-handlebars');
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");
var passport = require("passport");
var localStrategy = require("passport-local");
var expressSession = require("express-session");
var React = require('react');
var ReactDOM = require('react-dom');
var Photo = require("./models/photo");
var User = require("./models/user");


// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "/views/layouts/partials")
}));
app.set("view engine", "handlebars");
app.use(methodOverride("_method"));
app.use(express.static("firebase"));


// Mongoose configuration
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/tipCalc";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

var PORT = process.env.PORT || 3001;


// Passport
app.use(expressSession({
    secret: "Ben always get called first!",
    resave: false,
    saveUnitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ROUTES
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++

// // Index
// app.get("/", function(req, res){
//     res.render("index");
// });

// // Dashboard
// app.get("/dashboard", isSignedIn, function(req, res){
//     res.render("dashboard");
// });

// //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // Photo ROUTES
// //+++++++++++++++++++++++++++++++++++++++++++++++++++++++

// app.get("/photos", isSignedIn, function(req, res){

//     // find all photos
//     Photo.find({}, function(err, photos){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("photos/photos", {photos: photos, currentUser: req.user});
//         }
//     });
// });

// // Create and add photo
// app.post("/photos", function(req, res){ 
       
//     //get data from user
//     var image = req.body.image;
//     var created = req.body.created;
//     var newPhoto = {image: image, created: created};
    
//     Photo.create(newPhoto, function(err, newnew){
//         if(err){
//             console.log(err);
//         } else {
//             //redirect to photos page
//             res.redirect("/photos");
//         }
//     });
// });

// // New photo/form view
// app.get("/photos/new", isSignedIn, function(req, res){
//     res.render("photos/new");
// });

// // Show photo
// app.get("/photos/:id", isSignedIn, function(req, res){
//     Photo.findById(req.params.id, function(err, found){
//         if(err){
//             console.log(err)
//         } else {
//             res.render("photos/show", {photo: found});
//         }
//     })
// });

// // Delete photo
// app.delete("/photos/:id", isSignedIn, function(req, res){
//     Photo.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             res.redirect("/photos");
//         } else {
//             res.redirect("/photos");
//         }
//     })
// });




// //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // Authentication ROUTES
// //+++++++++++++++++++++++++++++++++++++++++++++++++++++++

// // show sign up form
// app.get("/register", function(req, res){
//     res.render("register");
// });

// // register user
// app.post("/register", function(req, res){
//     User.register(new User({username: req.body.username}), req.body.password, function(err, user){
//         if(err) {
//             console.log(err);
//             return res.render("register");
//         }
//         passport.authenticate("local")(req, res, function(){
//             res.redirect("/dashboard");
//         });
//     });
// });


// // show login form
// app.get("/login", function(req, res){
//     res.render("login");
// });

// app.post("/login", passport.authenticate("local", {
//     successRedirect: "/dashboard",
//     failureRedirect: "/login"
// }), function(req, res){
    
// });


// // logout
// app.get("/logout", function(req, res){
//     req.logout();
//     res.redirect("/");
// });


// //isSignedIn Middleware

// function isSignedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

var path = require('path');

var x = path.join('Users', 'Refsnes', 'demo_path.js');
app.use("*", function(req, res){
    res.sendFile( path.join(__dirname, 'tiplikepro-app', 'build', 'index.html'));
});


// Server Listening 
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
});