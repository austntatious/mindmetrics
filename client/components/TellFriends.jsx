import React, { Component } from 'react';

import Title from './Title';
import Social from './Social';

export default class Header extends Component {
  static contextTypes = {
    mobile: React.PropTypes.oneOf(['small', 'tablet', false])
  };

  render() {

    return (
      <div className="tell-friends">
        {
          !this.context.mobile && <Title size="2">Tell your friends.</Title>
        }
        <Social/>
      </div>
    );
  }
}
