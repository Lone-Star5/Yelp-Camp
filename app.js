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
		flash			= require("connect-flash")


var commentRoutes 		= require("./routes/comments"),
	campgroundRoutes 	= require("./routes/campgrounds"),
	indexRoutes 		= require("./routes/index")

app.use(express.static(__dirname + "/public"));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', false;
mongoose.connect("mongodb+srv://yelpcamp:yelpcamp@cluster0-qko5l.mongodb.net/test?retryWrites=true&w=majority");

app.use(require("express-session")({
	secret: "Yelp-Camp project is fun",
	resave: false,
	saveUninitialized: false
}))

app.use(flash());
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
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})

app.use(indexRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)
app.use("/campgrounds", campgroundRoutes)

app.listen(process.env.PORT, process.env.IP);