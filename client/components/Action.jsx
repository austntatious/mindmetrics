import React, { Component } from 'react';

import Btn from './Btn';

export default class Action extends Component {

    render() {
        const { href } = this.props;

        return (
            <div className="action">
                <Btn type="link" href={href} mod="is-small">
                    Take test
                </Btn>
            </div>
        );
    }
}
