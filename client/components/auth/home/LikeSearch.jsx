//Generalize search component?
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
     });

      //For adding into People
      $("#test-search")
        .search({
            fields: {title: "title", description: "description", results:"results"},
            apiSettings: {
                url: "//api.soundcloud.com/users?q={query}&client_id=7b734feadab101a0d2aeea04f6cd02cc",
                onResponse(result) {
                    console.log("RESPONSE", result);
                    const response = {
                        results: Object.keys(result).map((k) => {
                        const t = result[k];
                        return {
                            title: t.username,
                            description: t.id
                        };
                    })};
                    console.log(result);
                    return response;
                }

            }
        })
  },
	componentDidMount() {
		this.initSearch();
	},
	componentDidUpdate() {
		this.initSearch();
	},
	render() {
		return (
            <div>
			<div id="like-search" className="ui fluid search">
			  <div className="ui fluid icon input">
			    <input className="prompt" type="text" placeholder="Your Likes" />
			    <i className="search icon"></i>
			  </div>
			  <div className="results"></div>
			</div>

{/*            <div id="test-search" className="ui fluid search">
              <div className="ui fluid icon input">
                <input className="prompt" type="text" placeholder="Test" />
                <i className="search icon"></i>
              </div>
              <div className="results"></div>
            </div>*/}

            </div>
		);
	}
});