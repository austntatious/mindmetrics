import React, { Component } from 'react';

import Title from './Title';
import Social from './Social';

export default class SectionHat extends Component {

    render() {
        let title = this.props.title,
            descr = this.props.descr,
            span = this.props.span;

        return (
            <div className="section-hat">
                <Title size="1">
                    {title}
                </Title>
                <div className="section-hat__descr">
                    {descr ? <span>{descr}</span> : null}
                    {span ? <span className="i-violet">{span}</span> : null}
                </div>
                <Social />
            </div>
        );
    }
}
