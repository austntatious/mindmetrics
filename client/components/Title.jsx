import React, { Component } from 'react';

export default class Title extends Component{

    render() {
        const {mod, size} = this.props;
        let cls = 'title',
            text = this.props.children;

        if (mod) {
            cls += ' ' + mod.split(' ').map(function (x) {
                return x;
            }).join(' ');
        }

        return (
            <div className={cls}>
                {size === '1' ?
                 <h1>{text}</h1>
                 : size === '2' ?
                 <h2>{text}</h2>
                 : size === '3' ?
                 <h3>{text}</h3>
                 : size === '4' ?
                 <h4>{text}</h4>
                 : size === '5' ?
                 <h5>{text}</h5>
                 : size === '6' ?
                 <h6>{text}</h6>
                 : null
                }
            </div>
        );
    }
}
