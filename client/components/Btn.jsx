import React, { Component } from 'react';

export default class Btn extends Component {

    render() {
        let cls = 'btn',
            mod = this.props.mod,
            type = this.props.type,
            href = this.props.href;

        if (mod) {
            cls += ' ' + mod.split(' ').map(function (x) {
                return x;
            }).join(' ');
        }

        return (
            type === 'link' ?
            <a className={cls} href={href}>
                {this.props.children}
            </a>
            :
            <span className={cls}>
                {this.props.children}
            </span>
        );
    }
}
