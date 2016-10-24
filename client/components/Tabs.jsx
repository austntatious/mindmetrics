import React, { Component } from 'react';

export class Tab extends Component {
  static contextTypes = {
    mobile: React.PropTypes.bool
  };

  render() {
    const {title, text, onClick, onTouchTap} = this.props;
    let cls = 'tabs__el';
    if (this.props.active) {
      cls += ' ' + 'is-active';
    }

    return (
      <li className={cls} onClick={onClick} onTouchTap={onTouchTap}>
        <div className="tabs__title">
          {title}
        </div>
        {
          this.context.mobile === "small" &&
          <div className="tabs__descr">
            <p className="tabs__text">
              {text}
            </p>
          </div>
        }
      </li>

    );
  }
}

export class Tabs extends Component {
  static contextTypes = {
    mobile: React.PropTypes.bool
  };

  handleChange = (tabId) => {
    return () => {
      this.props.onChange(tabId);
    };
  };

  render() {
    const {active} = this.props;
    const activeTab = this.props.tabs.find((t) => t.id === active );

    let li = this.props.tabs.map((t) => {
      return (
        <Tab key={t.id}
             active={active === t.id}
             title={t.title}
             text={t.descr}
             onClick={this.handleChange(t.id)}
             onTouchTap={this.handleChange(t.id)}
          />

      );
    });

    return (

        <div className="tabs">
          <ul className="tabs__list">
            {li}
          </ul>
          {
            this.context.mobile !== "small" &&
            <div className="tabs__descr">
              <p className="tabs__text">
                {activeTab.descr}
              </p>
            </div>
          }
        </div>
    );
  }
}

