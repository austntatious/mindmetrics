import React, { Component } from 'react'
import Header from './Header';
import Footer from './Footer';

class Layout extends Component {
  static defaultProps = {
         classNames: '',
         styles: {}
  };

  render() {
    return (
      <div id='app' className={this.props.classnames} style={this.props.style}>
        {
          this.props.classnames === 'Form' ? <Header mod="is-form" /> : <Header />
        }
        <section id='content-container'>
          {this.props.children}
        </section>
        <Footer />
      </div>
    );
  }
}

export default Layout;
