//Collection of Soundcloud user IDs to update SCUserCollection with on sign in
InfluencesCollection = new Mongo.Collection("influences");
InfluencesCollection.allow({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});
//Collection of Soundcloud users
SCUsersCollection = new Mongo.Collection("scUsers");
SCUsersCollection.allow({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});
//Collection of Soundcloud users and their favorites (hearts on soundcloud)
FavoritesCollection = new Mongo.Collection("favorites");
FavoritesCollection.allow({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});
//Collection of Soundcloud playlists with id as soundcloud id, playlist as playlist object
PlaylistsCollection = new Mongo.Collection("playlists");
PlaylistsCollection.allow({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});
//Collection of user liked tracks
//Holds track objects with ids in the profile object in user objects
LikesCollection = new Mongo.Collection("likes");
LikesCollection.allow({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});



