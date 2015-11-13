class SoundManager {
	constructor(){
		soundManager.setup({
		  url: '/path/to/swfs/',
		  flashVersion: 9,
		  preferFlash: false,
		  onready() {
		    // console.log('SM2 ready!');
		  },
		  ontimeout() {
		    // console.log('SM2 init failed!');
		  },
		  defaultOptions: {
		    // set global default volume for all sound objects
		    volume: 33
		  }
		});
		this.sm = soundManager;
	}
}

class Player extends SoundManager {
	constructor(){
		super();
		this.volume = 40;
		this.track = null;
		//Type of list we're playing from: user's likes or a soundcloud favorites
		this.streamType = {
			//"likes"=user, "favorites"=soundcloud
			type: null,
			//id for mongo (i.e. soundcloud vs _id depends on type property)
			id: null
		};
		//History for previous track
		this.queue = {
			posn: -1,
			history: []
		};
		//Playback
		this.playback = {
			//Should match Player.jsx on start
			repeat: false,
			random: false
		}

		player = this;
	}

	//Start playing new current track
	updateStreamType(type){
		console.log("updating stream type", type);
		player.streamType = type;
	}
	updateWave(track){
		$("#trackWave-waveform").css({
			"-webkit-mask-box-image": "url("+track.waveform_url+")"
		});
		$("#trackWave-playing, #trackWave-loading").css("width", 0);
		$("#trackWave").transition("show");

		//Ror chaining
		return player;
	}
	updateInfo(track){
		$("#player-trackTitle").text(track.title);
		$("#player-trackArtist").text(track.user.username);

		$("#player").transition("show");
		return player;
	}
	updateTrack(track) {
		//For access when liking
		player.track = track;
		//For playing previous tracks (filter somehow to not have duplicates)

		return player;
	}
	//On track click to play, push track into history and set posn to top of history
	updateQueue(track) {
		player.queue.history.push(track);
		// player.queue.posn = player.queue.history.length;

		return player;
	}
	//STREAM
	start(track){
		//Do nothing if already playing current track
		if (track == this.track) {console.log("ALREADY PLAYING");return;};
		// let player = this;
		// console.log("Player.play", stream, this,super);
		const stream = track.stream_url+"?client_id=7b734feadab101a0d2aeea04f6cd02cc";
		//Show player as loading
		$(".player-dimmer").dimmer("show");
		const options = {
			id: "current",
			url: stream,
			volume: player.volume,
			autoPlay: true,
			onplay() {
				player.updateWave(track).updateInfo(track).updateTrack(track);
				$(".player-button-volumemute i").removeClass("red");
				$(".player-button-pause i").removeClass("play").addClass("pause")
				$(".player-dimmer").dimmer("hide");
			},
			whileplaying() {
				//Keep track of volume, volume property updated in Player class will update here
				if (this.volume !== player.volume) {
					console.log("diff volume", this.volume, player.volume);
					this.setVolume(player.volume);
				};
				// console.log("played", this.position/this.durationEstimate);
				//Update waveform
				$("#trackWave-playing").css("width", 100*this.position/this.durationEstimate + "%");
				$("#trackWave-loading").css("width", 100*this.bytesLoaded/this.bytesTotal + "%");
			},
			whileloading() {
				// console.log("loaded", this.bytesLoaded/this.bytesTotal);
				$("#trackWave-loading").css("width", 100*this.bytesLoaded/this.bytesTotal + "%");
			}
		};
		player.sm.destroySound("current");
		player.sm.createSound(options);	
	}
	//STOP
	stop(){
		player.sm.stop("current");
		//Reset waveform and pause putton
		$("#trackWave-playing").css("width", 0);
		$(".player-button-pause i").removeClass("pause").addClass("play");

	}
	//PAUSE
	pause(){
		player.sm.togglePause("current");
		//return new pause state for Player component
		if (player.sm.getSoundById("current").paused) {
			$(".player-button-pause i").removeClass("pause").addClass("play");	
		} else {
			$(".player-button-pause i").removeClass("play").addClass("pause");	
		};
		//Include for playing after mute,stop,play
		if (player.sm.getSoundById("current").muted) {
			$(".player-button-volumemute i").addClass("red");
		} else {
			$(".player-button-volumemute i").removeClass("red");
		};
		// return player.sm.getSoundById("current").paused;
	}
	
	//VOLUME
	//delta = true => up
	changeVolume(delta) {this.volume = delta ? Math.min(this.volume+5, 100) : Math.max(this.volume-5, 0);}
	mute(){
		player.sm.toggleMute("current");
		if (player.sm.getSoundById("current").muted) {
			$(".player-button-volumemute i").addClass("red");
		} else {
			$(".player-button-volumemute i").removeClass("red");
		};
		// return player.sm.getSoundById("current").muted;
	}


	//LIKE
	like(){
		let currentTrack = player.track;
		//Pass this to Meteor call to update
		//Meteor method returns status
	}

	//PLAYBACK
	toggleRepeat() {
		player.playback.repeat = !player.playback.repeat;
		return player.playback.repeat;
	}
	toggleRandom() {
		player.playback.random = !player.playback.random;
		return player.playback.random;
	}
	next(){
		console.log("NEXT ", player.streamType);
		//Check queue for if we're in history

		//Else get upcoming track from server based on streamType
		Meteor.call("upcomingTrack", player.streamType, "random",
			(error, result) => {
				console.log("upcoming", error, result);
				if (error === undefined) {
					player.start(result);
				}
		});
	}
	previous(){
		console.log("previous", player.queue);

	}
}

soundManager.player = new Player();