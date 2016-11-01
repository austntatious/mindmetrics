import React, { Component } from 'react';

import Btn from './Btn';

export default class Action extends Component {

    render() {
        let href = this.props.href;

        return (
            <div className="action">
                <Btn type="link" href="#" mod="is-orange">
                    Take test
                </Btn>
                <Btn type="link" href="#" mod="is-fb" />
            </div>
        );
    }
}
