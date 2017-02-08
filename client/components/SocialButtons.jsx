import React, { Component } from 'react';
import Btn from './Btn';
import Icon from './Icon';
const _           = require("lodash");

export default class SocialButtons extends Component {

  render() {
    // todo: add Facebook to connectStatus state/props
    var connectStatus = this.props.connectStatus;
    var connections = this.props.connections || [
      {
        name: 'Facebook',
        icon: 'is-fb',
        status: 0
      },
      {
        name: 'Twitter',
        icon: 'is-tw',
        status: connectStatus
      },
    ];

    var connectionButtonMap = {
      0: 'Connect to %sm%',
      1: 'Connecting to %sm%...',
      2: 'Connected to %sm%'
    };


    return (
      <div className="social-buttons" style={{width:'100%'}}>
        {
          _.map(connections, (c, i) => {
            return (
              <div className={'social-button social-' + c.name.toLowerCase() + ' social-status-' + c.status} key={i} style={{}}>
                <SocialButtonsEl mod={'is-social is-' + c.name.toLowerCase() + ' status-' + c.status} onClick={this.props.onClick}>
                  <Icon ico={c.icon} />
                  {connectionButtonMap[c.status].replace('%sm%', c.name)}
                </SocialButtonsEl>
                {
                  // <div className="clearfix">
                  //   <div style={{marginBottom: 15}}>
                  //     {connectionHeaderMap[c.status]} to {c.name} <br/>
                  //     {
                  //       // <p>Your {c.name} friends have become part of your network on MindMetrics. We will never post to {c.name} or message your friends without your permission.</p>
                  //     }
                  //   </div>
                  //   <div style={{}}>
                  //     {
                  //       {
                  //         0: (
                  //
                  //         ),
                  //         2: (
                  //           <span className={'is-social is-connected is-' + c.name.toLowerCase()}>
                  //             {connectionButtonMap[c.status]} to {c.name}
                  //           </span>
                  //         )
                  //       }[c.status]
                  //
                  //     }
                  //
                  //   </div>
                  // </div>
                }
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
