const {History, Link} = ReactRouter;

AuthApp = React.createClass({
	mixins: [ReactMeteorData, History],
	getMeteorData() {
		return {
			isAuthenticated: Meteor.userId() !== null,
			currentUser: Meteor.user()
		};
	},
	componentWillMount() {
		// console.log("willMount, data: ", this.data);
		if (!this.data.isAuthenticated) {
			/*Go to sign in page*/
			this.history.pushState(null, "/");
		};
	},
	componentDidUpdate(prevProps, prevState) {
		// console.log("didUpdate, data: ", this.data);
		if (!this.data.isAuthenticated) {
			this.history.pushState(null, "/");
		};
	},
	getInitialState() {return {}},
	render() {
		const childrenStyle = {
			marginTop: "125px"
		};
		return (
			<div id="authApp">
				<AuthNavBar />

				<div id="authAppBody" style={{"marginTop": "100", "marginBottom": "100"}}>{this.props.children}</div>

				<Player />
			</div>
		);
	}
});