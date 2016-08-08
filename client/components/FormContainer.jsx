import React, {Component, PropTypes} from 'react';
import ClearFix from 'material-ui/internal/ClearFix';
import Paper from 'material-ui/Paper';
import FormStepper from "./FormStepper";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {lightBaseTheme} from 'material-ui/styles/baseThemes/lightBaseTheme';
import Layout from './Layout'

const lightMuiTheme = getMuiTheme(lightBaseTheme);

// wait until fetch response returns from API request, then push URL onto router object to redirect to next page and render data

class FormContainer extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  state = {
    stepIndex: 0,
    name: "",
    email: "",
    birthyear: null,
    gender: null,
    textInput: ""
  };

  nextPage = () => {
    let pending;
    let self = this;

    let userData = self.state;
    const fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");

    const httpOptions = {
      method: "POST",
      headers: fetchHeaders,
      mode: "cors",
      body: JSON.stringify(userData)
    };

    const fetchReq = new Request("/submit", httpOptions);
    fetch(fetchReq, httpOptions)
      .then(function (response) {
        response.json().then(function (data) {
          let id = data.uuid;
          self.context.router.push({
            pathname: "/user/" + id,
            query: null,
            state: null
          }, function (err) {
            console.log("error", err);
          });
        }).catch(function (err) {
          console.log("FETCH ERROR", err);
        });
      });
  };

  formTextUpdate(eventType, val) {
    this.setState({
      [eventType]: val.target.value
    })
  }

  selectUpdate(eventType, node, idx, value) {
    this.setState({
      [eventType]: value
    })
  }

  stateUpdate(newState) {
    this.setState(newState);
  }

  render() {

    const styles = {
      paperStyle: {
        margin: 32,
        height: 600,
        width: 450,
        textAlign: "center",
        display: "inline-block"
      },
      exampleBlock: {
        borderRadius: '0 0 2px 0',
        padding: '14px 24px 24px',
        margin: 0,
        width: '45%',
        float: 'center'
      },
      stepperWrapper: {
        marginBottom: 50
      }
    };

    return (
      <Layout classnames='Form'>
        <MuiThemeProvider muiTheme={lightMuiTheme}>
          <Paper style={styles.paperStyle} zDepth={3}>
            <div style={styles.stepperWrapper}>
            <FormStepper navFunc={this.nextPage} textUpdate={this.formTextUpdate.bind(this)} formValues={this.state}
                         stateUpdate={this.stateUpdate.bind(this)} selectUpdate={this.selectUpdate.bind(this)} />
            </div>
          </Paper>
        </MuiThemeProvider>
      </Layout>
    );
  }
}



export default FormContainer;
