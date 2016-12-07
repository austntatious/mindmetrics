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
    textInput: ""
  }

  openTextArea = () => {
    this.setState({showTextArea: true});
  }

  setField = (name) => {
    return (e) => {
      this.setState({[name]: e.target.value});
    };
  }

  nextPage = () => {
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

    const fetchReq = new Request("/submit", httpOptions);
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
              Your info
            </Title>
            <p className="section__sub-title">
              Small text Small text Small text
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
            <SocialButtons />
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
                 <div className="see-result">
                   <div className="see-result__line"></div>
                   <InfoMeter proc="97"/>
                   <Btn type="link" onClick={this.nextPage} mod="is-big is-block">See My Results</Btn>
                   <p className="section__descr">
                     By clicking Analyze, you agree to Mindmetrics Terms and Privacy Policy
                   </p>
                 </div>

                 <div className="section__separator">
                   <span>
                     OR
                   </span>
                 </div>
                 <SelectField mod="i-mt-27 i-mb-40" options={options} />

                 <TextField mod="i-mt-19" rows="18" name="text" placeholder="This is a dummy text"
                            onChange={this.setField("textInput")}/>
               </div>
            }
          </div>

          <div className="see-result">
            <div className="see-result__line"></div>
            <InfoMeter proc="97"/>
            <Btn type="link" onClick={this.nextPage} mod="is-big is-block">See My Results</Btn>
            <p className="section__descr">
              By clicking Analyze, you agree to Mindmetrics Terms and Privacy Policy
            </p>
          </div>
        </section>
      </Layout>
    );
  }
}
