//phamartin:49699208
//kateviloria:69813820
//get2rich:78954835
//eva-joo:158395759
//devansh-malik:79933909
//36rex36:135282929
//s-palepu:86950103

Meteor.startup(() => {
	// console.log(InfluencesCollection.find().fetch());

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
	Meteor.publish("likes", () => {
		return LikesCollection.find();
	})
});

Meteor.methods({
	//Updating mongo db on sign in to get the latest data;
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
	updateFavorites: function(userID, favorites, currentTrack) {
		//soundcloud userID
		console.log("update favorites", userID, favorites);
		FavoritesCollection.update({id: userID}, {
			$set: {
				favorites: favorites
			}
		}, {upsert:true});
	},

	//Player
	upcomingTrack: function(streamType, random, currentTrack) {
		console.log("upcomingTrack", streamType, random);
		var next = null;
		switch (streamType.type) {
			//Soundcloud user
			case "favorites":
				let soundcloudUser = FavoritesCollection.findOne({id: streamType.id});
				let favorites = soundcloudUser.favorites;
				if (random) {
					next = _.sample(favorites);
				}
				else {
					const currentPosn = favorites.findIndex((element, index, array) => {
						return element.id == currentTrack.id;
					});
					//If at the latest track, loop back to first track (i.e. last in aray)
					const nextPosn = currentPosn+1;
					console.log(nextPosn, favorites);
					if (nextPosn == favorites.length) {
						next = favorites[0];
					}
					else {
						next = favorites[nextPosn];
					};
				}
				break;
			//Meteor user
			case "likes":
				break;
		};
		// console.log("return object", next);
		return next;
	},

	//Liker
	likeTrack: function(track) {
		console.log(Meteor.user().profile.likes, LikesCollection.find({}).fetch());
		//Update track in user profile
		// Meteor.users.update({_id: Meteor.user()._id}, {
		// 	$push: {
		// 		"profile.likes": track.id
		// 	}
		// }, {upsert:true});
		//Update in Likes collection
		const like = {
			likedBy: Meteor.userId(),
			likedAt: new Date(),
			track: track
		};
		LikesCollection.update({likedBy: Meteor.userId(), "track.id": track.id}, like, {upsert: true});
		return LikesCollection.find({likedBy: Meteor.userId()}).fetch();
	},
	unlikeTrack: function(track) {
		LikesCollection.remove({likedBy: Meteor.userId(), "track.id": track.id});
	}
});