UserFavorites = React.createClass({
	componentDidMount() {
		let component = this;
		$("#userFavoritesContainer")
			.visibility({
				once: false,
				observeChanges: true,
				onBottomVisible: this.renderSomeFavorites
			});
	},
	componentWillReceiveProps(nextProps){
		console.log("nextProps", nextProps);
		//Initial of infinite scroll
		if (this.props.favoriter === undefined && nextProps.favoriter !== undefined) {
			let displayedIndex = 40; //initial number loading
			let displayedFavorites = nextProps.favoriter.favorites.slice(0, displayedIndex);
			this.setState({displayedFavorites, displayedIndex});
		};
	},
	getInitialState() {
		return {
			displayedFavorites: [],
			//index of this.props.favoriter.favorites that have been displayed up to, exclusive
			displayedIndex: 0
		}
	},
	//Changes state to include more in displayedFavorites and change displayedIndex so renderFavorites can display them
	renderSomeFavorites() {
		if (this.props.favoriter !== undefined) {
			console.log("RENDER SOME FAVORITES", this.props);
			if (this.state.displayedIndex === this.props.favoriter.favorites.length) {
				console.log("ALL DISPLAYED");
				return;
			}
			else {
			//Increment
				console.log("MORE DISPLAY");
				const increment = 12;
				let prevDisplayedIndex = this.state.displayedIndex;
				let displayedIndex = prevDisplayedIndex + increment;
				let someFavorites = this.props.favoriter.favorites.slice(prevDisplayedIndex, displayedIndex);
				let displayedFavorites = this.state.displayedFavorites.concat(someFavorites);
				console.log("new displaye", displayedIndex, displayedFavorites);
				this.setState({displayedIndex, displayedFavorites});
			};
		} else{console.log("NO PROPS")};
	},
	//favoriter and user objects from UserPage component, reactive vars
	renderFavorites() {
		if (this.props.favoriter !== undefined && this.props.user !== undefined) {
			console.log("RENDER FAVORITES", this.props, this.state);
			// const scUser = this.data.user;
			const streamType = {
				//Soundcloud favorites of a user
				type: "favorites",
				//Pass soundcloud id to get from FavoritesCollection
				id: this.props.user.id
			};
			// console.log(this.data.favoriter.favorites);
			return this.state.displayedFavorites.map((fav) => {
				return <TrackCard key={fav.id} scData={fav} streamType={streamType}/>
			});	
		} else {
			return <NotFound />
		};
	},

	render() {
		// console.log("favorites", this.props.favoriter);
		return (
			<div id="userFavoritesContainer" className="ui column centered stackable grid">
				{this.renderFavorites()}
				<div onClick={this.renderSomeFavorites} id="userFavoritesLoader" className="ui fluid inverted segment"></div>
			</div>
		);
	}
});