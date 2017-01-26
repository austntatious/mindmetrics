import React, { Component } from 'react';
import Btn from './Btn';
import Icon from './Icon';
const _           = require("lodash");

export default class SocialButtons extends Component {

  render() {
    var connections = [
      {
        name: 'Facebook',
        icon: 'is-fb',
        status: [0,1,2][0]
      },
      {
        name: 'Twitter',
        icon: 'is-tw',
        status: [0,1,2][2]
      }
    ];

    var connectionButtonMap = {
      0: 'Connect',
      1: 'Connecting',
      2: 'Connected'
    };


    return (
      <div className="social-buttons" style={{width:'100%'}}>
        {
          _.map(connections, (c, i) => {
            return (
              <div className="social-button" key={i} style={{paddingBottom: 30, marginBottom:30}}>
                <SocialButtonsEl mod={'is-social is-' + c.name.toLowerCase() + ' status-' + c.status}>
                  <Icon ico={c.icon} />
                  {connectionButtonMap[c.status]} to {c.name}
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
        {
          // <div className="social-button">
          // </div>
          // <SocialButtonsEl mod="is-social is-facebook" connect="true">
          //   <Icon ico="is-fb" />
          //   Conntect Facebook
          // </SocialButtonsEl>
          // <SocialButtonsEl mod="is-social is-twitter" connect="true">
          //   <Icon ico="is-tw" />
          //   Conntect Twitter
          // </SocialButtonsEl>
        }
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
