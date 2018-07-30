import React, { Component, Fragment } from 'react';
import FixedMenu from '../FixedMenu';
import Main from '../Main';

class App extends Component {

  constructor(props) {
    super(props);
    this.initialUser = {
      isAccountHolder: false,
      isTemporary: true,
      isAdmin: false,
      loggedInUserName: ''
    };
    this.state = {
      isLoadingUser: true,
      errorCode: 0,
      user: this.initialUser
    };
    this.removeUser = this.removeUser.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  removeUser() {
    this.setState(state => ({
      isLoadingUser: false,
      user: this.initialUser
    }));
  }

  setUser({firstName = '', lastName = '', isTemporary, isAdmin, errorCode}) {
    this.setState(state => ({
      isLoadingUser: false,
      errorCode,
      user: {
        isAccountHolder: (!isTemporary && !isAdmin),
        isTemporary,
        isAdmin,
        loggedInUserName: `${firstName} ${lastName}`
      }
    }));
  }

  componentDidMount() {
    fetch('/state', {credentials: 'include'})
      .then(response => response.json())
      .then(responseObject => {
        this.setUser(responseObject);
      })
      .catch(() => {this.removeUser()});
  }

  render() {
    return (
      <Fragment>
        <FixedMenu
          isLoadingUser={this.state.isLoadingUser}
          user={this.state.user}
        />
        <Main
          user={this.state.user}
        />
      </Fragment>
    );
  }
}

export default App;
