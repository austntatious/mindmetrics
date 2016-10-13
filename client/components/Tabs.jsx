import React, { Component } from 'react';

export class Tab extends Component {

    render() {
        const {title, onClick, onTouchTap} = this.props;
        let cls = 'tabs__el';
        if (this.props.active) {
            cls += ' ' + 'is-active';
        }

        return (
            <li className={cls} onClick={onClick} onTouchTap={onTouchTap}>
                {title}
            </li>
        );
    }
}

export class TabDescr extends Component {

    render() {
        let text = this.props.text;

        return (
            <div className="tab-descr">
                <p className="tab-descr__text">
                    {text}
                </p>
            </div>
        );
    }
}

export class Tabs extends Component {
    handleChange = (tabId) => {
        return () => {
            this.props.onChange(tabId);
        };
    }

    render() {
        const {active} = this.props;

        let li = this.props.tabs.map((t) => {
            return (
                <Tab key={t.id}
                     active={active === t.id}
                     title={t.title}
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
            </div>
        );
    }
}

