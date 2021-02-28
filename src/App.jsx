import React from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import config from './config';
import Home from './Home';
import CustomLoginComponent from './Login';
import ListTasks from './ListTasks';
import Navbar from './Navbar';
import Profile from './Profile';


const HasAccessToRouter = () => {
  const history = useHistory(); // example from react-router

  const customAuthHandler = () => {
    // Redirect to the /login page that has a CustomLoginComponent
    history.push('/login');
  };

  return (
    <Security
      {...config.oidc}
      onAuthRequired={customAuthHandler}
    >
      <Navbar />
      <Container text style={{ marginTop: '7em' }}>
        <Route path="/" exact component={Home} />
        <Route path="/implicit/callback" component={LoginCallback} />
        <Route path="/login" component={CustomLoginComponent} />
        <SecureRoute path="/list-tasks" component={ListTasks} />
        <SecureRoute path="/profile" component={Profile} />
      </Container>
    </Security>
  );
};

const App = () => (
  <div>
    <Router>
      <HasAccessToRouter />
    </Router>
  </div>
);

export default App;
