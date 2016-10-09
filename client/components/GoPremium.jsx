import React, { Component } from 'react';

import Btn from './Btn';
import Title from './Title';

export default class GoPremium extends Component {

    render() {

        return (
            this.props.mobile ?
            <div className="premium">
                <div className="premium__wrap">
                    <div className="premium__col">
                        <Btn type="link" href="#" mod="is-big is-violet">Get free analysis</Btn>
                    </div>
                    <div className="premium__col">
                        <Btn type="link" href="#" mod="is-big">Go premium</Btn>
                    </div>
                </div>
            </div>
            :
            <div className="premium">
                <div className="premium__wrap">
                    <div className="premium__col">
                        <Title size="3" mod="i-violet-dark i-uppercase">
                            Wait, there is more
                        </Title>
                        <p className="premium__text">
                            Understand your personality so you can make the best life choices.
                            Details on career path, relationships, learning style, etc
                        </p>
                    </div>
                    <div className="premium__col">
                        <Btn type="link" href="#" mod="is-big">Go premium</Btn>
                    </div>
                </div>
            </div>
        );
    }
}
