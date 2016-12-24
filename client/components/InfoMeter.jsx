import React, { Component } from 'react';

export default class InfoMeter extends Component {

  render() {
    const METER_GRADES = { one: 200, two: 400, three: 600, four: 800, five: 1000 };

    const textValue = this.props.textValue;
    let wordsCount = textValue.split(' ').length;

    return (
      <div className="info-meter">
        <div className="info-meter__text">
          <span>{wordsCount}</span> / 1000 - Connect more stuff, dude!
        </div>
        <div className="info-meter__scale">
          {
            wordsCount <= METER_GRADES.one ?
              <div className="info-meter__scale">
                <div className="info-meter__percent is-twenty"></div>
              </div>
            : wordsCount <= METER_GRADES.two ?
              <div className="info-meter__scale">
                <div className="info-meter__percent is-forty"></div>
                <div className="info-meter__percent is-forty"></div>
              </div>
            : wordsCount <= METER_GRADES.three ?
              <div className="info-meter__scale">
                <div className="info-meter__percent is-sixty"></div>
                <div className="info-meter__percent is-sixty"></div>
                <div className="info-meter__percent is-sixty"></div>
              </div>
            : wordsCount <= METER_GRADES.four ?
              <div className="info-meter__scale">
                <div className="info-meter__percent is-eighty"></div>
                <div className="info-meter__percent is-eighty"></div>
                <div className="info-meter__percent is-eighty"></div>
                <div className="info-meter__percent is-eighty"></div>
              </div>
            : wordsCount <= METER_GRADES.five ?
              <div className="info-meter__scale">
                <div className="info-meter__percent is-hundred"></div>
                <div className="info-meter__percent is-hundred"></div>
                <div className="info-meter__percent is-hundred"></div>
                <div className="info-meter__percent is-hundred"></div>
                <div className="info-meter__percent is-hundred"></div>
              </div>
            : null
          }
        </div>
      </div>
    );
  }
}
