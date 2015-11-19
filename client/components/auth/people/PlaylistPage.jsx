PlaylistPage = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		Meteor.subscribe("playlists");
		return {
			playlister: PlaylistsCollection.findOne({"playlist.id": parseInt(this.props.params.playlistID)})
		};
	},
	initSearch() {
		let component = this;
		let searchSource = this.data.playlister ? 
			this.data.playlister.playlist.tracks.map((track) => {
				return {
					title: track.title,
					username: track.user.username,
					artwork_url: track.artwork_url ? track.artwork_url : "https://i1.sndcdn.com/avatars-000062332227-4nq69b-t500x500.jpg",
					trackData: track
				};
			}) : [];
		// console.log(searchSource);
    $("#playlist-search")
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
						type: "playlist",
						id: parseInt(component.props.params.playlistID)
					};
					soundManager.player.updateStreamType(streamType);
					soundManager.player.select(trackData);
					soundManager.player.start(trackData);
        }
     });
	},
	componentDidMount() {
		$("#toggleUserFavorites, #toggleUserPlaylists").addClass("basic");
		this.initSearch();
	},
	componentDidUpdate() {
		this.initSearch();
	},
	renderPlaylistTracks() {
		if (this.data.playlister === undefined ) {return <NotFound />}
		else {
			const p = this.data.playlister;
			const streamType = {
				//Soundcloud playlist of a user
				type: "playlist", //third switch case in upcoming method
				//Playlist id to get from PlaylistCollection in upcomingtrack method
				id: p.playlist.id
			};
			return (p.playlist.tracks.map((track) => {
				return <TrackCard key={track.id} scData={track} streamType={streamType} /> 
			}));
		};
	},
	render() {
		console.log("data", this.data);
		const searchPlaceholder = this.data.playlister ? "Search tracks in "+this.data.playlister.playlist.title : "Loading Playlist";
		return (
			<div className="ui column centered stackable grid">
				<div className="seven wide column">
					<div id="playlist-search" className="ui fluid search">
						<div className="ui fluid icon input">
						  <input className="prompt" type="text" placeholder={searchPlaceholder} />
						  <i className="orange search icon"></i>
						</div>
					  <div className="results"></div>
					</div>
				</div>
				<div className="ui hidden fitted divider"></div>
				{this.renderPlaylistTracks()}
			</div>

		);
	}
});