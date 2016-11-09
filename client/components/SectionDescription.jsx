import React, { Component } from 'react';
import Title from './Title';
import Icon from "./Icon";
import Btn from "./Btn";

export default class SectionDescription extends Component {
  static contextTypes = {
    mobile: React.PropTypes.oneOf(['small', 'tablet', false])
  };

  render() {
    const {mod, title, titleMobile, ico, text, href, linkColor} = this.props;
    let cls = 'section-descr';

    if (mod) {
      cls += ' ' + mod.split(' ').map(function (x) {
          return x;
        }).join(' ');
    }

    return (
      <div className={cls}>
        {this.context.mobile === 'small' && ico ?
            <div className="section-descr__ico">
              <Icon ico={ico} />
            </div>
          :
            null}
        <Title size="2">
          {this.context.mobile === 'small' ? titleMobile : title}
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

        {this.context.mobile === 'small' ? <Btn mod="is-plus-small"></Btn> : null}
      </div>
    );
  }
}