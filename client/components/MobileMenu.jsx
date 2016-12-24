import React, { Component } from 'react';
import classnames from 'classnames';
import Nav from './Nav';

const mobileMenuNav = [
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

export default class MobileMenu extends Component {
  render() {
    return (
        <div className={classnames("mobile-menu", {open: this.props.open})}>
          <Nav arr={mobileMenuNav}/>
        </div>
    );
  }
}