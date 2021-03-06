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
    //Sign up warnings
    const signUpInputs = [this.refs.username, this.refs.password, this.refs.passwordConfirm];
    $(signUpInputs).popup({
      on: "manual",
      position: "top center",
      duration: 1250,
      onVisible() {
        $(signUpInputs).popup("hide");
      }
    });
    //Sign in warning
    const submitButton = this.refs.submitButton;
    $(submitButton).popup({
      on: "manual",
      position: "top center",
      duration: 1250,
      popup: "#signInErrorPopup",
      onVisible() {
        $(submitButton).popup("hide");
      }
    })
    
  },
  componentDidUpdate() {
    if (this.state.register) {$(".passwordConfirmField").transition({animation: "slide down"}).transition("show");}
    else {$(".passwordConfirmField").transition({animation: "slide down"}).transition("hide");};
  },
  registerStateToggle(e) {
    e.preventDefault();
    $(".usernameField, .passwordField, .passwordConfirmField").removeClass("error");
    this.setState({register: !this.state.register});
  },
  //

  //ON INIT SIGN UP AND IN, NEEDS TO SIGN OUT AND BACK IN TO POPULATE DB
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
    $(".usernameField, .passwordField").removeClass("error");
    Meteor.loginWithPassword(creds.username, creds.password, (error) => {
        if (error === undefined) {
          //Load and update database, then log in
          console.log("fetching from influences", this.data.influences);
          this.fetchFromSoundcloud(this.data.influences);          
        }
        else {
          console.log("loginWithPassword:", error);
          $("#signInErrorPopup").text(error.reason);
          $(".usernameField, .passwordField").addClass("error");
          $(this.refs.submitButton).popup("show");
        };
    });
  },
  submitSignUp(creds){
    console.log(creds);
    // let profile = {likes: []};
    //CHECK STRINGS
    //Alphanumeric 
    const alphanumeric = /^([a-zA-Z0-9-_])+$/;
    if (alphanumeric.test(creds.username)) {
      $(".usernameField").removeClass("error");
      if (alphanumeric.test(creds.password)) {
        $(".passwordField").removeClass("error");
        if (creds.password === creds.passwordConfirm) {
          $(".passwordConfirmField").removeClass("error");
          Accounts.createUser(creds,
            (error) => {
              if (error !== undefined) {console.log("createUser:", error)}
              else {
                console.log("account created, log in", creds);
                const username = creds.username;
                const password = creds.password;
                Meteor.loginWithPassword({username}, password, (error) => {
                  if (error !== undefined) {console.log("loginWithPassword", error);}
                  else {this.history.pushState(null, "/app");};
                });
              };
          });
        }
        else {
        //Password mismatch
          console.log("passwords don't match", creds.password, creds.passwordConfirm);
          $(this.refs.passwordConfirm).popup("show");
          $(".passwordConfirmField").addClass("error");
        }
      }
      else {
        //Non alphanumeric password
        console.log("non alphanum password", creds.password);
        $(this.refs.password).popup("show");
        $(".passwordField").addClass("error");
      }
    }
    else {
    //Non alphanumeric
      console.log("non alphanumeric username", creds.username);
      $(this.refs.username).popup("show");
      $(".usernameField").addClass("error");
    };
  },
  submitForm(e) {
    e.preventDefault();
    let username = ReactDOM.findDOMNode(this.refs.username).value.trim();
    let password = ReactDOM.findDOMNode(this.refs.password).value.trim();
    if (this.state.register) {
      let passwordConfirm = ReactDOM.findDOMNode(this.refs.passwordConfirm).value.trim();
      let profile = {likes: []};
      this.submitSignUp({username, password, passwordConfirm, profile});
    }
    else {
      this.submitSignIn({username, password});
    };
  },
  //For continuing as a guest, no need to register and sign in
  guestSignIn(e){
    e.preventDefault();
    console.log("log in as guest");
    Meteor.loginWithPassword("Guest", "password", (error) => {
        if (error !== undefined) {console.log("loginWithPassword:", error)}
        else {
          //Load and update database, then log in
          // console.log("fetching from influences", this.data.influences);
          this.fetchFromSoundcloud(this.data.influences);
          this.history.pushState(null, "/app");
        };
    });

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
      <div className="ui inverted orange segment">
      { this.data.currentUser ?
        <div className="ui two big fluid basic inverted buttons">
          <div className="ui button" onClick={this.continueByLoggingOut}>Sign Out</div>
          <div className="ui button" onClick={this.continueAsLoggedIn}>Continue as {this.data.currentUser.username}</div>
        </div>
        :
        <form id="signInForm" className="ui equal width inverted form" onSubmit={this.submitForm}>
          {/* GUEST, public account */}
          <div className="field">
            <div className="ui fluid inverted button" onClick={this.guestSignIn}>Sign in as Guest</div>
          </div>
          <div className="ui horizontal divider">or</div>
          {/* ACCOUNTS */}
          <div className="usernameField field"><input data-content="Username must be alphanumeric" type="text" ref="username" placeholder="Username" /></div>
          <div className="passwordField field"><input data-content="Password must be alphanumeric" type="password" ref="password" placeholder="Password" /></div>
          <div className="passwordConfirmField field"><input data-content="Passwords must match" type="password" ref="passwordConfirm" placeholder="Confirm Password" /></div>
          {/*Sign In or Register*/}
          <div className="field">
            <button ref="submitButton" className="ui fluid inverted button" type="submit">{submitButtonText}</button>
            <div id="signInErrorPopup" className="ui popup">error</div>
          </div>
          <div className="registerButton field">
            <div className="ui fluid basic inverted button" onClick={this.registerStateToggle}>{registerButtonText}</div>
          </div>
        </form>
      }
      </div>
    );
  }
})

SignIn = React.createClass({
  openInfoModal() {
    $("#info-modal")
      .modal({
        onApprove(){
          $("#reflection-modal").modal("show");
        }
      })
      .modal("show");
  },
  openReflectionModal(){
    console.log('rm');
    
  },
  render() {
    return (
      <div>
      <div className="ui inverted segment">
        <div className="ui huge inverted centered header">
          GruveThree
          <div className="sub header">Powered by <a href="https://www.soundcloud.com" target="_blank"><i className="big orange soundcloud icon"></i></a></div>
        </div>
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
            <div className="ui huge orange circular icon button" onClick={this.openInfoModal}><i className="inverted big info icon"></i></div>
            <InfoModal openRM={this.openReflectionModal}/>
            <ReflectionModal />
          </div>
        </div>
    	</div>
      </div>
    );
  }
});