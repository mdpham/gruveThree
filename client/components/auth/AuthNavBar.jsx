const {Link} = ReactRouter;

AuthNavBar = React.createClass({
	//Helpers
	signOut() {Meteor.logout(Meteor.logoutOtherClients);},
	render() {
		return (
			<div className="ui inverted top fixed menu">
				<div className="ui fluid container">
						<div className="ui simple dropdown item">
					    <div className="middle aligned content">
					      <span className="ui big inverted header">GruveThree</span>
					    </div>
							<div className="menu">
								<Link to="/app" className="item"><i className="home icon"></i>Home</Link>
								<Link to="/app/users" className="item"><i className="users icon"></i>People</Link>
								<div className="divider"></div>
								<a className="item" onClick={this.signOut}><i className="sign out icon"></i>Sign Out</a>
								<div className="divider"></div>
								<a className="item" href="https://www.soundcloud.com" target="_blank">Powered By <i className="large orange soundcloud icon"></i></a>
							</div>
						</div>
				</div>
			</div>
		);
	}
});