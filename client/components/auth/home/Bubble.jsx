Bubble = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		Meteor.subscribe("users");
		return {
			profileLikes: Meteor.user().profile.likes
		};
	},

	mostLikedTrack() {
		return this.data.profileLikes.reduce((previous,current,index,arr) => {
			const next = current.currentlyLiked && previous.numberOfLikes <= current.numberOfLikes ? current : previous;
			return next;
		}, {currentlyLiked: true, numberOfLikes: 1});
	},
	selectTrack(track) {
		const streamType = {
			type: "likes",
			id: Meteor.userId()
		};
		soundManager.player.updateStreamType(streamType);
		soundManager.player.select(track);
		soundManager.player.start(track);
	},
	render() {
		console.log("bubbling likes: ", this.mostLikedTrack());
		let mostLiked = this.mostLikedTrack();
		mostLiked.track.artwork_url = mostLiked.track.artwork_url !== null ? mostLiked.track.artwork_url.replace("large", "t500x500") : "https://i1.sndcdn.com/avatars-000062332227-4nq69b-t500x500.jpg";
		return (
			<div className="ui fluid raised orange segment">
				<div className="ui link items">
				<div className="ui item" onClick={this.selectTrack.bind(this, mostLiked.track)}>
					<div className="ui tiny image">
						<img src={mostLiked.track.artwork_url}></img>
					</div>
					<div className="middle aligned content">
						<div className="ui tiny header">
							{mostLiked.track.title}
						</div>
						<div className="meta">
							{mostLiked.track.user.username}
						</div>
						<div className="extra">
							is your most liked track, with{mostLiked.numberOfLikes}likes.
						</div>
					</div>
				</div>
				</div>
			</div>
		);
	}
});