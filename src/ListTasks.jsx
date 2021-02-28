import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Table } from 'semantic-ui-react';
import config from './config';
import axios from 'axios';


const ListTasks = () => {
  const { authState, authService } = useOktaAuth();
  const [taskInfo, setTaskInfo] = useState(null);

axios.interceptors.request.use(
config => {
 config.headers.authorization = 'Bearer ' + authState.accessToken;
 return config;
 });
  useEffect(() => {
    if (!authState.isAuthenticated) {
      setTaskInfo(null);
    } else {
        axios.get(config.backend + '/api/v1/schedule-management', {})
                    .then(response => setTaskInfo(response.data))
    }
  }, [authState, authService]);

  if (!taskInfo) {
    return (
      <div>
        <p>Fetching scheduler tasks...</p>
      </div>
    );
  }

  return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {taskInfo.map(taskInfo => {
              return (
                <tr key={taskInfo.name}>
                  <td>{taskInfo.name}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
  );
};

export default ListTasks;
