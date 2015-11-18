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
};

class Player extends SoundManager {
	constructor(){
		super();
		this.volume = 10;
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
			posn: -1, //index of currently playing track in history;
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

	//WAVEFORM (method declaration above where they will be called)
	// p:=percentage [0,1]
	updateWaveformPlaying(p){
		const maxW = $("#trackWave-waveform").width();
		$("#trackWave-playing").width(maxW*p);
		return player;
	}
	updateWaveformLoading(p){
		const maxW = $("#trackWave-waveform").width();
		$("#trackWave-loading").width(maxW*p);
		return player;
	}

	//FOR NEW TRACK
	updateStreamType(type){
		console.log("updating stream type", type);
		player.streamType = type;
	}
	updateWave(track){
		$("#trackWave-waveform").css({
			"-webkit-mask-box-image": "url("+track.waveform_url+")"
		});
		player.updateWaveformLoading(0).updateWaveformPlaying(0);
		$("#trackWave").transition("vertical flip in");
		//For chaining
		return player;
	}
	updateInfo(track){
		$("#player-trackTitle").text(track.title).attr("href", track.permalink_url);
		$("#player-trackArtist").text(track.user.username).attr("href", track.user.permalink_url);
		$("#player-trackArtwork").attr("src", track.artwork_url);

		$("#player").transition("show");
		return player;
	}
	updateTrack(track) {
		//For access when liking
		player.track = track;
		//For playing previous tracks (filter somehow to not have duplicates)
		return player;
	}

	//STREAM
	//Clicked on TrackCard
	select(track){
		// console.log("queue", player.queue);
		player.queue.history.push(track);
		player.queue.posn = player.queue.history.length-1;
	}
	start(track){
		// Do nothing if already playing current track
		if (track == this.track) { console.log("ALREADY PLAYING");return; };
		// Show player as loading
		$(".player-dimmer").dimmer("show");
		// Create Sound
		const stream = track.stream_url+"?client_id=7b734feadab101a0d2aeea04f6cd02cc";
		const options = {
			id: "current", url: stream, volume: player.volume, autoPlay: false,
			onplay(){
				player.updateWave(track).updateInfo(track).updateTrack(track);

				$(".player-button-pause i").removeClass("play").addClass("pause");
				$(".player-dimmer").dimmer("hide");
			},
			whileplaying(){
				//Keep track of volume, volume property updated in Player class will update here
				if (this.volume !== player.volume) { this.setVolume(player.volume); };
				//Update waveform
				player
					.updateWaveformPlaying(this.position/this.durationEstimate)
					.updateWaveformLoading(this.bytesLoaded/this.bytesTotal);
			},
			whileloading(){
				player.updateWaveformLoading(this.bytesLoaded/this.bytesTotal);
			},
			onfinish(){
				player.next();
			}
		};

		// Check mute status before playing
		if ((player.sm.getSoundById("current") === undefined) || !player.sm.getSoundById("current").muted){
			player.sm.destroySound("current");
			player.sm.createSound(options).play();
		} else if (player.sm.getSoundById("current").muted) {
			player.sm.destroySound("current");
			player.sm.createSound(options).play().mute();	
		};
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
			$(".player-button-volumemute i, #player-show-volume i").addClass("red");
		} else {
			$(".player-button-volumemute i, #player-show-volume i").removeClass("red");
		};
		// return player.sm.getSoundById("current").paused;
	}
	
	//VOLUME
	//delta = true => up
	changeVolume(delta) {this.volume = delta ? Math.min(this.volume+5, 100) : Math.max(this.volume-5, 0);}
	mute(){
		player.sm.toggleMute("current");
		if (player.sm.getSoundById("current").muted) {
			$(".player-button-volumemute i, #player-show-volume i").addClass("red");
		} else {
			$(".player-button-volumemute i, #player-show-volume i").removeClass("red");
		};
		// return player.sm.getSoundById("current").muted;
	}


	//LIKE
	//Calls function in Liker Class
	like(){
		let currentTrack = player.track;
		player.sm.liker.like(currentTrack);
	}

	//PLAYBACK
	toggleRepeat() {
		player.playback.repeat = !player.playback.repeat;
		console.log(player.playback.repeat);
		return player.playback.repeat;
	}
	toggleRandom() {
		player.playback.random = !player.playback.random;
		console.log(player.playback.random);
		return player.playback.random;
	}
	repeat(){
		player.sm.getSoundById("current").stop().play();
	}
	next(){
		console.log("NEXT ", "stream: ", player.streamType, "queue: ", player.queue, "playback: ", player.playback);
		$(".player-dimmer").dimmer("show");
		if (player.playback.repeat) {
			player.repeat();
			$(".player-dimmer").dimmer("hide");
		}
		//Check queue for if we're in history
		else if (player.queue.posn+1 === player.queue.history.length) {
		//At top position in history
			console.log("next: top of history");
			//Else get upcoming track from server based on streamType
			Meteor.call("upcomingTrack", player.streamType, player.playback.random, player.track,
				(error, result) => {
					// console.log("upcoming", error, result);
					if (error === undefined) {
						// player.start(result);
						console.log("RESULT", result);
						player.start(result);
						player.queue.history.push(result);
						player.queue.posn += 1;
						$(".player-dimmer").dimmer("hide");
					}
					else {console.log("Error getting next track: ", error);};
			});			
		}
		else {
			console.log("next: in history, next track:");
			player.queue.posn += 1;
			player.start(player.queue.history[player.queue.posn]);
			$(".player-dimmer").dimmer("hide");
		};
	}
	previous(){
		console.log("PREVIOUS", "queue: ", player.queue, "playback: ", player.playback);
		if (player.playback.repeat) {
			player.repeat();
		}
		else if (player.queue.posn === 0) {
			console.log("previous: bottom of history");
			//Do nothing
		} 
		else {
			console.log("previous: in history");
			player.queue.posn -= 1;
			player.start(player.queue.history[player.queue.posn]);
		};
	}

	//WAVEFORM SEEKING
	// p:=percentage of duration to seek to
	seek(p){
		let currentSound = player.sm.getSoundById("current");
		// posn in milliseconds to seek to
		let seek = p*currentSound.durationEstimate;
		currentSound.setPosition(seek);
	}
};

soundManager.player = new Player();