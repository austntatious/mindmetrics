import React, { Component } from 'react';
import classnames from 'classnames';
import Title from './Title';
import Icon from "./Icon";
import Btn from "./Btn";

export default class SectionDescription extends Component {

  state = {
    open: false
  };

  toggleOpen = () => {
    this.setState({open: !this.state.open});
  };

  static contextTypes = {
    mobile: React.PropTypes.oneOf(['small', 'tablet', false])
  };

  componentDidUpdate() {

  }

  render() {
    const { mod, title, titleMobile, ico, text } = this.props;
    const { open } = this.state;
    const { mobile } = this.context;

    let cls = 'section-descr';
    if (mod) {
      cls += ' ' + mod.split(' ').map(function (x) {
          return x;
        }).join(' ');
    }

    const buttonMod = classnames("is-plus-small", {"is-open": open});

    return (
      <div className={cls} ref="myref">
        {(mobile === 'small' && ico) && <div className="section-descr__ico"><Icon ico={ico} /></div>}

        <Title size="2">
          {mobile === 'small' ? titleMobile : title}
        </Title>

        {(mobile !== "small" || open) &&
          <div className="section-descr__item">
            <p className="section-descr__text">
              {text}
            </p>
          </div>}

        {mobile === 'small' && <Btn onClick={this.toggleOpen} mod={buttonMod} />}
      </div>
    );
  }
}
