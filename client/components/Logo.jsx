import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Logo extends Component {

  render() {
    let cls = 'logo',
        mod = this.props.mod,
        href = this.props.href,
        src = this.props.src;

    if (mod) {
      cls += ' ' + mod.split(' ').map(function (x) {
        return x;
      }).join(' ');
    }

    return (
      <div className={cls}>
        <Link to="/" className="logo__link">
            <img className="logo__img" src={src} />
        </Link>
      </div>
    );
  }
}
