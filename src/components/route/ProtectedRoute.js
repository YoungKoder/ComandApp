import React from 'react';
import { Redirect } from 'react-router-dom';
import FakeApi from '../../api/fakeApi';

export default class ProtectedRoute extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isValidToken: false
        };
    }

    componentDidMount() {
        FakeApi.Token.verify()
        .then(decoded => this.setState({ isValidToken: true }))
        .catch(error => console.log(error))
        .finally(() => this.setState({ isLoading: false }));
    }

    render() {
        return (
            this.state.isLoading ? <div>Loading...</div> :
            this.state.isValidToken ? <this.props.component/> : <Redirect to='/sign-in'/>
        );
    }
}