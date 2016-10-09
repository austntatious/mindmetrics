import React, { Component } from 'react';

export default class User extends Component {

    render() {
        let ico = this.props.ico,
            name = this.props.name;

        return (
            <div className="user">
                <div className="user__ico">
                    <img src={ico} alt="User photo"/>
                </div>
                <span className="user__name">
                    {name}
                </span>
            </div>
        );
    }
}
