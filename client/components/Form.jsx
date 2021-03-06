import React, { Component } from 'react';
import Layout from './Layout';
import Title from './Title';
import SocialButtons from './SocialButtons';
import TextInput from './TextInput';
import TextField from './TextField';
import SelectField from './SelectField';
import Btn from './Btn';
import InfoMeter from './InfoMeter';
import { Link } from "react-router";
let _ = require("lodash");
const extend = _.extend;
const clone = _.clone;

let options = [
  {id: 1, value: 'default', label: 'Blog'},
  {id: 2, value: 'one', label: 'Essay'},
];

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const wcMin = 10;

var validateInputTextBasic = function(data) {
  var
    errors  = [],
    name    = data.name,
    value   = data.value,
    length  = value.length;

  if (length < data.min) {
    errors.push(name + ' must be at least 4 characters long');
  }
  if (length > data.max) {
    errors.push(name + ' cannot be greater than 255 characters long');
  }

  return errors;
}

export default class Form extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  state = {
    id: 0,
    showTextArea: false,
    inputs: {
      email: {
        value: '',
        errors: [],
        validate: function(value) {
          // Start of with basic checks
          var errors = validateInputTextBasic({
            name: 'Email',
            min: 4,
            max: 50,
            value: value
          });

          if(!EMAIL_REGEX.test(value)) {
            errors.push('Email must be of valid format: someone@example.com');
          }

          return errors;
        }
      },
      firstName: {
        value: '',
        errors: [],
        validate: function(value) {
          // Start of with basic checks
          var errors = validateInputTextBasic({
            name: 'First Name',
            min: 2,
            max: 12,
            value: value
          });

          return errors;
        }
      },
      lastName: {
        value: '',
        errors: [],
        validate: function(value) {
          // Start of with basic checks
          var errors = validateInputTextBasic({
            name: 'Last Name',
            min: 2,
            max: 12,
            value: value
          });

          return errors;
        }
      }

    },
    validationErrors: [],

    // email: "",
    // firstName: "",
    // lastName: "",
    wordCount: 0,
    textInput: "",
    textInputWc: 0,
    // validInputs: {
    //   email: 0,
    //   firstName: 0,
    //   lastName: 0
    // },  // 4 inputs should be valid for submit button to be working - 1st name, last name, email, and wordcount minimum
        // 2 is a valid and loaded input status
        // 1 is invalid and loaded
        // 0 is neutral

