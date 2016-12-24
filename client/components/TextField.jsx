import React, { Component } from 'react';

export default class TextField extends Component {

  render() {
    const {mod, name, placeholder, value, onFocus, rows, cols} = this.props;
    let cls = 'field';

    if (mod) {
      cls += ' ' + mod.split(' ').map(function(x) {
          return x;
        }).join(' ');
    }

    return (
      <div className={cls}>
        <label className="field__label" htmlFor={name} ></label>
        <textarea name={name}
                  placeholder={placeholder}
                  className="field__el"
                  rows={rows}
                  cols={cols}
                  onFocus={onFocus}
                  onChange={this.props.onChange}
        />
      </div>
    );
  }
}
