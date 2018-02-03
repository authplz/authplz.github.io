import React from 'react';

import { FormattedRelative } from 'react-intl';

import { account } from '../../api/AuthPlz';
import { Redirect } from 'react-router';

export default class AccountPage extends React.Component {
    constructor(props) {
        super(props);

        // Create form state
        this.state = {
            user: {},
            alert: '',
        };

        account()
            .then(user => {console.log(user); this.setState({ user })})
            .catch(error => this.setState({ error }));
    }

    render() {
        const {
            user,
        } = this.state;

        if (user == null) {
            return (
                <Redirect to="/login" />
            );
        }

        return (
            <div>
                <h3>User: {user.Username}</h3>
                <div>Email: {user.Email}</div>
                <div>Created At: <FormattedRelative value={user.CreatedAt} /></div>
                <div>Last Login: <FormattedRelative value={user.LastLogin} /></div>
            </div>
        );
    }
}
