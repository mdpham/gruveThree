TrackCard = React.createClass({
	componentDidMount() {
		// Hover over to select
		$(ReactDOM.findDOMNode(this)).find(".fluid.image")
			.dimmer({
				on: "hover",
				duration: {show: 600, hide: 400},
				transition: "horizontal flip"
			});
		// Lazy loading for track artwork
		$(ReactDOM.findDOMNode(this)).find(".fluid.image img")
		  .visibility({
		    type       : 'image',
		    transition : 'scale in',
		    duration   : 1000
		  });
		// Popup for track info
		$(ReactDOM.findDOMNode(this)).find(".track.card")
			.popup({
				on: 'hover',
				title: this.props.scData.user.username,
				content: this.props.scData.title,
				target: $(ReactDOM.findDOMNode(this)).find(".fluid.image img"),
				position: "top center",
				transition: "horizontal flip",
				hideOnScroll: false,
				hoverable: true
			});

	},
	getDuration(ms) {
		const d = new Date(ms);
		return d.getUTCMinutes() + ":" + (d.getUTCSeconds() < 10 ? '0'+d.getUTCSeconds() : d.getUTCSeconds());
	},
	selectTrack(trackData) {
		//streamtype is object {type: "favorites"|"user", _id: id in mongo db depending on type property}
		soundManager.player.updateStreamType(this.props.streamType);
		soundManager.player.select(trackData);
		soundManager.player.start(trackData);
	},
	likeTrack() {
		soundManager.liker.like(this.props.scData);
	},
	unlikeTrack() {
		soundManager.liker.unlike(this.props.scData);
	},
	render() {
		// console.log(this.props.sc);
		//scData is track info
		const scData = this.props.scData;
		const artwork_url = scData.artwork_url !== null ? scData.artwork_url.replace("large", "t500x500") : "https://i1.sndcdn.com/avatars-000062332227-4nq69b-t500x500.jpg";
		const duration = this.getDuration(scData.duration);
		var likeButton = null;
		switch (this.props.streamType.type) {
			case "favorites":
			//For liking a track and having it bubble up your likes
				likeButton = (
					<div className="ui huge pink basic inverted icon button" onClick={this.likeTrack}>
						<i className="heart icon"></i>
					</div>
				);
				break;
			case "likes":
			//For unliking a track
				likeButton = (
					<div className="ui huge basic inverted icon button" onClick={this.unlikeTrack}>
						<i className="remove icon"></i>
					</div>
				);
				break;
		};
		const blackImage = "https://i1.sndcdn.com/avatars-000062332227-4nq69b-t500x500.jpg";
		return(
			<div className="four wide column">
				<div className="track ui fluid card" data-variation="inverted">
						<div className="ui fluid image">
							<div className="ui dimmer">
								<div className="content">
									<div className="center">
										<div className="ui huge orange basic inverted icon button" onClick={this.selectTrack.bind(this, scData)}>
											<i className="play icon"></i>
										</div>
										{likeButton}
										<div className="ui inverted horizontal divider">{duration}</div>
									</div>

								</div>
							</div>
							<img className="ui image" src={blackImage} data-src={artwork_url}></img>
						</div>
				</div>
			</div>
		);
	}
});