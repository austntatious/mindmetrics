import React, { Component } from 'react';

export default class MobileMenu extends Component {

  render() {
    let cls = 'nav',
      mod = this.props.mod,
      arr = this.props.arr.map(function (n) {
        return (
          <NavEl key={n.id} href={n.href}>
            {n.text}
          </NavEl>
        )
      });

    return (
      this.context.mobile &&
        <div className="mobile-menu">
          <nav className={cls}>
            <ul className="nav__list">
              {arr}
            </ul>
          </nav>
        </div>
    );
  }
}
