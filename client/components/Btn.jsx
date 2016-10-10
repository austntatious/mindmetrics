import React, { Component } from 'react';

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
            <a className={cls} href={href} onClick={onClick} onTouchTap={onTouchTap}>
                {this.props.children}
            </a>
            :
            <span className={cls} onClick={onClick} onTouchTap={onTouchTap}>
                {this.props.children}
            </span>
        );
    }
}
