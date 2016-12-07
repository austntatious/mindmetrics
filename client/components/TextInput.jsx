import React, { Component } from 'react';

export default class TextInput extends Component {

  render() {
    const {mod, name, placeholder, check, onFocus} = this.props;
    let cls = 'input',
        mark = <span className="mark"><i className="ico is-check-mark"></i></span>;

    if (mod) {
      cls += ' ' + mod.split(' ').map(function(x) {
          return x;
        }).join(' ');
    }

    return (
      <div className={cls}>
        <label className="input__label" htmlFor={name} ></label>
        <input type="text"
               placeholder={placeholder}
               className="input__el"
               name={name}
               onFocus={onFocus}
               onChange={this.props.onChange}               
               />

        { check && mark }
      </div>
    );
  }
}
