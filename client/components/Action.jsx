import React, { Component } from 'react';

import Btn from './Btn';

export default class Action extends Component {
    static contextTypes = {
        mobile: React.PropTypes.bool
    }    

    render() {
        let href = this.props.href;

        return (
            this.context.mobile ?
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
