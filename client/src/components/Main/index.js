import React from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Home from '../Home';
import Dashboard from '../Dashboard';
import Register from '../Register';
import Welcome from '../Welcome';
import Admin from '../Admin';
import Settings from '../Settings';

const Main = ({user}) => {

    const redirectString = () =>
        (
            user.isAdmin ? '/admin' :
            user.isTemporary ? '/register' :
            user.isAccountHolder ? '/app' :
            '/'
        );

    return (
        <Container style={{ marginTop: '6em' }}>
            <Switch>
                <Route path='/admin'
                    render={props =>
                        user.isAdmin
                        ? (<Admin />)
                        : (<Redirect to={redirectString()}/>)
                    }
                />
                <Route path='/app'
                    render={props =>
                        user.isAccountHolder
                        ? (<Home />)
                        : (<Redirect to={redirectString()}/>)
                    }
                />
                <Route path='/dashboard'
                    render={props =>
                        user.isAccountHolder
                        ? (<Dashboard />)
                        : (<Redirect to={redirectString()}/>)
                    }
                    />
                <Route path='/register'
                    render={props =>
                        user.isTemporary
                        ? (<Register />)
                        : (<Redirect to={redirectString()}/>)
                    }
                />
                <Route path='/settings'
                    render={props =>
                    true
                  ? (<Settings />)
                : (<Redirect to={redirectString()} />)
                   }
                />
                <Route exact path='/'
                    render={props =>
                        (!user.isAdmin && !user.isTemporary && !user.isAccountHolder)
                        ? (<Welcome />)
                        : (<Redirect to={redirectString()}/>)
                    }
                />
                <Route path='/'
                    render={props =>
                        (<Redirect to={redirectString()}/>)
                    }
                />
            </Switch>
        </Container>
    )
}

export default Main;
