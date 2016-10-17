import React, { Component } from 'react';
import Layout from './Layout';
import SectionDescription from './SectionDescription';
import ProgressGroup from './ProgressGroup';
import Title from './Title';
import Btn from './Btn';
import GoPremium from './GoPremium';
import { Link } from "react-router";

class Home extends Component {
  render() {
    return (
      <Layout classnames='Home'>
        <section className="section is-info">
          <div className="section__wrap container">
            <div className="section__info">
              <div className="section__text">
                <Title mod="i-violet-dark" size="1">
                  Your True Personality Revealed
                </Title>
                <p>
                  We use your writing and social media
                  profiles to build you a detailed and
                  accurate personality report.
                </p>
              </div>
              <div className="btn-group">
                <Btn mod="is-small is-violet" type="link" href="#">
                  Take a test now
                </Btn>
                <Btn mod="is-small" type="link" href="#">
                  Go premium
                </Btn>
              </div>
            </div>
          </div>
        </section>
        <section className="section is-about-you">
          <SectionDescription title="What your words say about you"
                              text="Your writing is a sample of how you think. Studying the patterns we've found in the way certain people of certain personalities use words, we can use your writing to determine using data, what kind of personality you have exactly."
                              href="#"
            />
        </section>
        <section className="section is-data">
          <div className="section__wrap container">
            <SectionDescription title="Data driven and scientific"
                                text="Using data science and natural language processing, we're able to predict your personality based on the most popular personality model used in the psychology community, the Five Factor Personality model."
                                href="#"
              />
          </div>
        </section>
        <section className="section is-ease-use">
          <div className="section__wrap container">
            <SectionDescription title="Easy to use"
                                text="Faster than any other personality analysis out there. Just choose where you want us to analyze, your twitter, Facebook, or copy and paste your blog. We'll have it analyzed in seconds."
                                href="#"
                                linkcolor="is-orange"
              />
          </div>
        </section>
        <section className="section is-personality-reports">
          <div className="section__wrap container">
            <SectionDescription title="Detailed Personality Reports"
                                text="Free reports include your personality profile, including your 5 major traits, values, and needs and text summary as well as a graph representation of who you are."
                                href="#"
                                linkcolor="is-orange"
              />
            <ProgressGroup />
          </div>
          <GoPremium mobile />
        </section>
        <div className="section is-promo">
          <div className="btn-group">
            <Btn mod="is-big is-violet" type="link" href="#">
              Get free analysis
            </Btn>
            <Btn mod="is-big" type="link" href="#">
              Go premium
            </Btn>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;
