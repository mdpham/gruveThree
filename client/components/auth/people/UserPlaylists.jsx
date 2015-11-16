const {History} = ReactRouter;

PlaylistCard = React.createClass({
	mixins: [History],
	goToPlaylistPage() {
		//End artwork animation
		const intervalID = $(ReactDOM.findDOMNode(this.refs.artwork)).data("intervalID");
		Meteor.clearInterval(intervalID);
		//Go to new page
		const state = "/app/users/" + this.props.p.id + "/playlists/" +this.props.p.playlist.id;
		this.history.pushState(null, state);
	},
	mouseEnter(e) {
		e.preventDefault();
		intervalID = Meteor.setInterval(()=>{

			const someTrack = _.sample(this.props.p.playlist.tracks);
			const someArtwork = someTrack.artwork_url ? someTrack.artwork_url.replace("large", "t500x500") : "https://i1.sndcdn.com/avatars-000062332227-4nq69b-t500x500.jpg";
			ReactDOM.findDOMNode(this.refs.artwork).src = someArtwork;

			// $(artworkSelector).attr("src", someArtwork);
			// console.log("change", someArtwork)
		}, 600);
		$(ReactDOM.findDOMNode(this.refs.artwork)).data("intervalID", intervalID);
		// console.log("enter", intervalID, element);
	},
	mouseLeave(e) {
		e.preventDefault();
		const intervalID = $(ReactDOM.findDOMNode(this.refs.artwork)).data("intervalID");
		Meteor.clearInterval(intervalID);
	},
	componentDidMount() {
		$(ReactDOM.findDOMNode(this.refs.artworkDimmer)).dimmer({
			on: "hover",
			duration: {show: 1000, hide: 500},
			transition: "horizontal flip"
		});
	},
	render() {
		const playlist = this.props.p.playlist;
		const metaInfo = playlist.track_count + " tracks " + moment.duration(playlist.duration/1000, "seconds").humanize(true);
		const createdAt = moment(playlist.created_at, "YYYY/MM/DD").format("[Created ] Do MMMM YYYY");
		const someTrack = _.sample(playlist.tracks);
		const someArtwork = someTrack.artwork_url ? someTrack.artwork_url.replace("large", "t500x500") : "https://i1.sndcdn.com/avatars-000062332227-4nq69b-t500x500.jpg";
		return (
			<div className="ui four wide column">
				<div className="ui link fluid card" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
					<div className="middle aligned content">
						<div className="header">
							{playlist.title}
						</div>
						<div className="meta">
							{metaInfo}
						</div>
					</div>
					<div ref="artworkDimmer" className="blurring dimmable image">
			      <div className="ui dimmer">
			        <div className="content">
			          <div className="center">
			            <div className="ui big basic orange circular inverted icon button" onClick={this.goToPlaylistPage}>
			            	<i className="inverted orange horizontal ellipsis icon"></i>
			            </div>
			          </div>
			        </div>
			      </div>
						<img ref="artwork" className="playlist-artwork ui image" src={someArtwork} />
					</div>
					<div className="middle aligned content">
						<div className="meta">{createdAt}</div>
					</div>
				</div>
			</div>
		);
	}
});

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
	renderPlaylister() {
		console.log(this.data.playlister);
		if (this.data.playlister === undefined) {return <NotFound />}
		else {
			return (this.data.playlister.map((p)=>{return <PlaylistCard key={p.playlist.id} p={p} />}))
		};
	},
	render() {
		return (
		<div className="ui column centered stackable grid" style={{"marginBottom": "150px"}}>
			{this.renderPlaylister()}
		</div>);
	}
});