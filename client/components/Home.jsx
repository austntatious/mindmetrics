import React, { Component } from 'react'
import LandingHeader from './LandingHeader'
import Layout from './Layout'
import FlatButton from 'material-ui/FlatButton';
import { Link } from "react-router"

class Home extends Component {
  render() {
    return (
      <Layout classnames='Home'>
        <section className='s-landing s-0 bgBlue'>
          <h1>Discover your personality</h1>
          <Link to="/form">
            <FlatButton label='Take the 5 minute quiz' style={{textTransform:'initial'}}/>
          </Link>
        </section>
        <LandingHeader />
      </Layout>
    );
  }
}

export default Home;
