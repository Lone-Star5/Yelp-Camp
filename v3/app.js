const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var Campground = require("./models/campground");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp");


// Campground.create(
// 	{ 
// 		name:"Granite Hill", 
// 		image:"https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c7d2e73d6914dc759_340.jpg",
// 		description: "This is a huge granite hill, no bathrooms, No water, Beautiful granite"

// 	}, function(err, campground){
// 		if(err)
// 			console.log(err)
// 		else
// 		{
// 			console.log("New Campground");
// 			console.log(campground);
// 		}
// 	})


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
			res.render("campgrounds", {campgrounds:allCampgrounds})
		}
	})

	// res.render("campgrounds", {campgrounds:campgrounds})
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");
})

app.get("/campgrounds/:id/show", function(req, res){
	Campground.findById(req.params.id, function(err, found){
		if(err)
			console.log(err);
		else
			res.render("show", {campground: found});

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

app.listen(3000, function(){
	console.log("Server Running ...")
})