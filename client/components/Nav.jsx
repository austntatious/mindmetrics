import React, { Component } from 'react';

class NavEl extends Component {

    render() {
        let href = this.props.href;

        return (
            <li className="nav__el">
                <a className="nav__link" href={href}>
                    {this.props.children}
                </a>
            </li>
        );
    }
}

export default class Nav extends Component {
    static contextTypes = {
        mobile: React.PropTypes.bool
    }    

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

        if (mod) {
            cls += ' ' + mod.split(' ').map(function (x) {
                return x;
            }).join(' ');
        }

        return (
            <nav className={cls}>
                <ul className="nav__list">
                    {arr}
                </ul>
            </nav>
        );
    }
}
