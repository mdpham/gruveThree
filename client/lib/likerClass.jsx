class Liker {
	constructor(){
		
	}

	//LIKE
	like(track){
		console.log("Liker", track);
		//Pass this to Meteor call to update
		//Meteor method returns status
		Meteor.call("likeTrack", track, 
			(error, result) => {
				console.log(error, result);
				if (error === undefined) {
					$("#like-notification").text("Liked!");
					$("#gruve-three-dropdown").popup("show");
				};
		});
	}
	//UNLIKE
	unlike(track){
		console.log("unlike", track);
		Meteor.call("unlikeTrack", track,
			(error, result) => {
				console.log(error, result)
				if (error === undefined) {
					$("#like-notification").text("Unliked!");
					$("#gruve-three-dropdown").popup("show");
				};
		});
	}
}

soundManager.liker = new Liker();