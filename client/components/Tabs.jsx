import React, { Component } from 'react';

export class Tab extends Component {
  static contextTypes = {
    mobile: React.PropTypes.oneOf(['small', 'tablet', false])
  };

  render() {
    const {title, ico, text, onClick, onTouchTap, color, active} = this.props;
    let cls = 'tabs__el';
    if (active) {
      cls += ' ' + 'is-active';
    }

    return (
      <li className={cls}
          onClick={onClick}
          style={active ? {borderColor: color} : {}}
          onTouchTap={onTouchTap}>
          {
            this.context.mobile === 'small'
            ?
            <div className="tabs__ico">
              <img className="tabs__img" src={ico} alt="ico"/>
            </div>
            :
            <div className="tabs__title">
              {title}
            </div>
          }

      </li>

    );
  }
}

export class Tabs extends Component {
  static contextTypes = {
    mobile: React.PropTypes.oneOf(['small', 'tablet', false])
  };

  handleChange = (tabId) => {
    return () => {
      this.props.onChange(tabId);
    };
  };

  render() {
    const {active, colors} = this.props;
    const activeTab = this.props.tabs.find((t) => t.id === active );

    let li = this.props.tabs.map((t, i) => {
      return (
        <Tab key={t.id}
             active={active === t.id}
             title={t.title}
             ico={t.ico}
             color={colors(i + 1)}
             text={t.descr}
             onClick={this.handleChange(t.id)}
             onTouchTap={this.handleChange(t.id)}
          />

      );
    });

    return (
        <div className="tabs">
          <ul className="tabs__list container">
            {li}
          </ul>
          <div className="tabs__descr">
            <p className="tabs__text">
              {activeTab.descr}
            </p>
          </div>
        </div>
    );
  }
}

