UserFavorites = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		Meteor.subscribe("scUsers");
		Meteor.subscribe("favorites");
		return {
			user: SCUsersCollection.findOne({id: parseInt(this.props.params.userID)}),
			favoriter: FavoritesCollection.findOne({id: parseInt(this.props.params.userID)})
		}
	},

	// showMoreVisible() {
	// 	let component = this;
 //    var threshold, target = $("#userFavoritesLoader");
 //    if (!target.length) return;
 
 //    threshold = $(window).scrollTop() + $(window).height() - target.height();
 
 //    if (target.offset().top < threshold) {
 //        if (!target.data("visible")) {
 //            // console.log("target became visible (inside viewable area)");
 //            target.data("visible", true);
 //            component.renderSomeFavorites();
 //        }
 //    } else {
 //        if (target.data("visible")) {
 //            // console.log("target became invisible (below viewable arae)");
 //            target.data("visible", false);
 //        }
 //    };
	// },
	// componentDidMount() {
	// 	let component = this;
	// 	// $("#userFavoritesContainer")
	// 	// 	.visibility({
	// 	// 		once: true,
	// 	// 		observeChanges: true,
	// 	// 		initialCheck: false,
	// 	// 		onBottomVisible: this.renderSomeFavorites
	// 	// 	});
	// 	// console.log(this.data, 'mount');
	// 	$(window).scroll(this.showMoreVisible);
	// },
	// getInitialState() {
	// 	return {
	// 		displayedFavorites: [],
	// 		//index of this.props.favoriter.favorites that have been displayed up to, exclusive
	// 		displayedIndex: 40,
	// 		initialDisplay: true,
	// 		attachedLoader: false
	// 	}
	// },
	// //Changes state to include more in displayedFavorites and change displayedIndex so renderFavorites can display them
	// renderSomeFavorites() {
	// 	if (this.data.favoriter !== undefined) {
	// 		// console.log("RENDER SOME FAVORITES", this.props);
	// 		if (this.state.displayedIndex >= this.data.favoriter.favorites.length) {
	// 			// console.log("ALL DISPLAYED");
	// 			return;
	// 		}
	// 		else if (this.state.initialDisplay) {
	// 			const initialDisplay = false;
	// 			const displayedFavorites = this.data.favoriter.favorites.slice(0, this.state.displayedIndex);
	// 			this.setState({displayedFavorites, initialDisplay});
	// 		}
	// 		else {
	// 		//Increment
	// 			// console.log("MORE DISPLAY");
	// 			const increment = 12;
	// 			let prevDisplayedIndex = this.state.displayedIndex;
	// 			let displayedIndex = prevDisplayedIndex + increment;
	// 			let someFavorites = this.data.favoriter.favorites.slice(prevDisplayedIndex, displayedIndex);
	// 			let displayedFavorites = this.state.displayedFavorites.concat(someFavorites);
	// 			console.log("new displaye", displayedIndex, displayedFavorites);
	// 			this.setState({displayedIndex, displayedFavorites});
	// 		};
	// 	} else{console.log("NO DATA")};
	// },
	//favoriter and user objects from UserPage component, reactive vars
	renderFavorites() {
		if (this.data.favoriter !== undefined && this.data.user !== undefined) {
			// console.log("RENDER FAVORITES", this.props, this.state);
			// const scUser = this.data.user;
			const streamType = {
				//Soundcloud favorites of a user
				type: "favorites",
				//Pass soundcloud id to get from FavoritesCollection
				id: this.data.user.id
			};
			// // console.log(this.data.favoriter.favorites);
			// //Slice first 40 for initial load
			// const displayedIndex = this.state.displayedIndex;
			// let toDisplay = this.state.initialDisplay ? this.data.favoriter.favorites.slice(0,displayedIndex) : this.state.displayedFavorites;
			return this.data.favoriter.favorites.map((fav) => {
				return <TrackCard key={fav.id} scData={fav} streamType={streamType}/>
			});	
		} else {
			return <NotFound />
		};
	},

	render() {
		// console.log("favorites", this.props.params);
		return (
			<div id="userFavoritesContainer" className="ui column centered stackable grid">
				{this.renderFavorites()}
			</div>
		);
	}
});