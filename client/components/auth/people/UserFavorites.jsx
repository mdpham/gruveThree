UserFavorites = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		Meteor.subscribe("scUsers");
		Meteor.subscribe("favorites");
		return {
			user: SCUsersCollection.findOne({id: parseInt(this.props.params.userID)}),
			favoriter: FavoritesCollection.findOne({id: parseInt(this.props.params.userID)})
		}
	},
	renderFavorites() {
		if (this.data.favoriter !== undefined && this.data.user !== undefined) {
			const streamType = {
				//Soundcloud favorites of a user
				type: "favorites",
				//Pass soundcloud id to get from FavoritesCollection
				id: this.data.user.id
			};
			return this.data.favoriter.favorites.map((fav) => {
				return <TrackCard key={fav.id} scData={fav} streamType={streamType}/>
			});	
		} else {
			return <NotFound />
		};
	},

	render() {
		return (
			<div id="userFavoritesContainer" className="ui column centered stackable grid">
				{this.renderFavorites()}
			</div>
		);
	}
});