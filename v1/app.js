const express = require('express');
const app = express();
const bodyParser = require("body-parser");

var campgrounds = 
	[
		{ name:"Salmon Creek", image:"https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c7d2e7bdd9e4ac75f_340.jpg"},
		{ name:"Granite Hill", image:"https://pixabay.com/get/54e5dc474355a914f6da8c7dda793f7f1636dfe2564c704c7d2e7bdd9e4ac75f_340.jpg"},
		{ name:"Mountain Goat's Rest", image:"https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c7d2e7bdd9e4ac75f_340.jpg"},
		{ name:"Salmon Creek", image:"https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c7d2e7bdd9e4ac75f_340.jpg"},
		{ name:"Granite Hill", image:"https://pixabay.com/get/54e5dc474355a914f6da8c7dda793f7f1636dfe2564c704c7d2e7bdd9e4ac75f_340.jpg"},
		{ name:"Mountain Goat's Rest", image:"https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c7d2e7bdd9e4ac75f_340.jpg"},		{ name:"Salmon Creek", image:"https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c7d2e7bdd9e4ac75f_340.jpg"},
		{ name:"Granite Hill", image:"https://pixabay.com/get/54e5dc474355a914f6da8c7dda793f7f1636dfe2564c704c7d2e7bdd9e4ac75f_340.jpg"},
		{ name:"Mountain Goat's Rest", image:"https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c7d2e7bdd9e4ac75f_340.jpg"},
		{ name:"Salmon Creek", image:"https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c7d2e7bdd9e4ac75f_340.jpg"},
		{ name:"Granite Hill", image:"https://pixabay.com/get/54e5dc474355a914f6da8c7dda793f7f1636dfe2564c704c7d2e7bdd9e4ac75f_340.jpg"},
		{ name:"Mountain Goat's Rest", image:"https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c7d2e7bdd9e4ac75f_340.jpg"}
	]

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
	res.render("home");
})

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds:campgrounds})
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");
})

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name, image:image}
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.listen(3000, function(){
	console.log("Server Running ...")
})