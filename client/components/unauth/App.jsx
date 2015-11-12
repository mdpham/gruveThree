const {Link} = ReactRouter;

App = React.createClass({
	getInitialState() {return {}},
	//For top left button
	render() {
		return (
			<div id="app">
				{this.props.children}
			</div>
		);
	}
});