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
	componentDidMount() {
		$("#toggleUserPlaylists").removeClass("basic");
		$("#toggleUserFavorites").addClass("basic");

	},
	renderSinglePlaylist(p) {

		//CONVERT TO CARDS, USER SINGLE PLAYLIST CARD
		console.log("playlist", p);
		const playlist = p.playlist;
		const metaInfo = playlist.track_count + " tracks " + moment.duration(playlist.duration/1000, "seconds").humanize(true);
		const createdAt = moment(playlist.created_at, "YYYY/MM/DD").format("[Created on ] Do MMMM YYYY");
		const lastModified = moment(playlist.last_modified, "YYYY/MM/DD").format("[Last modified on ] Do MMMM YYYY");
		const someArtwork = _.sample(playlist.tracks).artwork_url;
		return (
			<div key={p.playlist.id} className="ui item test">
				<div className="image">
					<img className="ui circular image" src={someArtwork} />
				</div>
				<div className="middle aligned content">
					<div className="header">
						<a href={playlist.permalink_url} target="_blank">{playlist.title}</a>
					</div>
					<div className="meta">
						{metaInfo}
					</div>
					<div className="extra">{createdAt}</div>
					<div className="extra">{lastModified}</div>
					<div className="description">
						Search
					</div>
				</div>
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
		<div className="ui fifteen wide column centered divided items" style={{"marginBottom": "150px"}}>
			{this.renderPlaylister()}
		</div>);
	}
});