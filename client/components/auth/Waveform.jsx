Waveform = React.createClass({
	componentDidMount(){
		// console.log();
		$(ReactDOM.findDOMNode(this)).transition("hide");


	},
	mouseMove(e){
		let loaded = ReactDOM.findDOMNode(this.refs.loading).offsetWidth;
		let x = e.clientX - ReactDOM.findDOMNode(this.refs.container).offsetLeft;
		$(ReactDOM.findDOMNode(this.refs.seeking)).width(Math.min(x,loaded));
		// console.log(x, loaded);
	},
	mouseClick(e){
		let loaded = ReactDOM.findDOMNode(this.refs.loading).offsetWidth;
		let x = e.clientX - ReactDOM.findDOMNode(this.refs.container).offsetLeft;
		// Percentage to seek to
		let p = Math.min(x,loaded) / ReactDOM.findDOMNode(this.refs.container).offsetWidth;
		soundManager.player.seek(p);
	},
	mouseLeave(e){
		$(ReactDOM.findDOMNode(this.refs.seeking)).width(0);
	},
	render() {
		return (
			<div ref="container" id="trackWave" onMouseMove={this.mouseMove} onMouseLeave={this.mouseLeave} onClick={this.mouseClick}>
				<div id="trackWave-waveform"></div>
				<div id="trackWave-playing"></div>
{				<div ref="seeking" id="trackWave-seeking"></div>}
				<div ref="loading" id="trackWave-loading"></div>
				<div id="trackWave-background"></div>
			</div>
		);
	}
})