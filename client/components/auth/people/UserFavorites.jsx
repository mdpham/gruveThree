UserFavorites = React.createClass({
	//favoriter and user objects from UserPage component, reactive vars
	renderFavorites() {
		if (this.props.favoriter !== undefined && this.props.user !== undefined) {
			// const scUser = this.data.user;
			const streamType = {
				//Soundcloud favorites of a user
				type: "favorites",
				//Pass soundcloud id to get from FavoritesCollection
				id: this.props.user.id
			};
			// console.log(this.data.favoriter.favorites);
			return this.props.favoriter.favorites.map((fav) => {
				return <TrackCard key={fav.id} scData={fav} streamType={streamType}/>
			});	
		} else {
			return <NotFound />
		};
	},

	render() {
		console.log("favorites", this.props.favoriter);
		return (
			<div className="ui column centered stackable grid">
				{this.renderFavorites()}
			</div>
		);
	}
});