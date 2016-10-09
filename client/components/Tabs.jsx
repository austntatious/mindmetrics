import React, { Component } from 'react';

export class Tab extends Component {

    render() {
        let title = this.props.title;
        let cls = 'tabs__el';
        if (this.props.active) {
            cls += ' ' + 'is-active';
        }

        return (
            <li className={cls}>
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

    render() {
        let li = this.props.tabs.map((t) => {
            return (
                <Tab key={t.id}
                     active={this.props.active === t.id}
                     title={t.title} />
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

