import React, { Component } from 'react';
import Title from './Title';

export default class SectionDescription extends Component {
  render() {
    let title = this.props.title,
        text = this.props.text,
        href = this.props.href,
        linkColor = this.props.linkcolor;

    return (
      <div className="section-descr">
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