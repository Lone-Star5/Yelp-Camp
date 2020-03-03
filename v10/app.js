const 	express 		= require('express'),
		app 			= express(),
		bodyParser 		= require("body-parser"),
		mongoose		= require("mongoose"),
		methodOverride 	= require("method-override"),
		passport 		= require("passport"),
		LocalStrategy	= require("passport-local"),
		Campground 		= require("./models/campground"),
		seedDB 			= require("./seeds"),
		User 			= require("./models/user"),
		Comment 		= require("./models/comment")


var commentRoutes 		= require("./routes/comments"),
	campgroundRoutes 	= require("./routes/campgrounds"),
	indexRoutes 		= require("./routes/index")

//seedDB();
app.use(express.static(__dirname + "/public"));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp_v10");

app.use(require("express-session")({
	secret: "Yelp-Camp project is fun",
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
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