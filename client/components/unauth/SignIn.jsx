const {History} = ReactRouter;
      //phamartin:49699208
      //kateviloria:69813820
      //get2rich:78954835
      //eva-joo:158395759
      //devansh-malik:79933909
      //36rex36:135282929
      //s-palepu:86950103

SignInForm = React.createClass({
  mixins: [ReactMeteorData, History],
  getMeteorData() {
    Meteor.subscribe("influences");
    Meteor.subscribe("scUsers");
    return {
      influences: InfluencesCollection.find({}).fetch(),
      currentUser: Meteor.user()
    };
  },
  getInitialState() {
    return {
      username: "",
      password: "",
      passwordConfirm: "",
      register: false
    };
  },
  componentDidMount() {
    if (this.state.register) {$(".passwordConfirmField").transition({animation: "slide down"}).transition("show");}
    else {$(".passwordConfirmField").transition({animation: "slide down"}).transition("hide");};    
  },
  componentDidUpdate() {
    if (this.state.register) {$(".passwordConfirmField").transition({animation: "slide down"}).transition("show");}
    else {$(".passwordConfirmField").transition({animation: "slide down"}).transition("hide");};
  },
  registerStateToggle(e) {
    e.preventDefault();
    this.setState({register: !this.state.register});
  },
  //
  fetchFromSoundcloud(influences){
    let promises = influences.map((influence) => {return SC.get("/users/"+influence.scUserID)});
    Promise.all(promises)
      .then((scUsers) => {
        scUsers.forEach((user) => {Meteor.call("updateSCUsers", user)});
      })
      .then(this.history.pushState(null, "/app"));
  },
  submitSignIn(creds){
    console.log(creds);
    Meteor.loginWithPassword(creds.username, creds.password, (error) => {
        if (error !== undefined) {console.log("loginWithPassword:", error)}
        else {
          //Load and update database, then log in
          this.fetchFromSoundcloud(this.data.influences);
          // this.history.pushState(null, "/app");
        };
    });
  },
  submitSignUp(creds){
    console.log(creds);
    let profile = {favorites: []};
    //CHECK STRINGS
    Accounts.createUser(creds,
      (error) => {
        if (error !== undefined) {console.log("createUser:", error)}
        else {
          Meteor.loginWithPassword({username}, password, (error) => {
            if (error !== undefined) {console.log("loginWithPassword", error);}
            else {this.history.pushState(null, "/app");};
          });
        };
    });
  },
  submitForm(e) {
    e.preventDefault();
    let username = ReactDOM.findDOMNode(this.refs.username).value.trim();
    let password = ReactDOM.findDOMNode(this.refs.password).value.trim();
    if (this.state.register) {
      let passwordConfirm = ReactDOM.findDOMNode(this.refs.passwordConfirm).value.trim();
      this.submitSignUp({username, password, passwordConfirm, })
    }
    else {
      this.submitSignIn({username, password});
    };
  },
  //For when user is already logged in (i.e. after refreshing or by url)
  continueAsLoggedIn() {this.history.pushState(null, "/app");},
  continueByLoggingOut() {Meteor.logout(Meteor.logoutOtherClients);},
  //
  render() {
    console.log("signinform", this.data);
    const submitButtonText = this.state.register ? "Sign Up" : "Sign In";
    const registerButtonText = this.state.register ? "Back" : "Register";
    return (
      <div className="ui inverted segment">
      { this.data.currentUser ?
        <div className="ui two big fluid basic inverted buttons">
          <div className="ui button" onClick={this.continueByLoggingOut}>Sign Out</div>
          <div className="ui button" onClick={this.continueAsLoggedIn}>Continue as {this.data.currentUser.username}</div>
        </div>
        :
        <form id="signInForm" className="ui equal width inverted form" onSubmit={this.submitForm}>
          <div className="field"><input type="text" ref="username" placeholder="Username" /></div>
          <div className="field"><input type="password" ref="password" placeholder="Password" /></div>
          <div className="passwordConfirmField field"><input type="password" ref="passwordConfirm" placeholder="Confirm Password" /></div>
          {/*Sign In or Register*/}
          <div className="field">
            <button className="ui fluid button" type="submit">{submitButtonText}</button>
          </div>
          <div className="registerButton field">
            <div className="ui fluid button" onClick={this.registerStateToggle}>{registerButtonText}</div>
          </div>
        </form>
      }
      </div>
    );
  }
})

SignIn = React.createClass({
  render() {
    return (
      <div>
      <div className="ui inverted segment">
        <div className="ui huge centered header">GruveThree</div>
      </div>
    	<div className="ui centered grid container">
        <div className="row">
      		<div className="nine wide column">
      		  <div className="ui horizontal divider"></div>
            <SignInForm />
      		</div>
        </div>
        <div className="one column row">
          <div className="center aligned column">
            <div className="ui huge circular icon button"><i className="big info icon"></i></div>
          </div>
          <div className="center aligned column">
            <a className="item" href="https://www.soundcloud.com" target="_blank">Soundcloud</a>
          </div>
        </div>
    	</div>
      </div>
    );
  }
});