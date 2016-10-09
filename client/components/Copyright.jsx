import React, { Component } from 'react';

export default class Copyright extends Component {

    render() {

        return (
            <div className="copyright">
                {this.props.children}
            </div>
        );
    }
}
