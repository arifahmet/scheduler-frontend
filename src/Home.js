import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import AppNavbar from './AppNavbar';
import {Button, Container} from 'reactstrap';
import {withCookies} from 'react-cookie';

class Home extends Component {
    state = {
        isLoading: true,
        isAuthenticated: false,
        user: undefined,
        csrfToken: undefined
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.csrfToken = cookies.get('XSRF-TOKEN');
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('https://barbaktech-scheduler-backend.herokuapp.com/api/v1/user', {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        });
        console.log(response);
        const body = await response.text();
        console.log(body);
        if (body === '' || response.status !== 200) {
            this.setState(({isAuthenticated: false}))
        } else {
            this.setState({isAuthenticated: true, user: JSON.parse(body)})
        }
    }

    login() {
        window.location.href = 'https://barbaktech-scheduler-backend.herokuapp.com/private';
    }

    logout() {
        fetch('https://barbaktech-scheduler-backend.herokuapp.com/api/v1/user/logout', {
            method: 'POST', credentials: 'include',
            headers: {'X-XSRF-TOKEN': this.state.csrfToken}
        }).then(res => res.json())
            .then(response => {
                window.location.href = response.logoutUrl + "?id_token_hint=" +
                    response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
            });
    }

    render() {
        const message = this.state.user ?
            <h2>Welcome, {this.state.user.name}!</h2> :
            <p>Please log in to manage your JUG Tour.</p>;

        const button = this.state.isAuthenticated ?
            <div>
                <Button color="link" onClick={this.logout}>Logout</Button>
                <Button color="link"><Link to="/tasks">Scheduler Tasks</Link></Button>
            </div> :
            <Button color="primary" onClick={this.login}>Login</Button>;

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    {message}
                    {button}
                </Container>
            </div>
        );
    }
}

export default withCookies(Home);