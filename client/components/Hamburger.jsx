import React, { Component } from 'react';
import MobileMenu from './MobileMenu';

export default class Hamburger extends Component {
  state = {
    open: false
  }

  toggleOpen = () => {
    this.setState({open: !this.state.open});
  }

  render() {
    let href = this.props.href,
        src = this.props.src;

    return (
      <div>
        <MobileMenu open={this.state.open} />
        <div className="hamburger" onClick={this.toggleOpen}>
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
        </div>
      </div>
    );
  }
}
