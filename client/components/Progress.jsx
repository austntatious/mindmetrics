import React, { Component } from 'react';

export default class Progress extends Component {

    render() {
        let cls = 'progress',
            mod = this.props.mod;

        if (mod) {
            cls += ' ' + mod.split(' ').map(function (x) {
                return x;
            }).join(' ');
        }

        return (
            <div className={cls}>
                <div className="progress__line"></div>
                <span className="progress__percent">
                    {this.props.children}%
                </span>
            </div>
        );
    }
}
