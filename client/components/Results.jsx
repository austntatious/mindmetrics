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
import testData from '../../personality-data-anshu.json';
import TextSummary from '../text-summary';

// TODO: move to a util function since strength of word analysis is used on form page as well
const METER_GRADES = { one: 100, two: 300, three: 600, four: 1200, five: 3000 };

const COLORS = scaleOrdinal().range(["#EDC951","#CC333F","#00A0B0"]);

export default class StaticResults extends Component {
    static contextTypes = {
        mobile: React.PropTypes.oneOf(['small', 'tablet', false])
    };

    state = {
        activeTab: "personality",
        // personalityData: this.props.location.state
        personalityData: testData
    };

    setActiveTab = (activeTab) => {
        this.setState({activeTab});
    };

    getConsumptionPreferences(data) {
      const preferencesList = data.consumption_preferences[0].consumption_preferences;
      const likely = preferencesList.filter((i) => i.score > 0.5);
      const unlikely = preferencesList.filter((i) => i.score < 0.5);
      return {likely, unlikely};
    }

    componentDidMount() {
        // console.log(window.summary.getSummary(this.state.personalityData));
        // console.log(this.state.personalityData);
    }

  render() {
      const textSummary = new TextSummary({ version: 'v3'});

      const wordCount = this.state.personalityData.word_count;

      const USER = {
          name: this.state.personalityData.userName,
          ico: '',
          descr: wordCount + " words analyzed ",
          emphasis: wordCount <= METER_GRADES.two ?
              "Very Weak Analysis" : (wordCount > METER_GRADES.two) && (wordCount <= METER_GRADES.three) ?
                  "Weak Analysis" : (wordCount > METER_GRADES.three) && (wordCount <= METER_GRADES.four) ?
                      "OK Analysis": (wordCount > METER_GRADES.four) && (wordCount <= METER_GRADES.five) ?
                          "Strong Analysis": wordCount > METER_GRADES.five ?
                              "Very Strong Analysis": null
      };
        const {activeTab} = this.state;
        const {likely, unlikely} = this.getConsumptionPreferences(this.state.personalityData);

        let summarySentences = textSummary.getSummary(this.state.personalityData);

      const TABS = [
          {
              id: "personality",
              title: 'Personality',
              ico: 'client/img/ico-personality.svg',
              descr: summarySentences[1]
          },
          {
              id: "needs",
              title: 'Needs',
              ico: 'client/img/ico-needs.svg',
              descr: "Your base needs relate to your fundamendal drives in life. For you: " + summarySentences[2]
          },
          {
              id: "values",
              title: 'Values',
              ico: 'client/img/ico-values.svg',
              descr: summarySentences[3]
          }
      ];

        return (
            <Layout classnames='Results'>
                <User ico={USER.ico} name={USER.name} descr={USER.descr} emphasis={USER.emphasis}
                      summary={summarySentences[0]}
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

                <Traits mod={this.state.activeTab} list={this.state.personalityData[activeTab]} />
                <TellFriends/>
            </Layout>
        );
    }
}
