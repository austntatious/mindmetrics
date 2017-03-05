import React, { Component } from 'react';
import { scaleOrdinal } from "d3-scale";

require('../styles/app.less');

import Layout from './Layout';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import Social from './Social';
import SectionHat from './SectionHat';
import Title from './Title';
import Logo from './Logo';
import User from './User';
import Action from './Action';
import Hamburger from './Hamburger';
import Copyright from './Copyright';
import UserLikes from './UserLikes';
import TellFriends from './TellFriends';
import Traits from './Traits';

import {Tabs, TabDescr} from './Tabs';

const USER = { name: 'Your name', ico: '/client/img/user-ico-1.png', descr: '123123 words analysed. ', emphasis: 'Very Strong Analysis'};

import DATA from '../../personality-data.json';
window.data = DATA;

import TextSummary from '../text-summary';
window.summary = TextSummary;


const TABS = [
    {
        id: "personality",
        title: 'Personality',
        ico: 'client/img/ico-personality.svg',
        descr: 'This is the graph representation of your personality traits, values, and needs. This is the graph representation of your personality traits, values, and needs. This is the graph representation of your personality traits, values, and needs. '
    },
    {
        id: "needs",
        title: 'Needs',
        ico: 'client/img/ico-needs.svg',
        descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consequatur fuga fugiat molestiae nulla obcaecati perferendis quo soluta, suscipit. Amet distinctio dolore esse ex minus quaerat vitae! Deserunt dolorum, sequi?'
    },
    {
        id: "values",
        title: 'Values',
        ico: 'client/img/ico-values.svg',
        descr: 'Ab consequuntur culpa cum cupiditate distinctio ea excepturi expedita facilis fugiat, harum illo, impedit in iusto magnam nulla odio officiis placeat praesentium quam quasi quia quis recusandae rem repudiandae sequi soluta suscipit temporibus totam unde vero.'
    }
];


const COLORS = scaleOrdinal().range(["#EDC951","#CC333F","#00A0B0"]);

// this component will render differently when called by the webapp formcontainer or by a direct URL link.
// when called by formcontainer, it should push the route with the UUID that we send back from server as the pathname
// when called from direct URL link, we should pull the ID parameter and query the database in componentWillMount

export default class StaticResults extends Component {
    static contextTypes = {
        mobile: React.PropTypes.oneOf(['small', 'tablet', false])
    }

    state = {
        activeTab: "personality"
    }

    setActiveTab = (activeTab) => {
        this.setState({activeTab});
    }

    getConsumptionPreferences(data) {
      const preferencesList = data.consumption_preferences[0].consumption_preferences;
      const likely = preferencesList.filter((i) => i.score >= 0.5);
      const unlikely = preferencesList.filter((i) => i.score < 0.5);
      return {likely, unlikely};
    }

  render() {
        const {activeTab} = this.state;
        const {likely, unlikely} = this.getConsumptionPreferences(DATA);
        return (
            <Layout classnames='Results'>
                <User ico={USER.ico} name={USER.name} descr={USER.descr} emphasis={USER.emphasis}
                      summary={TextSummary.assembleTraits(DATA.personality)[0]}
                      likely={likely} unlikely={unlikely} />

 
                {
                  !this.context.mobile &&

                  <div className="container">
                    <Title mod="i-uppercase" size="1">
                      Trait report
                    </Title>
                  </div>
                }

                <Tabs tabs={TABS}
                      colors={COLORS}
                      active={this.state.activeTab}
                      onChange={this.setActiveTab}/>

                <Traits mod={this.state.activeTab} list={DATA[activeTab]} />
                <TellFriends/>
            </Layout>
        );
    }
}
