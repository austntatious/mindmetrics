import React, { Component } from 'react';
import classnames from 'classnames'

import Btn from './Btn';
import Title from './Title';
import Progress from './Progress';

import traitDescriptions from '../trait-descriptions';


class Trait extends Component{
  static defaultProps = {
    text: "This is the graph representation of your personality traits, values, and needs."
  }

  static contextTypes = {
    mobile: React.PropTypes.oneOf(['small', 'tablet', false])
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

  getText = () => {
    const {name, percentage} = this.props;

    let description = traitDescriptions[name];
    if (!description) {
      return this.props.text;
    }

    if (description.higher) {
      description = percentage >= 0.5 ? description.higher : description.lower;
    }

    return description;
  }

  renderDetails = () => {
    if (this.state.open) {
      return (
        <div className="trait__details">

          {this.props.data.children.map((c) => {
             const percentage = this.percentage(c.percentile);

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
    let cls = 'trait';
    if(this.state.open){
      cls += ' ' + 'is-open';
    }

    return (
      <div className={cls}>
        <div className="trait__wrap container">
          <div className="trait__left">
            <span className="trait__num">
              {this.props.id}
            </span>
            <Title size="4">
              {this.props.name}
            </Title>

            <p className="trait__text">
              {this.getText()}
            </p>
          </div>
          <div className="trait__right">
            <Progress width={percentage}>
              {percentage}
            </Progress>
          </div>
          { this.props.data.children ? this.renderDetails() : null }
          { this.props.data.children ?
            this.context.mobile ?
            <Btn onClick={this.toggleOpen} mod="is-plus"></Btn>
            :
            <Btn onClick={this.toggleOpen}>Details ></Btn>
            : null
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
               percentage={t.percentile}
               data={t} />
      );
    });

    return (
      <div className={classnames("traits", this.props.mod)}>
        {traits}
      </div>
    );
  }
}
