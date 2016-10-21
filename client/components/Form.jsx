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
  {id: 1, value: 'default', label: 'What is this?'},
  {id: 2, value: 'one', label: 'One'},
  {id: 3, value: 'two', label: 'Two'}
];

export default class Form extends Component {
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
          <TextInput check="true" name="email" title="E-mail:"/>
          <p className="section__separator">
            OR
          </p>
          <AddText/>
          <Btn type="link" href="#" mod="is-big is-violet">Analyse</Btn>
        </section>
      </Layout>
    );
  }
}

class AddText extends Component {
  render() {
    return (
      <div className="add-text">
        <Btn>Upload text</Btn>
        <TextField mod="i-mt-19" rows="18" name="text" title="Text:"/>
        <SelectField mod="i-mt-27 i-mb-40" options={options} />
      </div>
    );
  }
}