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

app.get('/', function(req, res){
	res.render("home");
})

app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err,allCampgrounds){
		if(err)
			console.log(err);
		else{
			res.render("campgrounds/index", {campgrounds:allCampgrounds})
		}
	})

	// res.render("campgrounds", {campgrounds:campgrounds})
});

app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new");
})

app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err)
			console.log(err);
		else
		{
			res.render("campgrounds/show", {campground: foundCampground});
		}

	})

})

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err)
			console.log(err)
		else
			res.render("comments/new",{campground:campground})		
	})
})

app.get("/register", function(req, res){
	res.render("register");
})

app.get("/login", function(req, res){
	res.render("login")
})

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds")
})


app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name:name, image:image, description:desc}
	Campground.create(newCampground, function(err,newcampground){
		if(err){
			console.log(err)
		}
		else{
			res.redirect("/campgrounds");
		}
	})
	
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err)
		{
			console.log(err)
			res.redirect("/campgrounds");
		}
		else
		{
			Comment.create(req.body.comment, function(err, comment){
				if(err)
					console.log(err)
				else
				{
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/"+campground._id)
				}
			})
		}
	})
})

app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err)
		{
			console.log(err)
			return res.render("register")
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		})
	})
})

app.post("/login",passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}),	 function(req, res){

})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();
	res.redirect("/login");
}

app.listen(3000, function(){
	console.log("Server Running ...")
})