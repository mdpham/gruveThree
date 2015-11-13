Player = React.createClass({
	controls: {
		stop() {
			soundManager.player.stop();
		},
		pause() {
			soundManager.player.pause();
		},
		changeVolume(delta) {
			soundManager.player.changeVolume(delta);
		},
		mute() {
			soundManager.player.mute();
		}
	},
	componentDidMount() {
		$(ReactDOM.findDOMNode(this)).transition("hide");
	},
	render() {
		const playerButton = " ui circular icon inverted button";
		const playerIcon = " small inverted circular icon";
		return (
			<div id="player" className="ui huge bottom fixed inverted menu">
				<div className="ui fluid stackable grid container">
					<div className="middle aligned row">
						<div className="center aligned four wide column">
								<div className={"player-button-stop"+playerButton} onClick={this.controls.stop}>
									<i className={"red stop "+playerIcon}></i>
								</div>
								<div className={"player-button-pause"+playerButton} onClick={this.controls.pause}>
									<i className={"orange play"+playerIcon}></i>
								</div>
								<div className={"player-button-volumedown"+playerButton} onClick={this.controls.changeVolume.bind(this, false)}>
									<i className={"green volume down"+playerIcon}></i>
								</div>
								<div className={"player-button-volumeup"+playerButton} onClick={this.controls.changeVolume.bind(this, true)}>
									<i className={"green volume up"+playerIcon}></i>
								</div>
								<div className={"player-button-volumemute"+playerButton} onClick={this.controls.mute}>
									<i className={"green volume off"+playerIcon}></i>
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