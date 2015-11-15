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
	const prescribedUsers = [49699208,69813820,78954835,158395759,79933909,135282929,86950103,83824614];
	prescribedUsers.forEach((scUserID)=>{
		InfluencesCollection.update({scUserID:scUserID}, {scUserID:scUserID}, {upsert:true});
	});
	console.log("Influences: :", InfluencesCollection.find().fetch());
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
		SCUsersCollection.update({id: user.id}, user, {upsert: true});
	},
	//On select of a user in /users, update info. result is data from two favorites+playlist SC API calls
	updateUserOnSelect: function(userID, result) {
		//soundcloud userID
		console.log("update favorites", userID, favorites);
		//Order of promises in UserCcard
		let favorites = result[0];
		let playlists = result[1];
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
				let userId = Meteor.userId();
				let likes = LikesCollection.find({likedBy: userId}, {sort: {likedAt: -1}}).fetch();
				if (random) {
					next = _.sample(likes).track;
				}
				else {
					const currentPosn = likes.findIndex((e,i,a) => {
						return e.track.id == currentTrack.id;
					});
					const nextPosn = currentPosn+1;
					if (nextPosn == likes.length) {
						next = likes[0].track;
					}
					else {
						next = likes[nextPosn].track;
					};
				};
				break;
		};
		// console.log("return object", next);
		return next;
	},

	//Liker
	likeTrack: function(track) {
		// console.log(Meteor.user().profile.likes, LikesCollection.find({}).fetch());
		// Update track in user profile
		let prevLike = Meteor.user().profile.likes.find((profLike, index, arr) => {
			return profLike.track.id == track.id;
		});
		const count = prevLike === undefined ? 1 : prevLike.numberOfLikes+1;
		const likeInProfile = {
			track: track,
			numberOfLikes: count,
			currentlyLiked: true
		};
		// if (prevLike === undefined) {
		if (prevLike == undefined) {
			// var test = Meteor.users.find({_id: Meteor.user()._id, "profile.likes.id": track.id});
			console.log("NOT IN PROFILE LIKES")
			Meteor.users.update({_id: Meteor.user()._id},
				{
					$push: {"profile.likes": likeInProfile}
				}
			);
		}
		else {
			Meteor.users.update({_id: Meteor.user()._id, "profile.likes.track.id": track.id},
				{
					$set: {"profile.likes.$": likeInProfile}
				}
			);
			console.log("IN PROFILE LIKES");
		};

		//Update in Likes collection
		const like = {
			likedBy: Meteor.userId(),
			likedAt: new Date(),
			track: track
		};
		LikesCollection.update({likedBy: Meteor.userId(), "track.id": track.id}, 
			like, {upsert: true});
		return;
	},
	unlikeTrack: function(track) {
		//Update in user's profile (for stats)
		Meteor.users.update({_id: Meteor.user()._id, "profile.likes.track.id": track.id},
			{$set: {"profile.likes.$.currentlyLiked": false}}
		);
		//Update in likes collection (goes to user's homepage)
		LikesCollection.remove({likedBy: Meteor.userId(), "track.id": track.id});

	}
});