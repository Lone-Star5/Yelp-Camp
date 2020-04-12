const express = require("express")
const router = express.Router()
var Campground = require("../models/campground")
var middleware = require("../middleware")


router.get("/", async function(req, res){
	Campground.find({}, function(err,allCampgrounds){
		if(err){
			res.redirect("/");
			console.log(err);
		}
		else{
			res.render("campgrounds/index", {campgrounds:allCampgrounds})
		}
	})
});

router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
})

router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err)
			console.log(err);
		else
		{
			res.render("campgrounds/show", {campground: foundCampground});
		}

	})

})

router.post("/", middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name:name,price:price, image:image, description:desc,author:author}
	Campground.create(newCampground, function(err,newcampground){
		if(err){
			console.log(err)
		}
		else{
			res.redirect("/campgrounds");
		}
	})
	
});


// Edit Campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err,foundCampground){
		res.render("campgrounds/edit", {campground:foundCampground})
	})	
})

// Update Campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err)
			res.redirect("/campgrounds")
		else
			res.redirect("/campgrounds/"+ req.params.id);
	})
})


// Destroy Campground 
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err)
			res.redirect("/campgrounds")
		else
			res.redirect("/campgrounds")
	})
})



module.exports = router;