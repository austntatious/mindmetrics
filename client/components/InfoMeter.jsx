import React, { Component } from 'react';

export default class InfoMeter extends Component {

  render() {
    const proc = this.props.proc;

    return (
      <div className="info-meter">
        <div className="info-meter__text">
          399 / 1000 - Connect more stuff, dude!
        </div>
        <div className="info-meter__scale">
          {
            proc <= 20 ?
              <div className="info-meter__scale">
                <div className="info-meter__percent is-twenty"></div>
              </div>
            : proc <= 40 ?
              <div className="info-meter__scale">
                <div className="info-meter__percent is-twenty"></div>
                <div className="info-meter__percent is-forty"></div>
              </div>
            : proc <= 60 ?
              <div className="info-meter__scale">
                <div className="info-meter__percent is-twenty"></div>
                <div className="info-meter__percent is-forty"></div>
                <div className="info-meter__percent is-sixty"></div>
              </div>
            : proc <= 80 ?
              <div className="info-meter__scale">
                <div className="info-meter__percent is-twenty"></div>
                <div className="info-meter__percent is-forty"></div>
                <div className="info-meter__percent is-sixty"></div>
                <div className="info-meter__percent is-eighty"></div>
              </div>
            : proc <= 100 ?
              <div className="info-meter__scale">
                <div className="info-meter__percent is-twenty"></div>
                <div className="info-meter__percent is-forty"></div>
                <div className="info-meter__percent is-sixty"></div>
                <div className="info-meter__percent is-eighty"></div>
                <div className="info-meter__percent is-hundred"></div>
              </div>
            : null
          }
        </div>
      </div>
    );
  }
}
