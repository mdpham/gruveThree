const {History} = ReactRouter;

Home = React.createClass({
	mixins: [ReactMeteorData, History],
	getMeteorData() {
		return {
			isAuthenticated: Meteor.userId() !== null,
			currentUser: Meteor.user()
		};
	},
	componentDidMount() {
		$("#profileTracks .track.card .fluid.image").dimmer({on: 'hover'});
	},
	componentDidUpdate() {
		$("#profileTracks .track.card .fluid.image").dimmer({on: 'hover'});
	},
	render() {
		if (!this.data.currentUser) {return <NotFound />}
		return (
			<div className="ui stackable grid container">
				<div className="ui horizontal divider">{this.data.currentUser.username}</div>
				<div className="one column row">
				<div id="profileTracks" className="ui column centered stackable grid">
					
				</div>
				</div>
			</div>
		);
	}
});