TrackCard = React.createClass({
	componentDidMount() {
		$(ReactDOM.findDOMNode(this)).find(".fluid.image").dimmer({on: "hover"});
	},
	componentDidUpdate() {
		$(ReactDOM.findDOMNode(this)).find(".fluid.image").dimmer({on: "hover"});
	},
	getDuration(ms) {
		const d = new Date(ms);
		return d.getUTCMinutes() + ":" + (d.getUTCSeconds() < 10 ? '0'+d.getUTCSeconds() : d.getUTCSeconds());
	},
	testPlay(stream) {
		console.log('testPly');
		// soundManager.createSound({
		// 	url: stream+"?client_id=7b734feadab101a0d2aeea04f6cd02cc",
		// 	autoPlay: true,
		// 	volume: 50
		// });
		soundManager.player.start(stream);
	},
	testVolume(){
		soundManager.player.changeVolume();
	},
	render() {
		// console.log(this.props.sc);
		const scData = this.props.scData;
		const artwork_url = scData.artwork_url !== null ? scData.artwork_url.replace("large", "t500x500") : "https://i1.sndcdn.com/avatars-000062332227-4nq69b-t500x500.jpg";
		const duration = this.getDuration(scData.duration);
		return(
			<div className="four wide column">
				<div className="track ui fluid card">
						<div className="ui fluid image">
							<div className="ui dimmer">
								<div className="content">
									<div className="center">
										<div className="ui huge orange basic inverted icon button" onClick={this.testPlay.bind(this, scData)}>
											<i className="play icon"></i>
										</div>
										<div className="ui huge pink basic inverted icon button" onClick={this.testVolume}>
											<i className="heart icon"></i>
										</div>
										<div className="ui inverted horizontal divider">{duration}</div>
									</div>

								</div>
							</div>
							<img className="ui image" src={artwork_url}></img>
						</div>
				</div>
			</div>
		);
	}
});