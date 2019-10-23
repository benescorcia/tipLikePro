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
var Contact = require("./models/contact");
var Bookmark = require("./models/bookmark");
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
// // contacts ROUTES
// //+++++++++++++++++++++++++++++++++++++++++++++++++++++++

// app.get("/contacts", isSignedIn, function(req, res){

//     // find all contacts
//     Contact.find({}, function(err, contacts){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("contacts/contacts", {contacts: contacts, currentUser: req.user});
//         }
//     });
// });

// // Create and add contacts
// app.post("/contacts", function(req, res){ 
       
//     //get data from user
//     var name = req.body.name;
//     var telephone = req.body.telephone;
//     var newContact= {name: name, telephone: telephone};
    
//     Contact.create(newContact, function(err, newnew){
//         if(err){
//             console.log(err);
//         } else {
//             //redirect to contacts page
//             res.redirect("/contacts");
//         }
//     });
// });

// // New contacts/form view
// app.get("/contacts/new", isSignedIn, function(req, res){
//     res.render("contacts/new");
// });

// // Show contacts
// app.get("/contacts/:id", isSignedIn, function(req, res){
//     Contact.findById(req.params.id, function(err, found){
//         if(err){
//             console.log(err)
//         } else {
//             res.render("contact/show", {contact: found});
//         }
//     })
// });

// // Delete contacts
// app.delete("/contacts/:id", isSignedIn, function(req, res){
//     Photo.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             res.redirect("/contacts");
//         } else {
//             res.redirect("/contacts");
//         }
//     })
// });

// //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // Bokmarks ROUTES
// //+++++++++++++++++++++++++++++++++++++++++++++++++++++++

// app.get("/bookmarks", isSignedIn, function(req, res){

//     // find all bookmarks
//     Contact.find({}, function(err, bookmarks){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("bookmarks/bookmarks", {bookmarks: bookmarks, currentUser: req.user});
//         }
//     });
// });

// // Create and add bookmarks
// app.post("/bookmarks", function(req, res){ 
       
//     //get data from user
//     var link = req.body.link;
//     var description = req.body.description;
//     var created = req.body.created;
//     var newBookmark= {link: link, description: description, created: created};
    
//     Bookmark.create(newBookmark, function(err, newnew){
//         if(err){
//             console.log(err);
//         } else {
//             //redirect to bookmarks page
//             res.redirect("/bookmarks");
//         }
//     });
// });

// // New bookmarks/form view
// app.get("/bookmarks/new", isSignedIn, function(req, res){
//     res.render("bookmarks/new");
// });

// // Show bookmarks
// app.get("/bookmarks/:id", isSignedIn, function(req, res){
//     Bookmark.findById(req.params.id, function(err, found){
//         if(err){
//             console.log(err)
//         } else {
//             res.render("contact/show", {contact: found});
//         }
//     })
// });

// // Delete bookmarks
// app.delete("/bookmarks/:id", isSignedIn, function(req, res){
//     Photo.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             res.redirect("/bookmarks");
//         } else {
//             res.redirect("/bookmarks");
//         }
//     })
// });

var path = require('path');

var x = path.join('Users', 'Refsnes', 'demo_path.js');
app.use("*", function(req, res){
    res.sendFile( path.join(__dirname, 'tiplikepro-app', 'build', 'index.html'));
});


// Server Listening 
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
});