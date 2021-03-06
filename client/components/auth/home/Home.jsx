const {History} = ReactRouter;

Home = React.createClass({
	mixins: [ReactMeteorData, History],
	getMeteorData() {
		Meteor.subscribe("likes");
		return {
			isAuthenticated: Meteor.userId() !== null,
			userId: Meteor.userId(),
			//Sort by most recent (descending)
			likes: LikesCollection.find({likedBy: Meteor.userId()}, {sort: {likedAt: -1}}).fetch()
		};
	},
	renderTracks() {
		if (!this.data.likes) {
			return (<div>Go get some likes</div>);
		}
		else {
			const streamType = {
				type: "likes",
				id: Meteor.userId()
			};
			//Sort by week
			if (this.data.likes.length === 0) {
				return (
					<div className="one column center aligned row">
						<div className="ui circular segment">
						  <h2 className="ui header">
								You have no likes!
						    <div className="sub header">
						    	<i className="big orange heart outline icon"></i>
						    </div>
						  </h2>
						</div>
					</div>
				);
			}
			else {
				console.log("sorting likes by week");
				let current = moment();
				let accumulator = [{weekOf: current.format("WW YYYY"), likes:[]}];
				let likesByWeek = this.data.likes.reduce((acc, like, index, array) => {
					//likes will be sorted by latest descending
					if (current.isoWeek() != moment(like.likedAt).isoWeek()) {
						acc.push({weekOf: moment(like.likedAt).format("WW YYYY"), likes:[like]});
					}
					else {
						let week = acc.pop();
						week.likes.push(like);
						acc.push(week);
					};
					return acc;
				}, accumulator);
				console.log(likesByWeek);
				return (
					likesByWeek.map((week, weekIndex) => {
						const weekInterval = "["+moment(week.weekOf, "WW YYYY").format("Do MMMM YYYY") + "," +moment(week.weekOf, "WW YYYY").add(6, "d").format("Do MMMM YYYY")+"]";
						return (
							<div className="one column row" key={"week"+weekIndex}>
							<div className="ui horizontal divider">{weekInterval}</div>
							<div className="ui column center aligned stackable grid">
								{week.likes.map((like) => {
									return 	<TrackCard key={like.track.id} scData={like.track} streamType={streamType} />
								})}
							</div>
							</div>
						)
					})
				);				
			};
		};
	},
	render() {
		if (!this.data.userId || !this.data.likes || !Meteor.user()) {return <NotFound />}
		console.log("likes: ", this.data.likes);
		return (
			<div className="ui stackable grid container">
				<div className="ui fitted horizontal divider">Hey, {Meteor.user().username}</div>
				{ this.data.likes.length == 0 ? "" :
				<div className="row">
					<div className="six wide column">
						<LikeSearch searchContent={this.data.likes} />
					</div>
					<div className="ten wide column">
						<MostLiked />
					</div>
				</div>
				}
				<div className="one column center aligned row" style={{"marginBottom": "150px"}}>
				<div id="profileTracks" className="ui fifteen wide column centered stackable grid container">
					{this.renderTracks()}
				</div>
				</div>
			</div>
		);
	}
});