import React, { Component } from 'react';

import Btn from './Btn';
import Title from './Title';
import Progress from './Progress';

class Trait extends Component{
    static defaultProps = {
        text: "This is the graph representation of your personality traits, values, and needs."
    }

    static contextTypes = {
        mobile: React.PropTypes.bool
    }

    state = {
        open: false
    }

    toggleOpen = () => {
        this.setState({open: !this.state.open});
    }

    percentage = (p) => {
        return (parseFloat(p) * 100).toFixed();
    }

    renderDetails = () => {
        if (this.state.open) {
            return (
                <div className="trait__details">

                    {this.props.data.children.map((c) => {
                         const percentage = this.percentage(c.percentage);

                         return (
                             <div className="trait__row" key={this.props.id + c.name}>
                                 <span className="trait__descr">
                                     {c.name}
                                 </span>
                                 <Progress mod="is-small" width={percentage}>
                                     {percentage}
                                 </Progress>
                             </div>
                         );
                     })}
                </div>
            );
        }
    }

    render() {
        const percentage = this.percentage(this.props.percentage);

        return (
            <div className="trait">
                <div className="trait__wrap container">
                    <div className="trait__left">
                        <span className="trait__num">
                            {this.props.id}
                        </span>
                        <Title size="4">
                            {this.props.name}
                        </Title>

                        <p className="trait__text">
                            {this.props.text}
                        </p>
                    </div>
                    <div className="trait__right">
                        <Progress width={percentage}>
                            {percentage}
                        </Progress>
                    </div>
                    {this.renderDetails()}
                    {
                        this.context.mobile ?
                        <Btn onClick={this.toggleOpen} mod="is-plus"></Btn>
                        :
                        <Btn onClick={this.toggleOpen}>Details ></Btn>
                    }
                </div>
            </div>
        );
    }
}

export default class Traits extends Component {

    render() {
        let traits = this.props.list.map(function (t, i) {
            return (
                <Trait key={i + 1}
                       id={i + 1}
                       name={t.name}
                       text={t.text}
                       percentage={t.percentage}
                       data={t} />
            );
        });

        return (
            <div className="traits">
                {traits}
            </div>
        );
    }
}
