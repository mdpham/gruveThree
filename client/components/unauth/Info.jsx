InfoModal = React.createClass({
  render() {
    return (
      <div id="info-modal" className="ui basic modal">
        <i className="close icon"></i>
        <div className="ui inverted header">
          Welcome to GruveThree
          <div className="sub header">Created on Meteor + React</div>
        </div>
        <div className="content">
          <div className="description">
            <p>This is my fourth attempt at a Soundcloud powered music platform for organizing and playing tracks liked by my friends and I.</p>
            <p>If you want to try it out, click on the "Guest Sign In" to use a public account.</p>
          </div>
        </div>
        <div className="actions">
          <div className="ui ok inverted button">
            Guest Sign In
          </div>
          <a href="https://github.com/mdpham/gruveThree" target="_blank" className="ui circular icon inverted button">
            <i className="github icon"></i>
          </a>
        </div>
      </div>
    );
  }
});