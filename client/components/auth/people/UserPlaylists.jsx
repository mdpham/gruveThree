UserPlaylists = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		// Meteor.subscribe("scUsers");
		Meteor.subscribe("playlists");
		return {
			// user: SCUsersCollection.findOne({id: parseInt(this.props.params.userID)}),
			playlister: PlaylistsCollection.find({id: parseInt(this.props.params.userID)}).fetch()
		};
	},
	renderSinglePlaylist(p) {
		return (
			<div>
			</div>
		);
	},
	renderPlaylister() {
		console.log(this.data.playlister);
		if (this.data.playlister === undefined) {return <NotFound />}
		else {
			return (this.data.playlister.map((p)=>{return this.renderSinglePlaylist(p)}))
		};
	},
	render() {
		return (
		<div>
			{this.renderPlaylister()}
		</div>);
	}
});