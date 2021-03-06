import React, { Component } from 'react';

export default class Hamburger extends Component {

  render() {
    let href = this.props.href,
        src = this.props.src;

    return (

      <div className="hamburger" onClick={this.props.click}>
        <span className="hamburger__line"></span>
        <span className="hamburger__line"></span>
        <span className="hamburger__line"></span>
      </div>

    );
  }
}
