import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

// Mui theme is required for this version of MUI.
// Refer to: http://stackoverflow.com/questions/36953711/i-cannot-use-material-ui-components-after-update-to-material-ui0-15-0-beta-1
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class Layout extends Component {
  static defaultProps = {
    classNames: '',
    styles: {}
  };

  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    return (
      <div id='app' className={this.props.classnames} style={this.props.style}>
        <section id='header-container'>
          <AppBar title='MindMetrics'
            iconElementRight={
              <div className='header-links'>
                <FlatButton label="Reports" />
                <FlatButton label="How it works" />
                <FlatButton label="Research" />
              </div>
            }>
          </AppBar>
        </section>
        <section id='content-container'>
          {this.props.children}
        </section>
        <section id='footer'>

        </section>
      </div>
    );
  }
}

Layout.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default Layout;
