import React, { Component } from 'react';
import Btn from './Btn';
import Icon from './Icon';

export default class SocialButtons extends Component {

  render() {

    return (
      <div className="social-buttons">
        <SocialButtonsEl mod="is-social is-facebook" connect="true">
          <Icon ico="is-fb" />
          Conntect Facebook
        </SocialButtonsEl>
        <SocialButtonsEl mod="is-social is-twitter" connect="true">
          <Icon ico="is-tw" />
          Conntect Twitter
        </SocialButtonsEl>
      </div>
    );
  }
}

class SocialButtonsEl extends Component {

  render() {
    const {mod, connect} = this.props;
    let mark = <span className="mark"><i className="ico is-check-mark"></i></span>;

    return (

      <div className="social-buttons__el">
        <Btn mod={mod}>
          {this.props.children}
        </Btn>
      </div>
    );
  }
}

