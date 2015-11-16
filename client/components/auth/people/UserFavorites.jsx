UserFavorites = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		Meteor.subscribe("scUsers");
		Meteor.subscribe("favorites");
		return {
			user: SCUsersCollection.findOne({id: parseInt(this.props.params.userID)}),
			favoriter: FavoritesCollection.findOne({id: parseInt(this.props.params.userID)})
		};
	},
	initSearch() {
		console.log(this.data.favoriter);
		let searchSource = this.data.favoriter ? 
			this.data.favoriter.favorites.map((fav) => {
				return {
					title: fav.title,
					username: fav.user.username,
					artwork_url: fav.artwork_url,
					trackData: fav
				};
			}) : [];
		console.log(searchSource);
    $("#favorite-search")
      .search({
        source : searchSource,
        fields: {title: "title", description: "username", image:"artwork_url"},
        searchFields: [
          "title", "username"
        ],
        searchFullText: false,
        onSelect(result, response) {
        	console.log(result, response);
        	const trackData = result.trackData;
					const streamType = {
						type: "likes",
						id: Meteor.userId()
					};
					soundManager.player.updateStreamType(streamType);
					soundManager.player.select(trackData);
					soundManager.player.start(trackData);
        }
     });
	},
	componentDidMount() {
		this.initSearch();
	},
	componentDidUpdate() {
		this.initSearch();
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
		const searchPlaceholder = this.data.user ? (this.data.user.username)+"\'s Favorites" : "";
		return (
			<div id="userFavoritesContainer" className="ui column centered stackable grid">
				<div className="seven wide column">
					<div id="favorite-search" className="ui fluid search">
						<div className="ui fluid icon input">
						  <input className="prompt" type="text" placeholder={searchPlaceholder} />
						  <i className="orange heart outline icon"></i>
						</div>
					  <div className="results"></div>
					</div>
				</div>
				<div className="ui hidden fitted divider"></div>
				{this.renderFavorites()}
			</div>
		);
	}
});