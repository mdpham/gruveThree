const {History} = ReactRouter;

Home = React.createClass({
	mixins: [ReactMeteorData, History],
	getMeteorData() {
		Meteor.subscribe("likes");
		return {
			isAuthenticated: Meteor.userId() !== null,
			currentUser: Meteor.user(),
			//Sort by most recent (descending)
			likes: LikesCollection.find({likedBy: Meteor.userId()}, {sort: {likedAt: -1}}).fetch()
		};
	},
	componentDidMount() {
		$("#profileTracks .track.card .fluid.image").dimmer({on: 'hover'});
	},
	componentDidUpdate() {
		$("#profileTracks .track.card .fluid.image").dimmer({on: 'hover'});
	},

	renderTracks() {
		if (!this.data.likes) {
			return (<div>Go get some likes</div>);
		}
		else {
			const streamType = {
				type: "likes",
				id: Meteor.userId()
			};
			//Sort by week
			// const likes = this.data.likes.reverse();
			// var accumulator = [];
			// var currentWeek;
			// likes.forEach((l,i,a) => {
			// 	console.log(moment(l.likedAt).isoWeek());
			// });

			//
			return (this.data.likes.map((like) => {
				return <TrackCard key={like.track.id} scData={like.track} streamType={streamType} />;
			}));
		};
	},
	render() {
		if (!this.data.currentUser || !this.data.likes) {return <NotFound />}
		console.log("likes: ", this.data.likes);
		return (
			<div className="ui stackable grid container">
				<div className="ui horizontal divider">{this.data.currentUser.username}</div>
				<div className="one column row">
				<div id="profileTracks" className="ui column centered stackable grid">
					{this.renderTracks()}
				</div>
				</div>
			</div>
		);
	}
});