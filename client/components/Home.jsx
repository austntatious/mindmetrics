import React, { Component } from 'react';
import Layout from './Layout';
import SectionDescription from './SectionDescription';
import ProgressGroup from './ProgressGroup';
import Title from './Title';
import Btn from './Btn';
import FreeAnalysis from './FreeAnalysis';
import { Link } from "react-router";

class Home extends Component {
  static contextTypes = {
    mobile: React.PropTypes.oneOf(['small', 'tablet', false])
  };

  render() {
    return (
      <Layout classnames='Home'>
        <section className="section is-info">
          <div className="section__bg">
            <div className="section__wrap container">
              <div className="section__info">
                <div className="section__text">
                  <Title size="1">
                    Your True Personality Revealed
                  </Title>
                  <p>
                    We use your writing and social media
                    profiles to build you a detailed and
                    accurate personality report.
                  </p>
                </div>
                <div className="btn-group">
                  <Btn mod="is-big" type="link" to="/form">
                    Get free analysis
                  </Btn>
                </div>
              </div>
            </div>
          </div>
        </section>
        {this.context.mobile === 'small' ? null :
          <section className="section is-about-you">
            <div className="section__wrap container">
              <SectionDescription title="What Your Words Say About You"
                                  text="Your writing is a sample of how you think. Studying the patterns we've found in the way certain people of certain personalities use words, we can use your writing to determine using data, what kind of personality you have exactly."
                />
            </div>
          </section>
        }
        <section className="section is-data">
          <div className="section__wrap container">
            <SectionDescription mod="is-small"
                                title="Data Driven and Scientific"
                                titleMobile="How it Works"
                                text="Using data science and natural language processing, we're able to predict your personality based on the most popular personality model used in the psychology community, the Five Factor Personality model."
                                ico="is-man-green"
              />
          </div>
        </section>
        <section className="section is-ease-use">
          <div className="section__wrap container">
            <SectionDescription mod="is-small"
                                title="Easy to Use"
                                titleMobile="Easy to Use"
                                text="Faster than any other personality analysis out there. Just choose where you want us to analyze, your twitter, Facebook, or copy and paste your blog. We'll have it analyzed in seconds."
              />
          </div>
        </section>
        <section className="section is-personality-reports">
          <div className="section__wrap container">
            <SectionDescription title="Detailed Personality Reports"
                                titleMobile="Personality reports"
                                text="Free reports include your personality profile, including your 5 major traits, values, and needs and text summary as well as a graph representation of who you are."
                                ico="is-ico-chart"
              />
            {this.context.mobile === 'small' ? null : <ProgressGroup />}
          </div>
        </section>
        {this.context.mobile === 'small' ? null : <FreeAnalysis />}
      </Layout>
    );
  }
}

export default Home;
