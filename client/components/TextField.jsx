import React, { Component } from 'react';

export default class TextField extends Component {

  render() {
    const {mod, name, title, onFocus, rows, cols} = this.props;
    let cls = 'field';

    if (mod) {
      cls += ' ' + mod.split(' ').map(function(x) {
          return x;
        }).join(' ');
    }

    return (
      <div className={cls}>
        <label className="field__label" htmlFor={name} >{title}</label>
        <textarea name={name}
                  className="field__el"
                  rows={rows}
                  cols={cols}
                  onFocus={onFocus}
          />
      </div>
    );
  }
}
