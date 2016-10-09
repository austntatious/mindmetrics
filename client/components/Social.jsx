import React, { Component } from 'react';

import Icon from './Icon';

export default class Social extends Component {

    render() {
        let href = this.props.href,
            src = this.props.src;

        return (
            <div className="social">
                <ul className="social__list">
                    <li className="social__el">
                        <a href="#" className="social__link">
                            <Icon ico="is-fb" />
                        </a>
                    </li>
                    <li className="social__el">
                        <a href="#" className="social__link">
                            <Icon ico="is-tw" />
                        </a>
                    </li>
                    <li className="social__el">
                        <a href="#" className="social__link">
                            <Icon ico="is-g" />
                        </a>
                    </li>
                    <li className="social__el">
                        <a href="#" className="social__link">
                            <Icon ico="is-in" />
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}
