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

        <section className='s-1 bgGray '>
          <div className='container row'>
            <div className='columns' style={{width:'60%'}}>
              <h1>Discover your personality</h1>
              <p>Mindmetrics technology analyzes your personality to give you the understanding you need to perform best in your life.</p>
            </div>
            <div className='columns' style={{width:'40%'}}>
              image goes here
            </div>
          </div>
        </section>

        <section className='s-1 bgGray '>
          <div className='container row'>
            <div className='columns' style={{width:'40%'}}>
              image goes here
            </div>
            <div className='columns' style={{width:'60%'}}>
              <h1>Discover your personality</h1>
              <p>Mindmetrics technology analyzes your personality to give you the understanding you need to perform best in your life.</p>
            </div>
          </div>
        </section>

        <LandingHeader />
      </Layout>
    );
  }
}

export default Home;
