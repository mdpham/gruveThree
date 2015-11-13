Player = React.createClass({
	getInitialState() {
		return {
			muted: false,
			paused: false
		};
	},
	stop() {
		soundManager.player.stop();
		//Be able to play after stopping track
		const paused = true;
		this.setState({paused});
	},
	pause() {
		const paused = soundManager.player.pause();
		console.log(paused);
		this.setState({paused});
	},
	changeVolume(delta) {
		soundManager.player.changeVolume(delta);
	},
	mute() {
		const muted = soundManager.player.mute();
		console.log(muted);
		this.setState({muted});
	},
	componentDidMount() {
		$(ReactDOM.findDOMNode(this)).transition("hide");
	},
	render() {
		const playerButton = " ui circular icon inverted button";
		const playerIcon = " small inverted circular icon";
		//For play state
		const pauseIcon = this.state.paused ? " play " : " pause ";
		const muteIcon = this.state.muted ? " red " : "";
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
								<div className={"player-button-volumemute red"+playerButton} onClick={this.mute}>
									<i className={"volume off"+muteIcon+playerIcon}></i>
								</div>
							{/*Playback*/}
								<div className={"player-button-stop"+playerButton} onClick={this.stop}>
									<i className={"red stop "+playerIcon}></i>
								</div>
								<div className={"player-button-pause"+playerButton} onClick={this.pause}>
									<i className={"orange"+pauseIcon+playerIcon}></i>
								</div>
						</div>
						<div className="eleven wide column">
							<h6 className="ui tiny inverted header">
								<div className="sub header"><span id="player-trackArtist">artist</span></div>
								<span id="player-trackTitle">track</span>
							</h6>
						</div>
						<div className="one wide column">
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