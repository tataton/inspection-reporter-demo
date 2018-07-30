import { withFormsy } from 'formsy-react';
import React from 'react';
import { Input } from 'semantic-ui-react'

class MyInput extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    // An error message is returned only if the component is invalid
    const errorMessage = this.props.getErrorMessage();
    const myBorder = ((errorMessage == null) ? 'black' : 'red');

    return (
      <div>
        <Input
          onChange={this.changeValue}
          type="text"
          value={this.props.getValue() || ''}
          style={{borderColor: myBorder, borderWidth: 'thin', borderStyle: 'solid'}}
        />
        <br />
        <span style={{color: 'red'}}>{errorMessage}</span>
      </div>
    );
  }
}

export default withFormsy(MyInput);
