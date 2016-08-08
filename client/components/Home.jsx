import React, { Component } from 'react'
import LandingHeader from './LandingHeader'
import Layout from './Layout'

class Home extends Component {
  render() {
    return (
      <Layout classnames='test'>
        <LandingHeader />
      </Layout>
    );
  }
}

export default Home;
