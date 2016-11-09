import React, { Component } from 'react';
import Title from './Title';
import UserLikes from './UserLikes';

export default class User extends Component {

    render() {
        const {ico, name, descr, summary, likely, unlikely} = this.props;

        return (
            <div className="user container">
                <div className="user__left">
                    <div className="user__ico">
                        <img src={ico} alt="User photo"/>
                    </div>
                    <div className="user__details">
                        <div className="user__name">
                            {name}
                        </div>
                        <div className="user__descr">
                            {descr}
                        </div>
                        <div className="user__status">
                            You are:&nbsp;
                        <span className="user__status-text">
                            {summary}
                        </span>
                        </div>
                        <UserLikes likelyList={likely} unlikelyList={unlikely} />
                    </div>
                </div>
                <div className="user__right">
                    <div className="how-to-read">
                        <span className="how-to-read__ico"></span>
                        <Title size="5">
                            How to read this report?
                        </Title>

                        <p className="how-to-read__text">
                            This is the graph representation of your peThis is the graph representation of your pe
                            This is the graph representation of your pe This is the graph representation of your pe
                            This is the graph representation of your pe This is the graph representation of your pe
                        </p>
                    </div>
                </div>

            </div>
        );
    }
}
