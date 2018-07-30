import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

class LoginModal extends Component {

    constructor() {
        super();
        this.state = {
            modalOpen: false
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onGoogleAuthClick = this.onGoogleAuthClick.bind(this);
    }

    handleOpen() {
        this.setState(state => ({
            modalOpen: true
        }));
    }

    handleClose() {
        this.setState(state => ({
            modalOpen: false
        }));
    }

    onGoogleAuthClick() {
        // Want to generalize this later. for now, just Google.
        const authURL = '/auth/login/google';
        const windowName = 'google_login';
        const windowSpecs = 'width=400,height=500';
        window.open(authURL, windowName, windowSpecs);
    }

    render() {
        return (
            <Modal
                open={this.state.modalOpen}
                onClose={this.handleClose}
                size='mini'
                trigger={
                    <Button 
                        inverted
                        content='Log In'
                        onClick={this.handleOpen}
                    >
                    </Button>
                }
            >
                <Modal.Header>
                    Select a Login Method
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>Sign in with a social network:</p>
                        <Button
                            content='Sign in with Google'
                            icon='google'
                            labelPosition='left'
                            onClick={this.onGoogleAuthClick}
                        >
                        </Button>
                        <Button
                            content='Cancel'
                            onClick={this.handleClose}
                        >
                        </Button>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}
  
export default LoginModal;