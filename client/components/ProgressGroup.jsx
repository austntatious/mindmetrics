import React, { Component } from 'react';
import DetailsProgress from './DetailsProgress';

const detRep = [
  {
    id: 1,
    trait: 'Agreeableness',
    percent: 42,
    color: 'is-red'
  },
  {
    id: 2,
    trait: 'Extraversion',
    percent: 63,
    color: 'is-violet'

  },
  {
    id: 3,
    trait: 'Conscientiousness',
    percent: 71,
    color: 'is-orange'
  }
];

export default class ProgressGroup extends Component {

  render() {
    let arr = detRep.map(function (d) {
      return(
        <DetailsProgress key={d.id}
                         trait={d.trait}
                         percent={d.percent}
                         color={d.color}
          />
      )
    });

    return (
      <div className="progress-group">
        <ul className="progress-group__list">
          {arr}
        </ul>
      </div>
    );
  }
}