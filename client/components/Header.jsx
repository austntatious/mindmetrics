import React, { Component } from 'react';

import Hamburger from './Hamburger';
import Nav from './Nav';
import Logo from './Logo';
import Action from './Action';

const navTop = [
  {
    id: 1,
    text: 'Home',
    href: '#'
  },
  {
    id: 2,
    text: 'How it works',
    href: '#'
  },
  {
    id: 3,
    text: 'Blog',
    href: '#'
  },
  {
    id: 4,
    text: 'Research',
    href: '#'
  },
  {
    id: 5,
    text: 'Contact',
    href: '#'
  }
];

export default class Header extends Component {
  static contextTypes = {
    mobile: React.PropTypes.bool
  };

  render() {

    return (
      <header className="header">
        <div className="header__wrap container">
          <div className="header__left">
            {this.context.mobile && <Hamburger />}
            <Logo mod="is-head-logo" href="#" src="/client/img/logo.png" />
          </div>
          <div className="header__right">
            <Nav mod="is-head-nav" arr={navTop}/>
            <Action />
          </div>
        </div>
      </header>
    );
  }
}