    // 0 is default, 1 is loading, 2 is loaded
    connections: {
      twitter: {
        name: 'twitter',
        title: 'Twitter',
        icon: 'is-tw',
        status: 0
      }
    }
  }

  componentDidMount() {
    var self = this;

    // register the POST function that will fire on Oauth window close
    const fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");

    const httpOptions = {
      method: "POST",
      headers: fetchHeaders,
      mode: "cors"
    };

    // child window should pass Tokens into this function so that parent can send POST
    window.sendPost = function(token, verifier) {
      const fetchReq = new Request("/api/data" + "?oauth_token=" + token + "&oauth_verifier=" + verifier, httpOptions);
      window.fetch(fetchReq, httpOptions)
        .then(function(res) {
          res.json().then(function(data) {
            console.log("response from POST: ", data);
            var newState = _.extend({}, self.state);
            newState.wordCount = data["wordCount"];
            newState.connections.twitter.status = 2;
            newState.id = data["id"];

            self.setState(newState);
            // todo: allow state updates to account for error cases
            console.log("this.state: ", self.state);
            // reset component state to show success from social media data and wordcount
          }, function(err) {
            console.log("error: ", err);
          });
        }, function(err) {
          console.log("error in main fetch call:", err);
        });

    }

    // Init Facebook SDK
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1800563613547983',
        cookie     : true,  // enable cookies to allow the server to access
                          // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use version 2.8
      });

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.

    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }


  openTextArea = () => {
    this.setState({showTextArea: true});
  }

  wordCounter = (e) => {
      let s = e.target.value;
      s = s.replace(/(^\s*)|(\s*$)/gi,""); // exclude  start and end white-space
      s = s.replace(/[ ]{2,}/gi," ");      // 2 or more space to 1
      s = s.replace(/\n /,"\n");           // exclude newline with a start spacing
      let wc = _.filter(s.split(' ')).length;
      this.setState({
        textInputWc: wc,
        textInput: s,
        textInputUpdated: true
      });
  }

  onConnect = (connection) => {
    // only continue if status is unconnected (0)
    if (connection.status !== 0) return;

    var connectMap = {
      twitter: 'onConnectTwitter',
      facebook: 'onConnectFacebook'
    }

    // Call the corresponding SM connecting function
    this[connectMap[connection.name]](connection);
  }

  onConnectTwitter = (connection) => {
    // Set the state to be loading and rerender
    this.state.connections.twitter.status = 1;
    this.forceUpdate();

    // make width and height dynamic based on parent window
    var url = "/api/oauth",
        title= "Mindmetrics Twitter Authentication",
        w   = 600,
        h   = 556,
        wLeft = window.screenLeft ? window.screenLeft : window.screenX,
        wTop = window.screenTop ? window.screenTop : window.screenY,
        left = wLeft + (window.innerWidth / 2) - (w / 2),
        top = wTop + (window.innerHeight / 2) - (h / 2);
    var childWindowRef = window.open(
        url,
        title,
        'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=' + w + ',height=' + h + ', top=' + top + ', left=' + left
        );
  }

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  testAPI(id) {

    var self = this;
    console.log('Welcome!  Fetching your information.... ');

    // change inputs to an options object
    FB.api('/' + id, {inputs: "id,name,email,friends"}, function(response) {
    console.log("Full Facebook API response: ", response);
    console.log('Successful login for: ' + response.name);

    var newState = _.extend({}, self.state);
    newState.connections.facebook.status = 2;
    self.setState(newState);
    });
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  checkLoginState(res) {
    let newState = _.extend({}, this.state);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (res.status === 'connected') {
      // Logged into your app and Facebook.
      console.log("Logged in. Facebook response:", res);
      this.testAPI(res.authResponse.userID);
    } else if (res.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      console.log('Facebook: Please log ' + 'into this app.');
      newState.connections.facebook.status = 0;
      this.setState(newState);
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      console.log('Please log ' + 'into Facebook.');

      newState.connections.facebook.status = 0;
      this.setState(newState);
    }
  }

  handleFbClick() {
    var self = this;
    FB.login(function(response){
      self.checkLoginState(response);
    }, {
      scope: "public_profile,email,user_friends",
      return_scopes: true
    });
  }

  onConnectFacebook = (connection) => {
    this.state.connections.facebook.status = 1;
    this.forceUpdate();
    this.handleFbClick();
  };

  // TODO: edit this so that on submit, loading state immediately overlays over screen
  // on error, flash to screen. on success, move page to results
  submitData = () => {
    const {email, textInput, firstName, lastName, id} = this.state;
    let userData = {email, textInput, firstName, lastName, id};
    // Generate a final set of errors before continuing (in case user skipped something)
    this.state.validationErrors = this.validateFields();
    // Rerender to refresh validation summaries
    this.forceUpdate();
    let self = this;
    
    // If there's an error, rerender the page with new validation errors
    if (this.state.validationErrors.length > 0) {
      // Skip posting to server
      return;
    }

      function defaultProfileOptions(options) {
          var defaults = extend({
              source_type: 'text',
              // accept_language: globalState.userLocale || OUTPUT_LANG,
              include_raw: false,
              consumption_preferences: true
          }, options || {});

          // if (defaults.source_type !== 'twitter') {
          //     defaults = extend({
          //         language: globalState.userLocale || OUTPUT_LANG
          //     }, defaults);
          // }
          return defaults;
      }

      function getProfileForText(text, options) {
          getProfile(text, extend(options || {}, {source_type: 'text'}));
      }

      function getProfile(data, options) {
          options = defaultProfileOptions(options);

          const payload = clone(options);
          payload.text = data;
          console.log("this.state: ", self.state.inputs);
          payload.email = self.state.inputs.email.value;
          payload.firstName = self.state.inputs.firstName.value;
          payload.lastName = self.state.inputs.lastName.value;

          const fetchHeaders = new Headers();
          fetchHeaders.append("Content-Type", "application/json");

          const httpOptions = {
              method: "POST",
              headers: fetchHeaders,
              mode: "cors",
              body: JSON.stringify(payload)
          };

          const fetchReq = new Request("/api/submit", httpOptions);

          fetch(fetchReq, httpOptions)
              .then((response) => {
                  response.json().then((data) => {
                      // move profile data out of global window obj ?
                      window.personalityData = data;
                      let id = data.uuid;
                      console.log("Fetch response - id :", id);
                      self.context.router.push({
                          pathname: "/results/" + id
                      });

                      console.log("inside response json in fetch req");

                  }).catch(function (err) {
                      console.log("Error in json", err);
                  });
              }).catch(function (err) {
              console.log("Fetch error: ", err);
          });

      }

      getProfileForText(this.state.textInput);
  };



  onInputChange = (inputName, e) => {
    let input = this.state.inputs[inputName];
    input.updated = true;
    input.value = e.currentTarget.value;
    this.forceUpdate();
  };

  onInputFocus = (inputName) => {

  };

  onInputBlur = (inputName, e) => {
    let self = this,
        inputs = this.state.inputs,
        input = inputs[inputName];

    // Skip validation, if the user is skipping over field (eg: switching to a another input)
    if (!input.updated) {
      return;
    }

    this.afterInputIsBlurred(e.currentTarget, function() {
      // First, update this input's validation errors
      // input.errors = self.validateField(input);

      // Update all the validation errors so far, and rerender
      self.setState({
        validationErrors: self.validateFields({softCheck: true})
      });

    });

  }

  validateField = (input, value) => {
    return input.validate(input.value);
  }

  validateFields = (options) => {
    var self = this;
    options || (options = {});

    // Validate every field. This is used in this.submitData before continuing
    // Edge case: user clicks submit before entering anything
    // => this requires a full cycle of validation, since none were triggered by usual user inputs

    // First, validate each field (in case user never onBlured/triggered their validation)
    _.each(this.state.inputs, function(input) {
      // Skip this field, if softCheck is on
      if (options.softCheck && !input.updated) {
        return;
      }
      input.errors = self.validateField(input);
    });

    // Next, gather validationErrors
    var validationErrors = this.getValidationErrors(this.state.inputs);

    // Determine if the length of the words are valid too, whether from text or api
    // From text. TODO: from APIs
    if (!options.softCheck && (this.state.textInputWc < wcMin) || (1001 /*replace with count summation from api data*/) < wcMin) {
      validationErrors = validationErrors.concat('There should be at least ' + wcMin + ' words for a good analysis.')
    }

    // options.rerender && validationErrors.length > 0 && this.forceUpdate();

    // Simply return the errors. The caller should determine whether there should be a rerender
    return validationErrors;
  }

  getValidationErrors = (inputs) => {
    return _.reduce(inputs, function(errors, input) {
      return errors.concat(input.errors);
    }, []);
  }

  afterInputIsBlurred = (currentTarget, cb) => {
    setTimeout(function() {
      if (!currentTarget.contains(document.activeElement)) {
        // input is blurred. Call the callback
        cb && cb();
      }
    }, 0);
  }

  renderValidationErrors = () => {
    // Everything is already validated. Show inputs' errors
    var validationErrors = this.state.validationErrors;

    if (validationErrors.length == 0) {
      return null;
    }

    return (
      <div className='validation-errors bg-danger'>
        {
          _.map(validationErrors, function(error, i) {
            return <div className='validation-error' key={i}>{error}</div>
          })
        }
      </div>
    )
  }

  render() {
    var
      inputs = this.state.inputs;

    return (
      <Layout classnames='Form'>
        <section className="section is-personal-info">

          <div className="section__info">
            <Title size="2">
              Set up and Analyze
            </Title>
            <p className="section__sub-title">
              Mindmetrics is the easiest way to get your personality analyzed accurately.
            </p>
            <p className="section__sub-title">
            Set up your profile and get your personality report instantly.
            </p>
          </div>

          <div className="section__profile">
            <Title size="3">
              Profile
            </Title>
            <TextInput
              onBlur        = {this.onInputBlur.bind(null, 'email')}
              onInputFocus  = {this.onInputFocus.bind(null, 'email')}
              onChange      = {this.onInputChange.bind(null, 'email')}
              name          = 'email'
              placeholder   = 'name@example.com'
              errors        = {inputs.email.errors.length}/>

            <div className="input-group">
              <TextInput
                mod           = 'is-small'
                onBlur        = {this.onInputBlur.bind(null, 'firstName')}
                onInputFocus  = {this.onInputFocus.bind(null, 'firstName')}
                onChange      = {this.onInputChange.bind(null, 'firstName')}
                name          = 'firstName'
                placeholder   = 'First Name'
                errors        = {inputs.firstName.errors.length}
              />
              <TextInput
                mod           = 'is-small'
                onBlur        = {this.onInputBlur.bind(null, 'lastName')}
                onInputFocus  = {this.onInputFocus.bind(null, 'lastName')}
                onChange      = {this.onInputChange.bind(null, 'lastName')}
                name          = 'lastName'
                placeholder   = 'Last Name'
                errors        = {inputs.lastName.errors.length}
              />
            </div>
          </div>

          <div className="section__data">
            <Title size="3">
              Data
            </Title>
            <SocialButtons connections={this.state.connections}
                           onConnect={this.onConnect} />
          </div>

          <div className="section__separator">
            <span>
              OR
            </span>
          </div>

          <div className="section__add-text">
            <Btn mod="is-orange" onClick={this.openTextArea}>Upload text</Btn>
            <p className="section__descr">
              E-mails, blog entrys, etc
            </p>
            {
              this.state.showTextArea &&
               <div>
                 <SelectField mod="i-mt-27 i-mb-40" options={options} />

                 <TextField mod="i-mt-19" rows="18" name="text" placeholder="This is a dummy text"
                            onChange={this.wordCounter}/>
               </div>
            }
          </div>

          <div className="see-result">
            <div className="see-result__line"></div>
            <InfoMeter wordCount={this.state.wordCount + this.state.textInputWc} />
          {}

            {
              this.renderValidationErrors()
            }
            <Btn onClick={this.submitData}
                 disable={this.state.validationErrors.length > 0}
                 mod="is-big is-block">
              See My Results
            </Btn>
            <p className="section__descr">
              By clicking Analyze, you agree to Mindmetrics <a href="#">Terms</a> and <a href="#">Privacy</a>
            </p>
          </div>
        </section>
      </Layout>
    );
  }
}
