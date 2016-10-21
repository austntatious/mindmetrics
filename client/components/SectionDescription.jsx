import React, { Component } from 'react';
import Title from './Title';

export default class SectionDescription extends Component {
  render() {
    const {mod, title, text, href, linkColor} = this.props;
    let cls = 'section-descr';

    if (mod) {
      cls += ' ' + mod.split(' ').map(function (x) {
          return x;
        }).join(' ');
    }

    return (
      <div className={cls}>
        <Title size="2">
          {title}
        </Title>
        <p className="section-descr__text">
          {text}
        </p>
        {linkColor === 'is-orange' ?
          <a href={href} className="section-descr__link is-orange">
            Try it out >
          </a>
          :
          <a href={href} className="section-descr__link">
            Find our more >
          </a>}
      </div>
    );
  }
}