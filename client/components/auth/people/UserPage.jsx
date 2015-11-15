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
			showFavorites: true
		};
	},
	componentDidUpdate() {
		// console.log('didMount', this.data);
	},

	//On toggle click
	toggleFavoritesPlaylists(showFavorites) {
		if (showFavorites !== this.state.showFavorites) {
			//Otherwise we're already at the state we clicked for
			this.setState({showFavorites});
		};
	},
	render() {
		const username = this.data.user ? this.data.user.username : "";
		const favoritesCount = this.data.user ? this.data.user.public_favorites_count : "";
		const playlistsCount = this.data.user ? this.data.user.playlist_count : "";
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
					{
						this.state.showFavorites ? 
						<UserFavorites user={this.data.user} favoriter={this.data.favoriter} />
						:
						<UserPlaylists user={this.data.user} favoriter={this.data.user} /> 
					}
				</div>
			</div>
		);
	}
});