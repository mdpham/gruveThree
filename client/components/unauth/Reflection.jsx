ReflectionModal = React.createClass({
	render() {
		return (
      <div id="reflection-modal" className="ui basic modal">
        <i className="close icon"></i>
        <div className="content">
          <div className="description">
		        <div className="ui inverted header">
		          Reflections and Notes
		        </div>
          	<p>React components make for easier layout development, but getting Meteor data in sync harder</p>
          	<p>SoundManager still can't play certain tracks, handling this is difficult as it doesn't throw an catchable error</p>
          	<p>SoundManager Sound object reactive values (i.e. muted, volume, play/pause) are hard to communicate to components</p>
          	<p>SoundManager, Player class use could be cleaner</p>
		        <div className="ui inverted header">
		          To do:
		        </div>
		        <p>Develop a mobile-friendly gruve</p>
		        <p>More efficient way to store and update data from Soundcloud API</p>
          	<p>Pagination from Meteor databases for tracks and playlists</p>
          	<p>Consider Player class incorporated into some app parent component, data flows downwards from there</p>
          	<p>Waveform dynamic sizing</p>
						<p>Statistics for favorites</p>
          </div>
        </div>
      </div>
		);
	}
})