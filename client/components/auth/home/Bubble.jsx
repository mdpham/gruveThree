Bubble = React.createClass({
	render() {
		return (
			<div className="ui fluid raised segment">
				<div className="ui items">
				<div className="ui item">
					<div className="ui tiny image">
						<img src="https://i1.sndcdn.com/avatars-000062332227-4nq69b-t500x500.jpg"></img>
					</div>
					<div className="content">
						<div className="ui tiny header">
							Track Name
						</div>
						<div className="meta">
							Artist
						</div>
						<div className="extra">
							is your most liked track
						</div>
					</div>
				</div>
				</div>
			</div>
		);
	}
});