import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Button, Header } from 'semantic-ui-react';

const Home = () => {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, authService]); // Update if authState changes

  const login = async () => {
    authService.login('/');
  };

  if (authState.isPending) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <div>
        <Header as="h1">Scheduler Tasks Management</Header>

        { authState.isAuthenticated && !userInfo
        && <div>Loading user information...</div>}

        {authState.isAuthenticated && userInfo
        && (
        <div>
          <p>
            <p>Welcome back,</p>
            <p>{userInfo.name}</p>
          </p>
        </div>
        )}

        {!authState.isAuthenticated
        && (
        <div>
          <Button id="login-button" primary onClick={login}>Login</Button>
        </div>
        )}

      </div>
    </div>
  );
};
export default Home;
