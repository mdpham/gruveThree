Waveform = React.createClass({
	componentDidMount(){
		// console.log();
		$(ReactDOM.findDOMNode(this)).transition("hide");
	},
	render() {
		return (
			<div id="trackWave">
				<div id="trackWave-waveform"></div>
				<div id="trackWave-playing"></div>
				<div id="trackWave-seeking"></div>
				<div id="trackWave-loading"></div>
				<div id="trackWave-background"></div>
			</div>
		);
	}
})