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

	static initSound() {
		return soundManager.createSound();
	}
}

class Player extends SoundManager {
	constructor(){
		super();
		this.volume = 50;
		player = this;
	}

	//Start playing new current track
	updateInfo(track){
		$("#player-trackTitle").text(track.title);
		$("#player-trackArtist").text(track.user.username);
		$("#player-trackInfo").css({
			backgroundImage: "url("+track.waveform_url+")",
			backgroundSize: "cover",
			backgroundColor: "pink",
			filter: "invert(100%)"
		});
	}
	start(track){
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
				$(".player-dimmer").dimmer("hide");
				player.updateInfo(track);
			},
			whileplaying() {
				if (this.volume !== player.volume) {
					console.log("diff volume", this.volume, player.volume);
					this.setVolume(player.volume);
				}
			},
			whileloading() {
				console.log("readyState", this.readyState);
			}
		};
		player.sm.destroySound("current");
		player.sm.createSound(options);	
	}
	//Stop current track
	stop(){}
	//Pause toggle
	pause(bool){}
	//Seeking for a track (i.e. tracking)
	seek(forward){}
	//Changing volume for player object: up if true, down if false, mute if null
	changeVolume(delta = null) {
		if (delta === null) {
			player.sm.toggleMute();
		} else {
			this.volume = delta ? Math.min(this.volume+5, 100) : Math.max(this.volume-5, 0);
		};
		console.log("changeVolume", delta, this.volume);
	}
}

soundManager.player = new Player();