//phamartin:49699208
//kateviloria:69813820
//get2rich:78954835
//eva-joo:158395759
//devansh-malik:79933909
//36rex36:135282929
//s-palepu:86950103

Meteor.startup(() => {
	console.log(InfluencesCollection.find().fetch());

	//Add initial influences for app
	if (InfluencesCollection.find().count() === 0) {
		[49699208,69813820,78954835,158395759,79933909,135282929,86950103].forEach((scUserID)=>{InfluencesCollection.insert({scUserID:scUserID})});
		console.log(InfluencesCollection.find().fetch());
	};
	Meteor.publish("influences", () => {
		return InfluencesCollection.find();
	});
	Meteor.publish("scUsers", () => {
		return SCUsersCollection.find();
	});
	Meteor.publish("favorites", () => {
		return FavoritesCollection.find();
	});
});

Meteor.methods({
	updateSCUsers: function(user) {
		console.log("update user:", user);
		//Change avatar profile picture resolution if it exists
		if (!user.avatar_url.includes("default_avatar")) {user.avatar_url = user.avatar_url.replace("large", "t500x500")};
		//Update into database
		SCUsersCollection.update({id: user.id}, user
		// {
			// $set: {
			// 	avatar_url: user.avatar_url,
			// 	followers_count: user.followers_count,
			// 	id: user.id,
			// 	permalink_url: user.permalink_url,
			// 	playlist_count: user.playlist_count,
			// 	public_favorites_count: user.public_favorites_count,
			// 	uri: user.uri,
			// 	username: user.username
			// }
		// }
		, {upsert: true});
	},

	updateFavorites: function(userID, favorites) {
		console.log("update favorites", userID, favorites);
		FavoritesCollection.update({id: userID}, {
			$set: {
				favorites: favorites
			}
		}, {upsert:true});
	}
});