import React, { Component } from 'react';
require('../styles/app.less');

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

class App extends Component {

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

class Tabs extends Component {

    render() {
        let li = this.props.tabs.map((t) => {
            return (
                <Tab key={t.id}
                     active={this.props.active === t.id}
                     title={t.title} />
            )
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

class Tab extends Component {

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

class TabDescr extends Component {

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



class Traits extends Component {

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
                        mobile ?
                        <Btn mod="is-plus"></Btn>
                        :
                        <Btn>Details ></Btn>
                    }
                </div>
            </div>
        );
    }
}

class BehaviorReport extends Component {
    static defaultProps = {
        text: `This is the graph representation of your
               personality traits, values,
               and needs. This is the graph representation
               of your  personality traits, values,
               and needs. personality traits, values,
               and needs. This is the graph representation
               of your  personality traits, values,
               and needs. personality traits, values,
               and needs. This is the graph representation
               of your  personality traits, values,
               and needs.`,
        likelyBehaviorList: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
        unlikelyBehaviorList: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
    }

    render() {
        return (
            <div className="beh-report container">
                <SectionHat title="Behavior report"/>

                <div className="beh-report__row">
                    <div className="beh-report__col">
                        <span className="beh-report__text">
                            {this.props.text}
                        </span>
                    </div>
                    <div className="beh-report__col">
                        <div className="beh-report__likes">
                            <Title size="2">
                                You are likely to:
                            </Title>
                            <ul className="beh-report__list">
                                {this.props.likelyBehaviorList.map((t, i) =>
                                    <li className="beh-report__el" key={i}>
                                        <span className="beh-report__item">
                                            {t}
                                        </span>
                                    </li>
                                 )}
                            </ul>
                        </div>
                    </div>
                    <div className="beh-report__col">
                        <div className="beh-report__unlikes">
                            <Title size="2">
                                You are unlikely to:
                            </Title>
                            <ul className="beh-report__list">
                                {this.props.unlikelyBehaviorList.map((t, i) =>
                                    <li className="beh-report__el" key={i}>
                                        <span className="beh-report__item">
                                            {t}
                                        </span>
                                    </li>
                                 )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class Nav extends Component {

    render() {
        let cls = 'nav',
            mod = this.props.mod,
            arr = this.props.arr.map(function (n) {
                return (
                    <NavEl key={n.id} href={n.href}>
                        {n.text}
                    </NavEl>
                )
            });

        if (mod) {
            cls += ' ' + mod.split(' ').map(function (x) {
                return x;
            }).join(' ');
        }

        return (
            mobile ?
            <nav className={cls + ' ' + 'is-mobile'}>
                <ul className="nav__list">
                    {arr}
                </ul>
            </nav>
            :
            <nav className={cls}>
                <ul className="nav__list">
                    {arr}
                </ul>
            </nav>
        );
    }
}

class NavEl extends Component {

    render() {
        let href = this.props.href;

        return (
            <li className="nav__el">
                <a className="nav__link" href={href}>
                    {this.props.children}
                </a>
            </li>
        );
    }
}

class Action extends Component {

    render() {
        let href = this.props.href;

        return (
            mobile ?
            <div className="action">
                <Btn type="link" href="#" mod="is-orange">
                    Go premium
                </Btn>
            </div>
            :
            <div className="action">
                <Btn type="link" href="#" mod="is-orange">
                    Take test
                </Btn>
                <Btn type="link" href="#" mod="is-fb" />
            </div>
        );
    }
}

class User extends Component {

    render() {
        let ico = this.props.ico,
            name = this.props.name;

        return (
            <div className="user">
                <div className="user__ico">
                    <img src={ico} alt="User photo"/>
                </div>
                <span className="user__name">
                    {name}
                </span>
            </div>
        );
    }
}

class SectionHat extends Component {

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

class Social extends Component {

    render() {
        let href = this.props.href,
            src = this.props.src;

        return (
            <div className="social">
                <ul className="social__list">
                    <li className="social__el">
                        <a href="#" className="social__link">
                            <Icon ico="is-fb" />
                        </a>
                    </li>
                    <li className="social__el">
                        <a href="#" className="social__link">
                            <Icon ico="is-tw" />
                        </a>
                    </li>
                    <li className="social__el">
                        <a href="#" className="social__link">
                            <Icon ico="is-g" />
                        </a>
                    </li>
                    <li className="social__el">
                        <a href="#" className="social__link">
                            <Icon ico="is-in" />
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

class Hamburger extends Component {

    render() {
        let href = this.props.href,
            src = this.props.src;

        return (
            mobile ?
            <div className="hamburger">
                <span className="hamburger__line"></span>
                <span className="hamburger__line"></span>
                <span className="hamburger__line"></span>
            </div>
            : null
        );
    }
}

class Logo extends Component {

    render() {
        let cls = 'logo',
            mod = this.props.mod,
            href = this.props.href,
            src = this.props.src;

        if (mod) {
            cls += ' ' + mod.split(' ').map(function (x) {
                return x;
            }).join(' ');
        }

        return (
            <div className={cls}>
                <a className="logo__link" href={href}>
                    <img className="logo__img" src={src} />
                </a>
            </div>
        );
    }
}

class Copyright extends Component {

    render() {

        return (
            <div className="copyright">
                {this.props.children}
            </div>
        );
    }
}

class Progress extends Component {

    render() {
        let cls = 'progress',
            mod = this.props.mod;

        if (mod) {
            cls += ' ' + mod.split(' ').map(function (x) {
                return x;
            }).join(' ');
        }

        return (
            <div className={cls}>
                <div className="progress__line"></div>
                <span className="progress__percent">
                    {this.props.children}%
                </span>
            </div>
        );
    }
}

class GoPremium extends Component {

    render() {

        return (
            mobile ?
            <div className="premium">
                <div className="premium__wrap">
                    <div className="premium__col">
                        <Btn type="link" href="#" mod="is-big is-violet">Get free analysis</Btn>
                    </div>
                    <div className="premium__col">
                        <Btn type="link" href="#" mod="is-big">Go premium</Btn>
                    </div>
                </div>
            </div>
            :
            <div className="premium">
                <div className="premium__wrap">
                    <div className="premium__col">
                        <Title size="3" mod="i-violet-dark i-uppercase">
                            Wait, there is more
                        </Title>
                        <p className="premium__text">
                            Understand your personality so you can make the best life choices.
                            Details on career path, relationships, learning style, etc
                        </p>
                    </div>
                    <div className="premium__col">
                        <Btn type="link" href="#" mod="is-big">Go premium</Btn>
                    </div>
                </div>
            </div>
        );
    }
}

class Btn extends Component {

    render() {
        let cls = 'btn',
            mod = this.props.mod,
            type = this.props.type,
            href = this.props.href;

        if (mod) {
            cls += ' ' + mod.split(' ').map(function (x) {
                return x;
            }).join(' ');
        }

        return (
            type === 'link' ?
            <a className={cls} href={href}>
                {this.props.children}
            </a>
            :
            <span className={cls}>
                {this.props.children}
            </span>
        );
    }
}

class Icon extends Component {

    render() {
        let cls = 'ico',
            ico = this.props.ico;

        return (
            <i className={ico ? cls + ' ' + ico : cls}></i>
        );
    }
}

class Title extends Component{

    render() {
        let cls = 'title',
            mod = this.props.mod,
            size = this.props.size,
            text = this.props.children;

        if (mod) {
            cls += ' ' + mod.split(' ').map(function (x) {
                return x;
            }).join(' ');
        }

        return (
            <div className={cls}>
                {size === '1' ?
                 <h1>{text}</h1>
                 : size === '2' ?
                 <h2>{text}</h2>
                 : size === '3' ?
                 <h3>{text}</h3>
                 : size === '4' ?
                 <h4>{text}</h4>
                 : size === '5' ?
                 <h5>{text}</h5>
                 : size === '6' ?
                 <h6>{text}</h6>
                 : null
                }
            </div>
        );
    }
}

export default App;
