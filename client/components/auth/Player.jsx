Player = React.createClass({
	getInitialState() {
		return {
			// muted: false,
			// paused: false,
			repeat: false,
			random: false,
			//For toggling left menu (volume and playback)
			left: ""
		};
	},
	stop() {
		soundManager.player.stop();
		// //Be able to play after stopping track
		// const paused = true;
		// this.setState({paused});
	},
	pause() {
		const paused = soundManager.player.pause();
		// console.log(paused);
		// this.setState({paused});
	},
	changeVolume(delta) {
		soundManager.player.changeVolume(delta);
	},
	mute() {
		const muted = soundManager.player.mute();
		// console.log(muted);
		// this.setState({muted});
	},
	next() {
		soundManager.player.next();
	},
	previous() {
		soundManager.player.previous();
	},

	toggleRepeat() {
		const repeat = soundManager.player.toggleRepeat();
		this.setState({repeat});
	},
	toggleRandom() {
		const random = soundManager.player.toggleRandom();
		this.setState({random});
	},

	heart() {
		//In .player to get track data
		soundManager.player.like();
	},

	componentDidMount() {
		$(ReactDOM.findDOMNode(this)).transition("hide");

		// //Playback option popup
		// $("#player-show-playback").popup({
		// 	position: "top center",
		// 	on: "click",
		// 	popup: $("#player-popup-playback"),
		// 	transition: "vertical flip"
		// });
		// //Volume option popup
		// $("#player-show-volume").popup({
		// 	position: "top center",
		// 	on: "click",
		// 	popup: $("#player-popup-volume"),
		// 	transition: "vertical flip"
		// });
	},
	componentDidUpdate(){
		let left = this.state.left === "" ? this.refs.leftMenu : (this.state.left === "volume" ? this.refs.leftVolume : this.refs.leftPlayback);
		$(ReactDOM.findDOMNode(left)).transition("vertical flip in");
	},
	toggleLeft(left) {
		// const toggle = this.state.test;
		this.setState({left});
	},
	render() {
		const playerButton = " ui compact circular icon inverted button";
		const playerIcon = " small inverted circular icon";
		//For play state
		// const pauseIcon = this.state.paused ? " play " : " pause ";
		//Playback
		const muted = soundManager.getSoundById("current") ? soundManager.getSoundById("current").muted : false;
		return (
			<div id="player" className="ui bottom fixed inverted menu">
				<div className="ui fluid stackable grid container">
					<div className="middle aligned row">
						<div className="center aligned two wide column">
							{/*PAUSE/STOP*/}
								<div className={"player-button-pause"+playerButton} onClick={this.pause}>
									<i className={"orange pause"+playerIcon}></i>
								</div>
								<div className={"player-button-stop"+playerButton} onClick={this.stop}>
									<i className={"red stop "+playerIcon}></i>
								</div>
						</div>

						<div className="ui middle aligned nine wide column grid">
							<div className="row">
								<div className="right aligned two wide column">
							    <div className="ui mini image">
							      <img id="player-trackArtwork" src=""/>
							    </div>
								</div>
						    <div className="left middle aligned fourteen wide column">
						    		<div className="ui inverted header">
											<div className="sub header">
												<a id="player-trackArtist" className="white" href="" target="_blank">artist</a>
											</div>
						    			<a id="player-trackTitle" href="" className="white" target="_blank">track</a>
						    		</div>
						    </div>
						   </div>
						</div>



					{/*PLAYBACK OPTIONS*/}
					{ this.state.left === "" ?
						<div ref="leftMenu" className="ui five wide center aligned column grid">
								{/*Volume*/}
									<div id="player-show-volume" className={"ui tiny circular inverted compact icon button"+ (muted?" red":"")} 
										onClick={this.toggleLeft.bind(null, "volume")}>
										<i className="volume up icon"></i>
									</div>
									<div id="player-show-playback" className="ui tiny circular inverted compact icon button" onClick={this.toggleLeft.bind(null, "playback")}>
										<i className="random icon"></i>
									</div>


									<div className={"player-button-previous tiny"+playerButton} onClick={this.previous}>
										<i className={"step backward"+playerIcon}></i>
									</div>
									<div className={"player-button-next tiny"+playerButton} onClick={this.next}>
										<i className={"step forward"+playerIcon}></i>
									</div>
									<div className="player-button-like ui compact tiny circular basic inverted pink icon button" onClick={this.heart}>
										<i className={"pink heart"+playerIcon}></i>
									</div>
						</div>
							:
							(this.state.left === "volume" ?
								<div ref="leftVolume" className="ui five wide center aligned column grid">
									<div className="ui compact basic tiny circular inverted button" onClick={this.toggleLeft.bind(null, "")}>
										Back
									</div>
										<div className={"player-button-volumedown basic tiny"+playerButton} onClick={this.changeVolume.bind(this, false)}>
											<i className={"green minus"+playerIcon}></i>
										</div>
										<div className={"player-button-volumemute red basic tiny"+playerButton} onClick={this.mute}>
											<i className={"volume off"+playerIcon+(muted ? " red":"")}></i>
										</div>
										<div className={"player-button-volumeup basic tiny"+playerButton} onClick={this.changeVolume.bind(this, true)}>
											<i className={"green plus"+playerIcon}></i>
										</div>
								</div>
								:
								<div ref="leftPlayback" className="ui five wide column center aligned grid">
										<div className="ui compact basic tiny circular inverted button" onClick={this.toggleLeft.bind(null, "")}>
											Back
										</div>
										<div className={"ui orange small compact circular right labeled icon button"+(this.state.random ? "":" basic")} onClick={this.toggleRandom}>
											Shuffle
											<i className="random icon"></i>
										</div>
										<div className={"ui orange small compact circular right labeled icon button"+(this.state.repeat ? "":" basic")} onClick={this.toggleRepeat}>
											Repeat
											<i className={"repeat icon"+(this.state.repeat ? " loading":"")}></i>
										</div>
								</div>								
							)
					}
					</div>
				</div>
				<div className="ui player-dimmer dimmer">
					<div className="ui mini loader"></div>
				</div>
			</div>
		);
	}
});

							/*
								<div className="ui toggle fitted checkbox">
								  <input type="checkbox" onChange={this.toggleRepeat}/>
								  <label><i className={"inverted repeat icon"+repeatIcon}></i></label>
								</div>
																<div className="ui toggle fitted checkbox">
								  <input type="checkbox" onChange={this.toggleRandom}/>
								  <label>awd</label>
								</div>



							*/