InfoModal = React.createClass({
  render() {
    return (
      <div id="info-modal" className="ui basic modal">
        <i className="close icon"></i>
        <div className="ui inverted header">
          GruveThree
          <div className="sub header">Created on Meteor + React</div>
        </div>
        <div className="content">
          <div className="description">
            <p>This is my fourth attempt at a Soundcloud powered music platform for organizing and playing tracks liked by my friends and I.</p>
            <p>If you want to try it out, click on the "Sign in as Guest" to use the public account.</p>
            <p>Initial loading might take a while, it updates the database from the Soundcloud API everytime a new user logs in.</p>
          </div>
        </div>
        <div className="actions">
          <div className="ui ok button" onClick={this.props.openRM}>
            Reflections and notes
          </div>
        </div>
      </div>
    );
  }
});