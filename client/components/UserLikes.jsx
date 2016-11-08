import React, { Component } from 'react';

import Title from './Title';

export default class UserLikes extends Component {
    static defaultProps = {
           likelyList: ['Item 1', 'Item 2'],
           unlikelyList: ['Item 1']
    }

    render() {
        return (
            <div className="user-likes">
                <div className="user-likes__likes">
                    <Title size="6">
                        You are likely to:
                    </Title>
                    <ul className="user-likes__list">
                        {this.props.likelyList.map((t, i) =>
                            <li className="user-likes__el" key={i}>
                                <span className="user-likes__item">
                                    {t}
                                </span>
                            </li>
                         )}
                    </ul>
                </div>
                <div className="user-likes__unlikes">
                    <Title size="6">
                        You are unlikely to:
                    </Title>
                    <ul className="user-likes__list">
                        {this.props.unlikelyList.map((t, i) =>
                            <li className="user-likes__el" key={i}>
                                <span className="user-likes__item">
                                    {t}
                                </span>
                            </li>
                         )}
                    </ul>
                </div>
            </div>
        );
    }
}
