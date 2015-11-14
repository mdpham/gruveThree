const {Link} = ReactRouter;

AuthNavBar = React.createClass({
	//Helpers
	signOut() {
		Meteor.logout(() => {
			//Stop playing sounds if logging out
			soundManager.player.sm.destroySound("current");
			Meteor.logoutOtherClients();
		});
	},
	render() {
		return (
			<div className="ui inverted top fixed menu">
				<div className="ui fluid container">
						<div className="ui simple dropdown item">
					    <div className="middle aligned content">
					      <span className="ui big inverted header">GruveThree</span>
					    </div>
							<div className="menu">
								<div className="ui horizontal divider"><i className="orange soundcloud icon"></i></div>
								<Link to="/app" className="item"><i className="home icon"></i>You</Link>
								<Link to="/app/users" className="item"><i className="users icon"></i>People</Link>
								<div className="divider"></div>
								<a className="item" onClick={this.signOut}><i className="sign out icon"></i>Sign Out</a>
							</div>
						</div>
						<div className="ui fluid container">
							<Waveform />
						</div>
				</div>
			</div>
		);
	}
});