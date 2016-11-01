import React, { Component } from 'react';

import Btn from './Btn';

export default class FreeAnalysis extends Component {

    render() {

        return (
            <div className="free-analysis">
                 <Btn type="link" href="#" mod="is-big is-violet">
                     Get free analysis
                 </Btn>
            </div>
        );
    }
}
