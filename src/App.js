import React, {Component} from 'react';
import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';
import ListTasks from './ListTasks'

class App extends Component {
    render() {
        return (
            <CookiesProvider>
                <Router>
                    <Switch>
                        <Route path='/' exact={true} component={Home}/>
                        <Route path='/tasks' exact={true} component={ListTasks}/>
                    </Switch>
                </Router>
            </CookiesProvider>
        )
    }
}

export default App;