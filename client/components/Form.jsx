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
var _ = require("lodash");

let options = [
  {id: 1, value: 'default', label: 'Blog'},
  {id: 2, value: 'one', label: 'Essay'},
];

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class Form extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  state = {
    showTextArea: false,
    email: "",
    firstName: "",
    lastName: "",
    wordCount: 0,
    twitterState: 0,
    textInputWc: 0,
    uuid: 0,

    // 0 is default, 1 is loading, 2 is loaded
    connections: {
      facebook: {
        name: 'facebook',
        title: 'Facebook',
        icon: 'is-fb',
        status: 0
      },
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

    // todo: Component currently assumes that users are not connected with their SM accounts when component loads first.
    //  Update connections in the state with the user's associated connection statuses

    // register the POST function that will fire on Oauth window close
    const fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");

    const httpOptions = {
      method: "POST",
      headers: fetchHeaders,
      mode: "cors"
    };

    // child window should pass Tokens into this function so that parent can send POST
    window.sendPost = function(token, verifier, target) {
      const fetchReq = new Request("/api/data" + "?oauth_token=" + token + "&oauth_verifier=" + verifier, httpOptions);
      window.fetch(fetchReq, httpOptions)
        .then(function(res) {
          res.json().then(function(data) {
            console.log("response from POST: ", data);
            var newState = _.extend({}, self.state);
            newState.wordCount = data["wordCount"];
            newState.uuid = data["uuid"];
            newState.connections[target].status = 2;

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
      // set social button state to "loading"
    }
  }


  openTextArea = () => {
    this.setState({showTextArea: true});
  }

  setField = (name) => {
    return (e) => {
        let s = e.target.value;
        s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
        s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
        s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
        let wc = s.split(' ').length
        this.setState({
          [name]: wc
        });
    };
  }

  onConnect = (connection) => {
    // only continue if status is unconnected (0)
    if (connection.status != 0) return;

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

    // todo: set it to 2, once loaded

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

  onConnectFacebook = (connection) => {
    console.log(connection)
  }

  // TODO: edit this so that on submit, loading state immediately overlays over screen
  // on error, flash to screen. on success, move page to results
  submitData = () => {
    const {email, textInput} = this.state;
    let userData = {email, textInput};
    const fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");

    const httpOptions = {
      method: "POST",
      headers: fetchHeaders,
      mode: "cors",
      body: JSON.stringify(userData)
    };

    const fetchReq = new Request("/api/submit", httpOptions);
    fetch(fetchReq, httpOptions)
      .then((response) => {
        response.json().then((data) => {
          let id = data.uuid;
          this.context.router.push({
            pathname: "/user/" + id,
            query: null,
            state: null
          }, function (err) {
            console.log("error", err);
          });
        }).catch(function (err) {
          console.log("FETCH ERROR", err);
        });
      });
  }

  validateEmail = () => {
    return EMAIL_REGEX.test(this.state.email);
  }

  render() {
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
            <TextInput check={this.validateEmail()} name="email" placeholder="name@example.com"
                       onChange={this.setField("email")}/>

            <div className="input-group">
              <TextInput mod="is-small" name="first name" placeholder="First name"/>
              <TextInput mod="is-small" name="last name" placeholder="Last name"/>
            </div>
          </div>

          <div className="section__data">
            <Title size="3">
              Data
            </Title>
            <SocialButtons connections={this.state.connections} onConnect={this.onConnect} />
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
                            onChange={this.setField("textInputWc")}/>
               </div>
            }
          </div>

          <div className="see-result">
            <div className="see-result__line"></div>
            <InfoMeter wordCount={this.state.wordCount + this.state.textInputWc} />
            <Btn type="link" onClick={this.submitData} mod="is-big is-block">See My Results</Btn>
            <p className="section__descr">
              By clicking Analyze, you agree to Mindmetrics <a href="#">Terms</a> and <a href="#">Privacy</a>
            </p>
          </div>
        </section>
      </Layout>
    );
  }
}
