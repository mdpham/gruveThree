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
		this.volume = 40;
		player = this;
	}

	//Start playing new current track
	updateWave(track){
		$("#trackWave-waveform").css({
			"-webkit-mask-box-image": "url("+track.waveform_url+")"
		});
		$("#trackWave-playing, #trackWave-loading").css("width", 0);
		$("#trackWave").transition("show");

		//for chaining
		return player;
	}
	updateInfo(track){
		$("#player-trackTitle").text(track.title);
		$("#player-trackArtist").text(track.user.username);

		$("#player").transition("show");
		return player;
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
				player.updateWave(track).updateInfo(track);
				$(".player-dimmer").dimmer("hide");
			},
			whileplaying() {
				//Keep track of volume, volume property updated in Player class will update here
				if (this.volume !== player.volume) {
					console.log("diff volume", this.volume, player.volume);
					this.setVolume(player.volume);
				};
				console.log("played", this.position/this.durationEstimate);
				//Update waveform
				$("#trackWave-playing").css("width", 100*this.position/this.durationEstimate + "%");
			},
			whileloading() {
				console.log("loaded", this.bytesLoaded/this.bytesTotal);
				$("#trackWave-loading").css("width", 100*this.bytesLoaded/this.bytesTotal + "%");
			}
		};
		player.sm.destroySound("current");
		player.sm.createSound(options);	
	}
	//Stop current track
	stop(){
		player.sm.stop("current");
		//Reset waveform and pause putton
		$("#trackWave-playing, #trackWave-loading").css("width", 0);

	}
	//Pause toggle
	pause(){
		player.sm.togglePause("current");
		//Change button to reflect new pause state

	}
	//Changing volume for player object: up if true, down if false, mute if null
	changeVolume(delta) {
		this.volume = delta ? Math.min(this.volume+5, 100) : Math.max(this.volume-5, 0);
	}
	mute() {
		player.sm.toggleMute("current");
	}
}

soundManager.player = new Player();