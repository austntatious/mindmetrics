import React, { Component } from 'react';

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
                <a className="logo__link" href={href}>
                    <img className="logo__img" src={src} />
                </a>
            </div>
        );
    }
}
