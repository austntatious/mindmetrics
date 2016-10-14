import React, { Component } from 'react';
import Progress from './Progress';

export default class DetailsProgress extends Component {

  render() {
    let trait = this.props.trait,
        percent = this.props.percent,
        color = this.props.color;

    return (
      <li className="progress-group__el">
        <div className="details-progress">
          <p className="details-progress__text">
            <span className="details-progress__trait">
              {trait}
            </span>
            <span className="details-progress__percent">
              {percent}%
            </span>
          </p>
          <Progress mod={color + ' is-big is-shadow'}>
            {percent}
          </Progress>
          <span className="details-progress__pointer"></span>
        </div>
      </li>
    );
  }
}