import React, { Fragment } from 'react';
import { Menu, Button, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';

const FixedMenu = ({user, isLoadingUser}) => {

    const rightMenuItems = () => {
        if (!isLoadingUser && !user.isAccountHolder && !user.isAdmin && !user.isTemporary) {
            return (
                <Menu.Item position='right'>
                    <LoginModal />
                    <RegisterModal />
                </Menu.Item>
            )
        } else if (!isLoadingUser && (user.isAccountHolder || user.isAdmin)) {
            return (
                <Menu.Item position='right'>
                    {user.loggedInUserName}
                    <Button
                        as='a'
                        href='/auth/logout'
                        style={{ marginLeft: '1.5em' }}
                        content='Logout'
                    >
                    </Button>
                </Menu.Item>
            )
        } else {
            return null;
        }
    };

    const navigationItems = () => {
        if (user.isAccountHolder) {
            return (
                <Fragment>
                    <Menu.Item
                        as={NavLink}
                        exact
                        to='/'
                        content='Home'
                    >
                    </Menu.Item>
                    <Menu.Item
                        as={NavLink}
                        to='/dashboard'
                        content='Your Inspection Reports'
                    >
                    </Menu.Item>
                </Fragment>
            )
        } else if (user.isAdmin) {
            return (
                <Menu.Item
                    as={NavLink}
                    to='/admin'
                    content='Administrator Dashboard'
                >
                </Menu.Item>
            )
        } else {
            return null;
        }
    };

    return (
        <Container>
            <Menu fixed='top' inverted>
                <Menu.Item header>
                    Inspection Reporter
                </Menu.Item>
                <Menu.Item
                    as={NavLink}
                    to='/settings'
                    content='Settings'
                >
                </Menu.Item>
                {navigationItems()}
                {rightMenuItems()}
            </Menu>
        </Container>
    )
};

export default FixedMenu;
