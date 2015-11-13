Player = React.createClass({
	getInitialState() {
		return {
			muted: false,
			paused: false,
			repeat: false,
			random: false
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
		console.log(muted);
		this.setState({muted});
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

	componentDidMount() {
		$(ReactDOM.findDOMNode(this)).transition("hide");

		//Playback option popup
		$("#player-show-playback").popup({
			position: "top center",
			on: "click",
			popup: $("#player-playback-popup"),
			transition: "vertical flip"
		});

	},
	render() {
		const playerButton = " ui circular icon inverted button";
		const playerIcon = " small inverted circular icon";
		//For play state
		const pauseIcon = this.state.paused ? " play " : " pause ";
		const muteIcon = this.state.muted ? " red " : "";
		//Playback
		const repeatIcon = this.state.repeat ? " loading " : "";
		return (
			<div id="player" className="ui huge bottom fixed inverted menu">
				<div className="ui fluid stackable grid container">
					<div className="middle aligned row">
						<div className="center aligned four wide column">
							{/*Volume*/}
								<div className={"player-button-volumedown"+playerButton} onClick={this.changeVolume.bind(this, false)}>
									<i className={"green volume down"+playerIcon}></i>
								</div>
								<div className={"player-button-volumeup"+playerButton} onClick={this.changeVolume.bind(this, true)}>
									<i className={"green volume up"+playerIcon}></i>
								</div>
								<div className={"player-button-volumemute red basic"+playerButton} onClick={this.mute}>
									<i className={"volume off"+muteIcon+playerIcon}></i>
								</div>
							{/*PAUSE/STOP*/}
								<div className={"player-button-pause"+playerButton} onClick={this.pause}>
									<i className={"orange"+pauseIcon+playerIcon}></i>
								</div>
								<div className={"player-button-stop"+playerButton} onClick={this.stop}>
									<i className={"red stop "+playerIcon}></i>
								</div>
						</div>

						<div className="eight wide column">
							<h6 className="ui tiny inverted header">
								<div className="sub header"><span id="player-trackArtist">artist</span></div>
								<span id="player-trackTitle">track</span>
							</h6>
						</div>

						<div className="center aligned two wide column">
							<div className={"player-button-previous tiny"+playerButton} onClick={this.previous}>
								<i className={"backward"+playerIcon}></i>
							</div>
							<div className={"player-button-next tiny"+playerButton} onClick={this.next}>
								<i className={"forward"+playerIcon}></i>
							</div>
						</div>

					{/*PLAYBACK OPTIONS*/}
						<div className="one wide column">
							<div id="player-show-playback" className="ui basic inverted icon button">
								<i className="chevron up icon"></i>
							</div>
							<div id="player-playback-popup" className="ui popup one column center aligned grid">
								<div className="ui fitted horizontal divider"><i className="random icon"></i></div>
								<div className="column">
									<div className="ui toggle fitted checkbox">
									  <input type="checkbox" onChange={this.toggleRandom}/>
									  <label></label>
									</div>
								</div>
								<div className="ui fitted horizontal divider">
									<i className={"repeat icon"+repeatIcon}></i>
								</div>
								<div className="column">
									<div className="ui toggle fitted checkbox">
									  <input type="checkbox" onChange={this.toggleRepeat}/>
									  <label></label>
									</div>
								</div>
							</div>
						</div>
						<div className="center aligned one wide column">
							<div className="player-button-like  ui circular basic inverted pink icon button">
								<i className={"pink heart"+playerIcon}></i>
							</div>
						</div>
					</div>
				</div>
				<div className="ui player-dimmer dimmer">
					<div className="ui mini loader"></div>
				</div>
			</div>
		);
	}
});