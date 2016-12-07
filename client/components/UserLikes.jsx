import React, { Component } from 'react';

import Title from './Title';

export default class UserLikes extends Component {
  static defaultProps = {
    likelyList: ['Item 1', 'Item 2'],
    unlikelyList: ['Item 1']
  }

  getLikelyList = () => this.props.likelyList.slice(0, 3)

  getUnlikelyList = () => this.props.unlikelyList.slice(0, 3)

  render() {
    return (
      <div className="user-likes">
        <div className="user-likes__likes">
          <Title size="6">
            Likely behaviors
          </Title>
          <ul className="user-likes__list">
            {this.getLikelyList().map((t, i) =>
              <li className="user-likes__el" key={i}>
                <span className="user-likes__item">
                  {t.name.replace("Likely to", '')}
                </span>
              </li>
             )}
          </ul>
        </div>
        <div className="user-likes__unlikes">
          <Title size="6">
            Unlikely behaviors
          </Title>
          <ul className="user-likes__list">
            {this.getUnlikelyList().map((t, i) =>
              <li className="user-likes__el" key={i}>
                <span className="user-likes__item">
                  {t.name.replace("Likely to", '')}
                </span>
              </li>
             )}
          </ul>
        </div>
      </div>
    );
  }
}
