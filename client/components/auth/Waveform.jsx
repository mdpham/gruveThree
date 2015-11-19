Waveform = React.createClass({
	componentDidMount(){
		// Manually set widths since Waveform component is set in .fluid.container so waveform divs with percentage width will take on this larger width and go off screen
		const w = $("#trackWave").width();
		const waveform = ReactDOM.findDOMNode(this.refs.waveform);
		const background = ReactDOM.findDOMNode(this.refs.background);
		$([waveform, background]).width(w);
		// Hide until track is being played
		$(ReactDOM.findDOMNode(this)).transition("hide");
	},
	mouseMove(e){
		let loaded = ReactDOM.findDOMNode(this.refs.loading).offsetWidth;
		let x = e.clientX - ReactDOM.findDOMNode(this.refs.container).offsetLeft;
		// Change seeking div shadow to where mouse is to indicate where the user would seek in the track to, to a max of what is loaded
		$(ReactDOM.findDOMNode(this.refs.seeking)).width(Math.min(x,loaded));
		// console.log(x, loaded);
	},
	mouseClick(e){
		let loaded = ReactDOM.findDOMNode(this.refs.loading).offsetWidth;
		let x = e.clientX - ReactDOM.findDOMNode(this.refs.container).offsetLeft;
		// Percentage of duration to seek to
		let p = Math.min(x,loaded)/ $(ReactDOM.findDOMNode(this.refs.waveform)).width();
		soundManager.player.seek(p);
	},
	mouseLeave(e){
		$(ReactDOM.findDOMNode(this.refs.seeking)).width(0);
	},
	render() {
		return (
			<div ref="container" id="trackWave" onMouseMove={this.mouseMove} onMouseLeave={this.mouseLeave} onClick={this.mouseClick}>
					<div ref="waveform" id="trackWave-waveform"></div>
					<div ref="playing" id="trackWave-playing"></div>
					<div ref="seeking" id="trackWave-seeking"></div>
					<div ref="loading" id="trackWave-loading"></div>
					<div ref="background" id="trackWave-background"></div>
			</div>
		);
	}
})