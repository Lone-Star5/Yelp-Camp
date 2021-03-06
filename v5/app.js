const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment")
// var User = require("./models/user")

//seedDB();
app.use(express.static(__dirname + "/public"));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp_v4");



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

app.get("/campgrounds/:id/show", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err)
			console.log(err);
		else
		{
			res.render("campgrounds/show", {campground: foundCampground});
		}

	})

})

app.get("/campgrounds/:id/comments/new", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err)
			console.log(err)
		else
			res.render("comments/new",{campground:campground})		
	})
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

app.post("/campgrounds/:id/comments", function(req, res){
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
					res.redirect("/campgrounds/"+campground._id+"/show")
				}
			})
		}
	})
})

app.listen(3000, function(){
	console.log("Server Running ...")
})