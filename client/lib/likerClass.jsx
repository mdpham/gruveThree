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
		});
	}
	//UNLIKE
	unlike(track){
		console.log("unlike", track);
		Meteor.call("unlikeTrack", track,
			(error, result) => {
				console.log(error, result)
		});
	}
}

soundManager.liker = new Liker();