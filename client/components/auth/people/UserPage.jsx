const {History} = ReactRouter;

UserPage = React.createClass({
	mixins: [ReactMeteorData, History],
	getMeteorData() {
		Meteor.subscribe("scUsers");
		Meteor.subscribe("favorites");
		Meteor.subscribe("playlists");
		return {
			user: SCUsersCollection.findOne({id: parseInt(this.props.params.userID)}),
			favoriter: FavoritesCollection.findOne({id: parseInt(this.props.params.userID)}),
			playlisters: PlaylistsCollection.find({id: parseInt(this.props.params.userID)}).fetch()
		};
	},
	getInitialState() {
		return {
			showFavorites: true
		};
	},
	componentDidUpdate() {
		// console.log('didMount', this.data);
	},

	//On toggle click
	toggleFavoritesPlaylists(showFavorites) {
		//Move toggle icon toggling to UserFavorites UserPlaylists component
		if (showFavorites !== this.state.showFavorites) {
			//Otherwise we're already at the state we clicked for
			this.setState({showFavorites});
			const tab = showFavorites ? "/favorites" : "/playlists";
			this.history.pushState(null, "/app/users/"+this.data.user.id+tab);
		};
	},
	render() {
		// console.log("userpage", this.data.playlisters);
		const username = this.data.user ? this.data.user.username : "";
		const favoritesCount = this.data.favoriter ? this.data.favoriter.favorites.length : "...";
		const playlistsCount = this.data.playlisters ? this.data.playlisters.length : "...";
		const showFavoritesLabel = "ui orange circular label"+ (this.state.showFavorites ? "" : " basic");
		const showPlaylistsLabel = "ui orange circular label"+ (this.state.showFavorites ? " basic" : "");
		return (
			<div className="ui stackable grid container">
				<div className="one column row">
					<div className="bottom aligned column">
						<div className="ui fitted horizontal divider">
							<div className="ui huge header">
								{username}
								<div className="sub header">
										<a onClick={this.toggleFavoritesPlaylists.bind(this, true)} className={showFavoritesLabel}>
											Favorites
											<div className="detail">{favoritesCount}</div>
										</a>
										<a onClick={this.toggleFavoritesPlaylists.bind(this, false)} className={showPlaylistsLabel}>
											Playlists
											<div className="detail">{playlistsCount}</div>
										</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="one column row">
					{this.props.children}
					{/*
						this.state.showFavorites ? 
						<UserFavorites user={this.data.user} favoriter={this.data.favoriter} />
						:
						<UserPlaylists user={this.data.user} playlisters={this.data.playlisters} /> 
					*/}
				</div>
			</div>
		);
	}
});