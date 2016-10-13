import React, { Component } from 'react'
import { Link } from "react-router"

class LandingHeader extends Component {
  render() {
    return (
    <div>
  {/** create and separate into navbar component with link subcomponents **/ }
    <nav id="mainNav" className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand page-scroll" href="#page-top">MindMetrics</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <a className="page-scroll" href="#about">About</a>
                    </li>
                    <li>
                        <a className="page-scroll" href="#services">Services</a>
                    </li>
                    <li>
                        <a className="page-scroll" href="#portfolio">Portfolio</a>
                    </li>
                    <li>
                        <a className="page-scroll" href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <header>
  {/** create and separate into header landing page component **/}
        <div className="header-content">
            <div className="header-content-inner">
                <h1>Powerful accurate personality analysis</h1>
                <hr/>
                <p>Mindmetrics technology analyzes your personality to give you the understanding you need to perform best
                in your life.</p>
                <Link to="/form" className="btn btn-primary btn-xl page-scroll">Get Started</Link>
            </div>
        </div>
    </header>

    </div>
    );
  }
}

export default LandingHeader;