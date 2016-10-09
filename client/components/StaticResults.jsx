import React, { Component } from 'react';

require('../styles/app.less');

import Nav from './Nav';
import Social from './Social';
import SectionHat from './SectionHat';
import Logo from './Logo';
import User from './User';
import Action from './Action';
import Hamburger from './Hamburger';
import Copyright from './Copyright';
import GoPremium from './GoPremium';
import BehaviorReport from './BehaviorReport';
import Traits from './Traits';

import {Tabs, TabDescr} from './Tabs';



let mobile;
if (window.matchMedia( '(max-width: 1023px)' ).matches) {
    mobile = true;
}

const USER = { name: 'Your name', ico: '/client/img/user-ico-1.png'};

const TABS = [
    {
        id: 1,
        title: 'Personality',
        descr: 'This is the graph representation of your personality traits, values, and needs. This is the graph representation of your personality traits, values, and needs. This is the graph representation of your personality traits, values, and needs. '
    },
    {
        id: 2,
        title: 'Needs',
        descr: 'This is the graph representation of your personality traits, values, and needs. This is the graph representation of your personality traits, values, and needs. This is the graph representation of your personality traits, values, and needs. '
    },
    {
        id: 3,
        title: 'Values',
        descr: 'This is the graph representation of your personality traits, values, and needs. This is the graph representation of your personality traits, values, and needs. This is the graph representation of your personality traits, values, and needs. '
    }
];

const TRAITS = [
    {
        id: 1,
        title: 'Consideration',
        text: 'This is the graph representation of your personality traits, values, and needs.',
        percent: 63
    },
    {
        id: 2,
        title: 'Consideration',
        text: 'This is the graph representation of your personality traits, values, and needs.',
        percent: 63
    },
    {
        id: 3,
        title: 'Consideration',
        text: 'This is the graph representation of your personality traits, values, and needs..',
        percent: 63
    },
    {
        id: 4,
        title: 'Consideration',
        text: 'This is the graph representation of your personality traits, values, and needs.',
        percent: 63,
        det1: 'Consideration',
        det2: 'Conscientiousness',
        det3: 'Thoughtfulness',
        det4: 'Extraversion',
        det5: 'Conscientiousness'
    }
];

const navTop = [
    {
        id: 1,
        text: 'Home',
        href: '#'
    },
    {
        id: 2,
        text: 'How it works',
        href: '#'
    },
    {
        id: 3,
        text: 'Blog',
        href: '#'
    },
    {
        id: 4,
        text: 'Research',
        href: '#'
    },
    {
        id: 5,
        text: 'Contact',
        href: '#'
    }
];

const navFoot = [
    {
        id: 1,
        text: 'Home',
        href: '#'
    },
    {
        id: 2,
        text: 'How it works',
        href: '#'
    },
    {
        id: 3,
        text: 'Premium',
        href: '#'
    },
    {
        id: 4,
        text: 'Free Analysis',
        href: '#'
    },
    {
        id: 5,
        text: 'Blog',
        href: '#'
    },
    {
        id: 6,
        text: 'Research',
        href: '#'
    },
    {
        id: 7,
        text: 'Contact',
        href: '#'
    }
];

export default class StaticResults extends Component {

    render() {
        return (
            <div className="App">
                <header className="header">
                    <div className="header__wrap container">
                        <div className="header__left">
                            <Hamburger />
                            <Logo mod="is-head-logo" href="#" src="client/img/logo.png" />
                        </div>
                        <div className="header__right">
                            <Nav mod="is-head-nav" arr={navTop}/>
                            <Action />
                        </div>
                    </div>
                </header>
                <main className="main">
                    <User ico={USER.ico} name={USER.name}/>
                    <SectionHat title="Trait report"
                                descr="123123 words analysed. "
                                span="Very Strong Analysis"/>
                    <Tabs tabs={TABS} active={1} />
                    <TabDescr text="This is the graph representation of your personality traits, values, and needs. This is the graph representation of your personality traits, values, and needs. This is the graph representation of your personality traits, values, and needs." />
                </main>
                <Traits list={TRAITS} />
                <BehaviorReport />
                <GoPremium />
                <footer className="footer">
                    <div className="container">
                        <div className="footer__top">
                            <div className="footer__left">
                                <Nav arr={navFoot} />
                            </div>
                            <div className="footer__right">
                                <Social />
                            </div>
                        </div>
                        <div className="footer__bottom">
                            <div className="footer__left">
                                <Copyright>
                                    &reg; MindMetrics Technology - All rights reserved.
                                </Copyright>
                            </div>
                            <div className="footer__right">
                                <Logo href="#" src="client/img/logo_footer.png" />
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );

    }
}
