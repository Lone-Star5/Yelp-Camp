var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var data = [
	{
		name: "Cloud's Rest",
		image: "https://i.pinimg.com/236x/41/f0/2a/41f02a536bd5b266bc9b5b01ca990ca6.jpg",
		description: "blah blah blah blah"
	},
	{
		name: "Desert Mesa",
		image: "https://i.pinimg.com/236x/04/0f/8d/040f8df11f798f91a29b647d755a218d.jpg",
		description: "blah blah blah blah"
	},
	{
		name: "Canyon Floor",
		image: "https://i.pinimg.com/236x/54/2e/48/542e482070154eb9d75be56e8f0680fe.jpg",
		description: "blah blah balh blah"
	}
]
function seedDB()
{
	Campground.deleteMany({}, function(err){
		if(err)
			console.log(err)
		console.log("campgrounds removed");
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err)
					console.log(err)
				else
				{
					console.log("Added Campground");
					Comment.create(
						{
							text: "This place is great",
							author: "Homer"
						}, function(err, comment){
								if(err)
									console.log(err)
								else{
									campground.comments.push(comment);
									campground.save();
									console.log("Created new comments");
								}
					});
				}
			})		
		})
	});
	
}

module.exports = seedDB;

