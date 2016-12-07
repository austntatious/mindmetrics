import React, { Component } from 'react';

import Btn from './Btn';

export default class FreeAnalysis extends Component {

    render() {

        return (
            <div className="free-analysis">
                <p className="free-analysis__text">
                  Discover who you are.
                </p>
                <Btn type="link" href="#" mod="is-big">
                    Get free analysis
                </Btn>
            </div>
        );
    }
}
