const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var User = require("./models/user");
var Comment = require("./models/comment");


var commentRoutes = require("./routes/comments")
var campgroundRoutes = require("./routes/campgrounds")
var indexRoutes = require("./routes/index")
// var User = require("./models/user")

//seedDB();
app.use(express.static(__dirname + "/public"));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp_v4");

app.use(require("express-session")({
	secret: "Yelp-Camp project is fun",
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
})

app.use(indexRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)
app.use("/campgrounds", campgroundRoutes)

app.listen(3000, function(){
	console.log("Server Running ...")
})