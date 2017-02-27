import React, { Component } from 'react';

const METER_GRADES = { one: 100, two: 300, three: 600, four: 1200, five: 3000 };

export default class InfoMeter extends Component {

  render() {

    let wordCount = this.props.wordCount;

    return (
      <div className="info-meter">
        <div className="info-meter__text">
          <span>{wordCount} words detected - </span>
          {
            wordCount <= METER_GRADES.two ?
              "Very Weak Analysis"
            : (wordCount > METER_GRADES.two) && (wordCount <= METER_GRADES.three) ?
              "Weak Analysis"
            : (wordCount > METER_GRADES.three) && (wordCount <= METER_GRADES.four) ?
              "OK Analysis"
            : (wordCount > METER_GRADES.four) && (wordCount <= METER_GRADES.five) ?
              "Strong Analysis"
            : wordCount > METER_GRADES.five ?
              "Very Strong Analysis"
            : null
          }
        </div>
        <div className="info-meter__scale">
          {
            wordCount <= METER_GRADES.two ?
              <div className="info-meter__scale">
                <div className="info-meter__percent is-twenty"></div>
              </div>
            : wordCount <= METER_GRADES.three ?
              <div className="info-meter__scale">
                <div className="info-meter__percent is-forty"></div>
                <div className="info-meter__percent is-forty"></div>
              </div>
            : wordCount <= METER_GRADES.four ?
              <div className="info-meter__scale">
                <div className="info-meter__percent is-sixty"></div>
                <div className="info-meter__percent is-sixty"></div>
                <div className="info-meter__percent is-sixty"></div>
              </div>
            : wordCount <= METER_GRADES.five ?
              <div className="info-meter__scale">
                <div className="info-meter__percent is-eighty"></div>
                <div className="info-meter__percent is-eighty"></div>
                <div className="info-meter__percent is-eighty"></div>
                <div className="info-meter__percent is-eighty"></div>
              </div>
            : wordCount > METER_GRADES.five ?
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
