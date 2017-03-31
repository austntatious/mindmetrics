import React, { Component } from 'react';
import Title from './Title';
import Social from './Social';
import UserLikes from './UserLikes';

export default class User extends Component {

    render() {
        const {ico, name, descr, emphasis, summary, likely, unlikely} = this.props;

        return (
            <div className="user">
                <div className="user__wrap container">
                    <div className="user__left">
                        <div className="user__top">
                            <div className="user__ico">
                                <img src={ico} alt="User photo"/>
                            </div>
                            <div className="user__details">
                                <div className="user__name">
                                    {name}
                                </div>
                                <div className="user__descr">
                                    {descr}
                                    <span className="user__emphasis">
                                        {emphasis}
                                    </span>
                                </div>
                                <Social />
                            </div>
                        </div>
                        <div className="user__bottom">
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
                                The scores you see are all percentiles. They are comparing one person to a broader population.
                                For example, a 90% on Extraversion does not mean that the person is 90% extroverted.
                                It means that for that single trait, the person is more extroverted than 90% of the people in the population.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
