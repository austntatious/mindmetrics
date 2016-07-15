import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
  StepLabel
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import DatePicker from 'material-ui/DatePicker';
import SelectField from "material-ui/SelectField";
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from "react-router"

// Todo: add form validation, server validation, and Mongo error handling
// create UUID and send to server
// accounts, etc
// session handling


/**
 * A horizontal, linear stepper form
 */
const styles = {
  customWidth: {
    width: 100
  }
};

 const items = [
  <MenuItem key={1} value="M" primaryText="Male" />,
  <MenuItem key={2} value="F" primaryText="Female" />,
  <MenuItem key={3} value="NA" primaryText="Prefer Not to Answer" />
];

const years = [];
let startYear = new Date().getFullYear();
for(let i = 0; i < 100; i++) {
  years.push(<MenuItem value={startYear - i} key={i} primaryText={`${startYear - i}`} />);
}


class FormStepper extends Component {

  handleNext = () => {
    console.log("this.props", this.props.formValues);
    const {stepIndex} = this.props.formValues;
    this.props.stateUpdate({
      stepIndex: stepIndex + 1
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.props.formValues;
    this.props.stateUpdate({
      stepIndex: stepIndex - 1
    });
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <p>Tell us a little about yourself</p>
            <TextField style={{marginTop: 0}} floatingLabelText="Name"
                       onChange={this.props.textUpdate.bind(this, "name")} value={this.props.formValues.name}/>
            <TextField style={{marginTop: 0}} floatingLabelText="Email"
                       onChange={this.props.textUpdate.bind(this, "email")} value={this.props.formValues.email}/>
            <SelectField
              value={this.props.formValues.gender}
              onChange={this.props.selectUpdate.bind(this, "gender")}
              floatingLabelText="Gender"
            >
              {items}
            </SelectField>
            <SelectField
              value={this.props.formValues.birthyear}
              onChange={this.props.selectUpdate.bind(this, "birthyear")}
              floatingLabelText="Birthyear"
            >
              {years}
            </SelectField>
          </div>
        );
      case 1:
        return (
          <div>
            <p>
              Input some of your writing, the more writing the better. Using your words and writing, we're going to
              analyze your personality.
            </p>
            <TextField onChange={this.props.textUpdate.bind(this, "textInput")} value={this.props.formValues.textInput}
                       multiLine={true} rowsMax={12} rows={8} fullWidth={true} ref="input" />
          </div>
        );
      case 2:
        return (
          <p>
            Try out different ad text to see what brings in the most customers, and learn how to
            enhance your ads using features like ad extensions. If you run into any problems with your
            ads, find out how to tell if they're running and how to resolve approval issues.
          </p>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent() {
    const {stepIndex} = this.props.formValues;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === 2 ? 'Analyze' : 'Next'}
            primary={true}
            onTouchTap={stepIndex === 2 ? this.props.navFunc : this.handleNext }
          />
        </div>
      </div>
    );
  }

  render() {
    const {stepIndex} = this.props.formValues;

    return (
      <div style={{width: '100%', maxWidth: 900, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Basic Info</StepLabel>
          </Step>
          <Step>
            <StepLabel>Text to Analyze</StepLabel>
          </Step>
          <Step>
            <StepLabel>Extra Info</StepLabel>
          </Step>
        </Stepper>
        <ExpandTransition open={true}>
          {this.renderContent()}
        </ExpandTransition>
      </div>
    );
  }

}
  
export default FormStepper;