import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Btn extends Component {

    render() {
        const {mod, type, href, onClick, onTouchTap} = this.props;
        let cls = 'btn';

        if (mod) {
            cls += ' ' + mod.split(' ').map(function (x) {
                return x;
            }).join(' ');
        }

        return (
            type === 'link' ?
            <Link className={cls} href={href} onClick={onClick} onTouchTap={onTouchTap} to={this.props.to}>
                {this.props.children}
            </Link>
            :
            <span className={cls} onClick={onClick} onTouchTap={onTouchTap}>
                {this.props.children}
            </span>
        );
    }
}
