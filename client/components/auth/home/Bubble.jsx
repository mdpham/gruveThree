Bubble = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		Meteor.subscribe("users");
		return {
			profileLikes: Meteor.user().profile.likes
		};
	},

	mostLikedTrack() {
		// this.data.profileLikes.reduce((previous,current,index,arr) => {
		// 	const next = current.currentlyLiked && previous.numberOfLikes =< current.numberOfLikes ? current : previous;
		// 	return next;
		// }, {currentlyLiked: true, numberOfLikes: 1});
	},
	render() {
		// console.log("bubbling likes: ", mostLikedTrack());
		return (
			<div className="ui fluid raised segment">
				<div className="ui items">
				<div className="ui item">
					<div className="ui tiny image">
						<img src="https://i1.sndcdn.com/avatars-000062332227-4nq69b-t500x500.jpg"></img>
					</div>
					<div className="content">
						<div className="ui tiny header">
							Track Name
						</div>
						<div className="meta">
							Artist
						</div>
						<div className="extra">
							is your most liked track
						</div>
					</div>
				</div>
				</div>
			</div>
		);
	}
});