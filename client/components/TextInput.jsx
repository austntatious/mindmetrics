import React, { Component } from 'react';

export default class TextInput extends Component {

  render() {
    const {mod, name, placeholder, check, error, onFocus, onBlur} = this.props;
    let cls = 'input',
        mark = <span className="mark"><i className="ico is-check-mark"></i></span>,
        cross = <span className="mark"><i className="ico is-cross-red"></i></span>;

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
               onBlur={onBlur}
               onChange={this.props.onChange}               
               />

        { check && mark }
        { error && cross }
      </div>
    );
  }
}
