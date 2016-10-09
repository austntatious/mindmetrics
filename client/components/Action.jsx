import React, { Component } from 'react';

import Btn from './Btn';

export default class Action extends Component {

    render() {
        let href = this.props.href;

        return (
            this.props.mobile ?
            <div className="action">
                <Btn type="link" href="#" mod="is-orange">
                    Go premium
                </Btn>
            </div>
            :
            <div className="action">
                <Btn type="link" href="#" mod="is-orange">
                    Take test
                </Btn>
                <Btn type="link" href="#" mod="is-fb" />
            </div>
        );
    }
}
