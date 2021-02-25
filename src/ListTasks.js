import React, {Component} from 'react';
import {Container, Table} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import AppNavbar from './AppNavbar';
import {instanceOf} from 'prop-types';
import {Cookies, withCookies} from 'react-cookie';

class ListTasks extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props
        this.state = {tasks: [], csrfToken: cookies.get('XSRF-TOKEN'), isLoading: true}
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('/api/v1/schedule-management')
            .then(response => response.json())
            .then(data => this.setState({tasks: data, isLoading: false}))
            .catch(() => this.props.history.push('/'));
    }

    render() {
        const {tasks, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const taskList = tasks.map(task => {
            return <tr>
                <td style={{whiteSpace: 'nowrap'}}>{task.name}</td>
            </tr>
        });
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h3>Scheduler Tasks</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {taskList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default withCookies(withRouter(ListTasks));