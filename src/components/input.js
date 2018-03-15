import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import _ from 'lodash';

class Input extends Component {
  renderOptions(optionValue) {
    return (
      <option key={optionValue} value={optionValue}>
        {optionValue}
      </option>
    );
  }

  renderField() {
    const {
      feedbackIcon,
      input,
      label,
      type,
      componentClass,
      meta: { error, warning, touched },
      ...props
    } = this.props;
    if (componentClass === 'select') {
      return (
        <FormControl
          {...input}
          componentClass={`${componentClass}`}
          type={type}
          {...props}
        >
          {_.map(this.props.options, this.renderOptions.bind(this))}
        </FormControl>
      );
    } else {
      return (
        <FormControl
          {...input}
          componentClass={`${componentClass}`}
          type={type}
          {...props}
        />
      );
    }
  }

  render() {
    const {
      feedbackIcon,
      input,
      label,
      type,
      componentClass,
      meta: { error, warning, touched },
      ...props
    } = this.props;

    let message;
    const validationState =
      (touched && (error && 'error')) || (warning && 'warning') || null;

    if (touched && (error || warning)) {
      message = <span className="help-block">{error || warning}</span>;
    }
    return (
      <FormGroup validationState={validationState}>
        <ControlLabel>{label}</ControlLabel>
        {this.renderField()}
        {feedbackIcon ? (
          <FormControl.Feedback>{feedbackIcon}</FormControl.Feedback>
        ) : null}
        {message}
      </FormGroup>
    );
  }
}

export default Input;
