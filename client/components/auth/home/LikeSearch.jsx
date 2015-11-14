LikeSearch = React.createClass({
	initSearch() {
    let searchSource = this.props.searchContent.map((like) => {return {
    	title: like.track.title,
    	username: like.track.user.username,
    	artwork_url: like.track.artwork_url,
    	trackData: like.track
    }});
    $("#like-search")
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
        // type: "trackResult",
        // templates: {
        // 	trackResult(response) {
        // 		console.log("response", response);
        // 		return "<span>stest</span>";
        // 	}
        // }
     });
  },
	componentDidMount() {
		this.initSearch();
	},
	componentDidUpdate() {
		this.initSearch();
	},
	render() {
		return (
			<div id="like-search" className="ui fluid search">
			  <div className="ui fluid icon input">
			    <input className="prompt" type="text" placeholder="Your Likes" />
			    <i className="search icon"></i>
			  </div>
			  <div className="results"></div>
			</div>
		);
	}
});