const {Router, Route, IndexRoute, Link, Redirect} = ReactRouter;
const history = ReactRouter.history.useQueries(ReactRouter.history.createHistory)();

// Meteor.absoluteUrl({secure: true, replaceLocalhost: true});

Meteor.startup(()=>{
	//
	SC.initialize({
		client_id: "7b734feadab101a0d2aeea04f6cd02cc",
		redirect_uri: ""
	});
	//
	const renderTarget = document.getElementById("render-target");
	ReactDOM.render((
		<Router history={history}>
		<Route path="/" component={App}>
			<IndexRoute component={SignIn} />
		</Route>
		<Route path="/app" component={AuthApp}>
			<IndexRoute component={Home} />
			<Route path="users" component={Users} />
			<Route path="users/:userID" component={UserPage}>
				<Redirect from="users/:userID" to="users/:userID/" />
				<Route path="favorites" component={UserFavorites} />
				<Route path="playlists" component={UserPlaylists} />
				<Route path="playlists/:playlistID" component={PlaylistPage} /> 
				<Route path="*" component={UserFavorites} />
			</Route>
		</Route>
		<Route path="*" component={NotFound} />

		</Router>
	), renderTarget);
});

