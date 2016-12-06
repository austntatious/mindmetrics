import React, { Component } from 'react';
import Btn from './Btn';

export default class SocialButtons extends Component {

  render() {

    return (
      <div className="social-buttons">
        <SocialButtonsEl mod="is-social is-facebook" check="true">
          Connect Facebook
        </SocialButtonsEl>
        <SocialButtonsEl mod="is-social is-twitter" check="true">
          Connect Twitter
        </SocialButtonsEl>
      </div>
    );
  }
}

class SocialButtonsEl extends Component {

  render() {
    const {mod, check} = this.props;
    let mark = <span className="mark"><i className="ico is-check-mark"></i></span>;

    return (

      <div className="social-buttons__el">
        <Btn mod={mod}>
          {this.props.children}
        </Btn>
        { check && mark }
      </div>
    );
  }
}

