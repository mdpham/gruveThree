UserPage = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		Meteor.subscribe("favorites");
		Meteor.subscribe("scUsers");
		console.log(FavoritesCollection.findOne({id: parseInt(this.props.params.userID)}));
		return {
			user: SCUsersCollection.findOne({id: parseInt(this.props.params.userID)}),
			favorites: FavoritesCollection.findOne({id: parseInt(this.props.params.userID)})
		};
	},
	getInitialState() {
		return {
			userID: this.props.params.userID
		};
	},
	componentDidUpdate() {
		console.log('didMount', this.data);
	},

	renderFavorites() {
		if (this.data.favorites !== undefined) {
			console.log(this.data.favorites.favorites);
			return this.data.favorites.favorites.map((fav) => {return <TrackCard key={fav.id} scData={fav} />});	
		} else {
			return <NotFound />
		};
	},

	render() {
		console.log("rerenderd");
		const username = this.data.user ? this.data.user.username : "";
		return (
			<div className="ui stackable grid container">
				<div className="ui horizontal divider">{username}</div>
				<div className="one column row">
				<div className="ui column centered stackable grid">
					{this.renderFavorites()}
				</div>
				</div>
			</div>
		);
	}
});