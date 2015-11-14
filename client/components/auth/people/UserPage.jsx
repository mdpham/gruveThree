UserPage = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		Meteor.subscribe("favorites");
		Meteor.subscribe("scUsers");
		return {
			user: SCUsersCollection.findOne({id: parseInt(this.props.params.userID)}),
			favoriter: FavoritesCollection.findOne({id: parseInt(this.props.params.userID)})
		};
	},
	getInitialState() {
		return {
			userID: this.props.params.userID
		};
	},
	componentDidUpdate() {
		// console.log('didMount', this.data);
	},

	renderFavorites() {
		if (this.data.favoriter !== undefined && this.data.user !== undefined) {
			const scUser = this.data.user;
			const streamType = {
				//Soundcloud favorites of a user
				type: "favorites",
				//Pass soundcloud id to get from FavoritesCollection
				id: scUser.id
			};
			// console.log(this.data.favoriter.favorites);
			return this.data.favoriter.favorites.map((fav) => {
				return <TrackCard key={fav.id} scData={fav} streamType={streamType}/>
			});	
		} else {
			return <NotFound />
		};
	},

	render() {
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