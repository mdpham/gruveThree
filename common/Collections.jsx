//Collection of Soundcloud user IDs to update SCUserCollection with on sign in
InfluencesCollection = new Mongo.Collection("influences");

//Collection of Soundcloud users
SCUsersCollection = new Mongo.Collection("scUsers");

//Collection of Soundcloud users and their favorites (hearts on soundcloud)
FavoritesCollection = new Mongo.Collection("favorites");

//Collection of user liked tracks
//Holds track objects with ids in the profile object in user objects
LikesCollection = new Mongo.Collection("likes");



