import React, { Component } from 'react';

export default class Icon extends Component {

    render() {
        let cls = 'ico',
            ico = this.props.ico;

        return (
            <i className={ico ? cls + ' ' + ico : cls}></i>
        );
    }
}
