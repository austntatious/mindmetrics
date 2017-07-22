import React, { Component } from 'react';

import Nav from './Nav';
import Logo from './Logo';
import Social from './Social';
import Copyright from './Copyright';

const navFoot = [
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
    id: 5,
    text: 'Blog',
    href: '#'
  }
];

export default class Footer extends Component {

  render() {

    return (
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div className="footer__left">
              <Nav arr={navFoot} />
            </div>
            <div className="footer__right is-in-top">
              <Social />
            </div>
          </div>
          <div className="footer__bottom">
            <div className="footer__left">
              <Copyright>
                &reg; MindMetrics Technology - All rights reserved.
              </Copyright>
            </div>
            <div className="footer__right">
              <Logo href="#" src="/client/img/logo_footer.png" />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
