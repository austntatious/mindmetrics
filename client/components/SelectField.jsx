import React, { Component } from 'react';

export default class SelectField extends Component {

  render() {
    const {mod, name, title, onChange} = this.props;
    let cls = 'select';

    let options = this.props.options.map(function(x) {
      return(
        <option className="select__el" key={x.id} value={x.value}>{x.label}</option>
      )
    });

    if (mod) {
      cls += ' ' + mod.split(' ').map(function(x) {
          return x;
        }).join(' ');
    }

    return (
      <div className={cls}>
        <label className="select__label" htmlFor={name} onChange={onChange}>{title}</label>
        <select name={name} className="select__el">
          {options}
        </select>
      </div>
    );
  }
}