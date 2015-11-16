const {History, Link} = ReactRouter;

UserCard = React.createClass({
	mixins: [History],
	goToUserPage(userID) {
		
		//Loading
		$(".select-dimmer").dimmer("hide"); //Hide all loading if new user selected
		let loader = $(ReactDOM.findDOMNode(this)).find(".select-dimmer");
		loader.dimmer("show");
		//Get favorite tracks and playlists
		let promiseFavorites = SC.get("/users/"+userID+"/favorites", {limit: 500});
		let promisePlaylists = SC.get("/users/"+userID+"/playlists");

		Promise.all([promiseFavorites, promisePlaylists])
			.then((result) => {
				console.log("all promises", result);
				Meteor.call("updateUserOnSelect", userID, result, (error, result) => {
					console.log("updateUserOnSelect", error, result);
					loader.dimmer("hide");
					this.history.pushState(null, "/app/users/"+userID+"/favorites");
				});
			});
		// SC.get("/users/"+userID+"/favorites", {limit: 100})
		// 	.then((favorites) => {
		// 		// console.log(favorites);

		// 	});
		// 	// .then((favorites)=>{
		// 	// 	console.log(favorites);
		// 	// 	this.history.pushState(null, "/app/users/"+userID)
		// 	// }); 
		
	},
	componentDidMount() {
		$(ReactDOM.findDOMNode(this)).find(".hover-dimmer").dimmer({on: "hover"});
		console.log($(ReactDOM.findDOMNode(this)).find(".fluid.image img.ui.image"));
		$(ReactDOM.findDOMNode(this)).find(".fluid.image img.ui.image")
		  .visibility({
		    type       : 'image',
		    transition : 'vertical flip in',
		    duration   : 1000
		  })
	},
	render() {
		let scData = this.props.sc;
		const prof_avatar = scData.avatar_url.includes("default_avatar") ? scData.avatar_url : scData.avatar_url.replace("large", "t500x500");
		const username = scData.username;
		//
		let description = "";
		switch (scData.id) {
			case 49699208: description = "me"; break;
			case 69813820: description = "meh"; break;
			case 78954835: description = "one of three"; break;
			case 158395759: description = "the bestfriend"; break;
			case 79933909: description = "one of three"; break;
			case 135282929: description = "juuuuan"; break;
			case 86950103: description = "red bull"; break;
			case 83824614: description = "ICE EU"; break;
			default: description = "Fetching likes"; break;
		};
		return(
			
			<div className="five wide column">
				<div className="ui orange raised segment">
					<div className="user ui fluid card">
							<div className="ui fluid image">
								<div className="ui hover-dimmer dimmer">
									<div className="content">
										<div className="center">
											<div className="ui basic orange inverted button" onClick={this.goToUserPage.bind(this, scData.id)}>{username}</div>
										</div>
									</div>
								</div>
								<img className="ui image" src="https://i1.sndcdn.com/avatars-000062332227-4nq69b-t500x500.jpg" data-src={prof_avatar}></img>
							</div>
					</div>
					<div className="ui select-dimmer dimmer">
						<div className="ui text loader">{description}</div>
					</div>
				</div>
			
			</div>
		);
	}
});

Users = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		Meteor.subscribe("scUsers");
		return {
			currentUser: Meteor.user(),
			scUsers: SCUsersCollection.find({}).fetch()
		};
	},
	// componentDidMount(){
	// 	console.log('didMount', this.data);
	// 	$("#userCards .user.card .fluid.image").dimmer({on: 'hover'});
	// },
	// componentDidUpdate() {
	// 	console.log('didUpdate', this.data);
	// 	$("#userCards .user.card .fluid.image").dimmer({on: 'hover'});
	// },
	renderUsers(){
		console.log('scusers', this.data.scUsers);
		return this.data.scUsers.map((user) => {return <UserCard key={user.id} sc={user} />})
	},
	render() {
		if (!this.data.currentUser) {return <NotFound />};
		return (
			<div className="ui stackable grid container">
				<div className="ui horizontal divider">People</div>
				<div className="one column row">
					<div id="userCards" className="ui column centered stackable grid">
						{this.renderUsers()}
					</div>
				</div>
			</div>
		);
	}
});