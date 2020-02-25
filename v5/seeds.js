var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var data = [
	{
		name: "Cloud's Rest",
		image: "https://i.pinimg.com/236x/41/f0/2a/41f02a536bd5b266bc9b5b01ca990ca6.jpg",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: "Desert Mesa",
		image: "https://i.pinimg.com/236x/04/0f/8d/040f8df11f798f91a29b647d755a218d.jpg",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: "Canyon Floor",
		image: "https://i.pinimg.com/236x/54/2e/48/542e482070154eb9d75be56e8f0680fe.jpg",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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

