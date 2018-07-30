import Formsy from 'formsy-react';
import React from 'react';
import { Button } from 'semantic-ui-react'
import MyInput from './myInput';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = { canSubmit: false };
  }

  componentDidMount() {
    // If user closes window instead of pressing "Cancel",
    // same effect.
    window.onbeforeunload = this.cancel;
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  submit(userInfo) {
    fetch('/auth/registrationform', {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    }).then(() => {window.location = '/'});
  }

  cancel() {
    fetch('/auth/cancelreg', {
      credentials: 'include',
    }).then(() => {window.location = '/'});
  }

  render() {
    return (
      <Formsy onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}
      style={{backgroundColor: '#edd879', padding: '5%', paddingLeft: '40%', paddingRight: '40%', height: '100%', marginTop: '0px', marginBottom: '0px'}}
      >
        *Email:
          <MyInput
            name="email"
            validations="isEmail"
            validationError="This is not a valid email"
            required
          />
        *First Name:
          <MyInput
            name='firstName'
            required
          />
        *Last Name:
          <MyInput
            name='lastName'
            required
          />
          <p>* signifies a required field</p>
        <Button type="submit" disabled={!this.state.canSubmit}>Submit</Button>
        <Button type="button" onClick={this.cancel}>Cancel</Button>
      </Formsy>
    );
  }
}
