import React, { Component } from 'react';
import Layout from './Layout';
import Title from './Title';
import SocialButtons from './SocialButtons';
import TextInput from './TextInput';
import TextField from './TextField';
import SelectField from './SelectField';
import Btn from './Btn';
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
          <Title size="1">
            Your info
          </Title>
          <p className="section__sub-title">
            Small text Small text Small text
          </p>
          <SocialButtons />
          <TextInput check={this.validateEmail()} name="email" title="E-mail:"
                     onChange={this.setField("email")}/>
          <p className="section__separator">
            OR
          </p>
          <div className="add-text">
            <Btn onClick={this.openTextArea}>Upload text</Btn>
            {this.state.showTextArea && 
             <span>
               <TextField mod="i-mt-19" rows="18" name="text" title="Text:"
                          onChange={this.setField("textInput")}/>
               <SelectField mod="i-mt-27 i-mb-40" options={options} />
             </span>
            }
          </div>
          <Btn type="link" onClick={this.nextPage} mod="is-big is-violet">Analyse</Btn>
        </section>
      </Layout>
    );
  }
}
