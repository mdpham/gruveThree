Waveform = React.createClass({
	componentDidMount(){
		// console.log();
		$(ReactDOM.findDOMNode(this)).transition("hide");

		const w = $("#trackWave").width();
		const h = $(ReactDOM.findDOMNode(this.refs.container)).height();
		console.log(w,h);
		// $(ReactDOM.findDOMNode(this.refs.waveform)).width(w);
		// $(ReactDOM.findDOMNode(this.refs.waveform)).height(h);


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
		// let p = Math.min(x,loaded) / ReactDOM.findDOMNode(this.refs.container).offsetWidth;
		let p = Math.min(x,loaded);
		console.log("%", p);
		// soundManager.player.seek(p);
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