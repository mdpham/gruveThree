Player = React.createClass({
	render() {
		return (
			<div className="ui huge bottom fixed menu">
				<div className="ui fluid grid container">
					<div className="middle aligned row">
						<div id="player-trackInfo" className="seven wide column">
							<div className="ui tiny header">
								<div className="sub header"><span id="player-trackArtist">Artist</span></div>
								<span id="player-trackTitle">Track</span>
							</div>
						</div>
						<div className="four wide column">4</div>
						<div className="four wide column">4</div>
					</div>
				</div>
				<div className="ui player-dimmer dimmer">
					<div className="ui mini loader"></div>
				</div>
			</div>
		);
	}
});