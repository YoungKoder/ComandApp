import React from 'react';
import { Redirect } from 'react-router-dom';
import  { Token }  from '../../api/fakeApi';

export default class ProtectedRoute extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isValidToken: false
        };
    }

    componentDidMount() {
        Token.verify()
        .then(decoded => this.setState({ isValidToken: true }))
        .catch(error => console.log(error))
        .finally(() => this.setState({ isLoading: false }));
    }

    render() {
        const { Component, ...props } = this.props;
        return (
            this.state.isLoading ? <div>Loading...</div> :
            this.state.isValidToken ? <Component {...props} /> : <Redirect to='/sign-in'/>
        );
    }
}