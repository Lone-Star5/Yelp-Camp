const express = require("express")
const router = express.Router()
const passport = require("passport");
var User = require("../models/user");


router.get('/', function(req, res){
	res.render("home");
})

router.get("/register", function(req, res){
	res.render("register");
})

router.get("/login", function(req, res){
	res.render("login")
})

router.get("/logout", function(req, res){
	req.logout();
	req.flash("success","Logged You Out")
	res.redirect("/campgrounds")
})

router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err)
		{
			req.flash("error",err.message);
			console.log(err)
			return res.render("register")
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success","Welcome To YelpCamp " + user.username);
			res.redirect("/campgrounds");
		})
	})
})

router.post("/login",passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}),	 function(req, res){

})



module.exports = router