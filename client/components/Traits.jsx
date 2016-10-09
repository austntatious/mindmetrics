import React, { Component } from 'react';

import Btn from './Btn';
import Title from './Title';
import Progress from './Progress';

class Trait extends Component{

    render() {

        return (
            <div className="trait">
                <div className="trait__wrap container">
                    <div className="trait__left">
                        <span className="trait__num">
                            {this.props.id}
                        </span>
                        <Title size="4">
                            {this.props.title}
                        </Title>

                        <p className="trait__text">
                            {this.props.text}
                        </p>
                    </div>
                    <div className="trait__right">
                        <Progress>
                            {this.props.percent}
                        </Progress>
                    </div>
                    <div className="trait__details">
                        <div className="trait__row">
                            <span className="trait__descr">
                                {this.props.det1}
                            </span>
                            <Progress mod="is-small">
                                {this.props.percent}
                            </Progress>
                        </div>
                        <div className="trait__row">
                            <span className="trait__descr">
                                {this.props.det2}
                            </span>
                            <Progress mod="is-small">
                                {this.props.percent}
                            </Progress>
                        </div>
                        <div className="trait__row">
                            <span className="trait__descr">
                                {this.props.det3}
                            </span>
                            <Progress mod="is-small">
                                {this.props.percent}
                            </Progress>
                        </div>
                        <div className="trait__row">
                            <span className="trait__descr">
                                {this.props.det4}
                            </span>
                            <Progress mod="is-small">
                                {this.props.percent}
                            </Progress>
                        </div>
                        <div className="trait__row">
                            <span className="trait__descr">
                                {this.props.det5}
                            </span>
                            <Progress mod="is-small">
                                {this.props.percent}
                            </Progress>
                        </div>
                    </div>
                    {
                        this.props.mobile ?
                        <Btn mod="is-plus"></Btn>
                        :
                        <Btn>Details ></Btn>
                    }
                </div>
            </div>
        );
    }
}

export default class Traits extends Component {

    render() {
        let traits = this.props.list.map(function (i) {
            return (
                <Trait id={i.id}
                       key={i.id}
                       title={i.title}
                       text={i.text}
                       percent={i.percent}
                       det1={i.det1}
                       det2={i.det2}
                       det3={i.det3}
                       det4={i.det4}
                       det5={i.det5}/>
            );
        });

        return (
            <div className="traits">
                {traits}
            </div>
        );
    }
}
