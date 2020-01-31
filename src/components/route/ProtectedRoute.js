import React from 'react';
import PropTypes from 'prop-types';
import  { Token }  from '../../api/fakeApi';

export default class ProtectedRoute extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            componentIsLoading: true,
            isValidToken: false
        };
    }

    componentDidMount() {
        Token.verify()
        .then(decoded => this.setState({ isValidToken: true }))
        .finally(() => this.setState({ componentIsLoading: false }));
    }

    render() {
        const { Component, ...props } = this.props;
        return (
            this.state.componentIsLoading ? <div>Loading...</div> :
            this.state.isValidToken ? <Component {...props} /> : null
        );
    }
}

ProtectedRoute.propTypes = {
    Component: PropTypes.elementType.isRequired
}