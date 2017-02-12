import React, { Component } from 'react';
import Btn from './Btn';
import Icon from './Icon';
const _           = require("lodash");

export default class SocialButtons extends Component {
  render() {
    var connections = this.props.connections;

    var connectionButtonMap = {
      0: 'Connect to %sm%',
      1: 'Connecting to %sm%...',
      2: 'Connected to %sm%'
    };


    return (
      <div className="social-buttons" style={{width:'100%'}}>
        {
          _.map(connections, (c) => {
            return (
              <div className={'social-button social-' + c.name + ' social-status-' + c.status} key={Math.random()}>
                <SocialButtonsEl mod={'is-social is-' + c.name + ' status-' + c.status} onClick={this.props.onConnect.bind(null, c)}>
                  <Icon ico={c.icon} />
                  {connectionButtonMap[c.status].replace('%sm%', c.title)}
                </SocialButtonsEl>
              </div>
            )
          })
        }
      </div>
    );
  }
}

class SocialButtonsEl extends Component {

  render() {
    const {mod, connect} = this.props;

    return (

      <div className="social-buttons__el">
        <Btn mod={mod} onClick={this.props.onClick}>
          {this.props.children}
        </Btn>
      </div>
    );
  }
}
