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
	selectTrack(trackData) {
		console.log('testPly');
		//streamtype is object {type: "favorites"|"user", _id: id in mongo db depending on type property}
		soundManager.player.updateStreamType(this.props.streamType);
		soundManager.player.select(trackData);
		soundManager.player.start(trackData);
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
										<div className="ui huge orange basic inverted icon button" onClick={this.selectTrack.bind(this, scData)}>
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