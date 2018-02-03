import React from 'react';

import validator from 'validator';

import OAuthCreateView from './OAuthCreateView';
import OAuthClientView from './OAuthClientView';

import {
    getOAuthOptions,
    createOauthClient,
} from '../../api/AuthPlz';

// Validate the child component state
const validateFields = (state) => {
    const errors = {};

// Errors shown after submitted state is set
    if (state.submitted) {
  // TODO: could / should? validate username existence here
        if ((typeof state.username === 'undefined') || (state.username.length === 0)) {
            errors.username = 'client name required';
        } else if (!validator.isAlphanumeric(state.username)) {
            errors.username = 'client must consist of alphanumeric characters (and spaces)';
        } else {
            delete errors.username;
        }

        if ((typeof state.url === 'undefined') || (state.url.length === 0)) {
            errors.url = 'client url required';
        } else if (!validator.isURL(state.url)) {
            errors.url = 'INVALID_URL';
        } else {
            delete errors.url;
        }
    }

    return errors;
};

class OAuthCreatePage extends React.Component {

    constructor(props) {
        super(props);
    // Create form state
        this.state = {
            name: '',
            url: '',

            allowed_scopes: [],
            grant_types: [],
            response_types: [],

            error: '',
            result: '',
            client: {
                scopes: [],
                grants: [],
                redirects: [],
            },
            errors: {},
            clientLoaded: false,
        };

        this.loadOptions = this.loadOptions.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        console.log('Mount');
        this.loadOptions();
    }

  // Called on submission of the child component (with no errors)
    onSubmit(state) {
        console.log(state);

        const errors = validateFields(state);
        if ((typeof errors !== 'undefined') && (Object.keys(errors).length !== 0)) {
            return this.setState({ errors });
        }


        return createOauthClient(state.name, state.url, state.scopes, state.grants)
            .then((res) => {
                this.setState({ client: res, clientLoaded: true });
            }, (res) => {
                if (typeof res.message !== 'undefined') {
                    this.setState({ result: res.message });
                } else {
                    this.setState({ result: res });
                }
                console.log(res);
            });
    }

    loadOptions() {
        getOAuthOptions().then((res) => {
            console.log('Get oauth options');
            console.log(res);
            this.setState({
                allowed_scopes: res.scopes,
                grant_types: res.grant_types,
                response_types: res.response_types,
            });
        }, (err) => {
            console.log('Get oauth options error');
            console.log(err);
            this.setState({ error: err });
        });
    }

    render() {
        return (
            <div>
                <div hidden={this.state.clientLoaded}>
                    <OAuthCreateView
                      scopes={this.state.allowed_scopes}
                      grants={this.state.grant_types}
                      alert={this.state.error}
                      errors={this.state.errors}
                      validate={validateFields}
                      onSubmit={this.onSubmit}
                      onCancel={() => { console.log('Cancel not implemented'); }}
                    />
                </div>
                <div hidden={!this.state.clientLoaded}>
                    <OAuthClientView
                      client={this.state.client}
                    />
                </div>
            </div>
        );
    }
}

export default OAuthCreatePage;
