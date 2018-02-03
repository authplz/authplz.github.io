import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

import ScopeSelector from '../../components/ScopeSelector';

import {
    getPendingAuthorization,
    postAuthorizationAccept,
} from '../../api/AuthPlz';

const states = {
    LOADING: 'LOADING',
    PENDING: 'PENDING',
    FAILED: 'FAILED',
};

export default class OAuthAuthorizePage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            status: states.LOADING,
            url: 'fakeURL',
            name: 'fakeName',
            scopes: {
                'abc': false,
                '123': false
            },
            error: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        getPendingAuthorization()
            .then((resp) => {
                const {
                    scopes
                } = resp;
                this.setState({
                    status: states.PENDING,
                    url: resp.redirect_uri,
                    oauthStateString: resp.state,
                    name: resp.name,
                    id: resp.id,
                    requestedScopes: scopes,
                });
            })
            .catch(error => {
                this.setState({
                    error: error || 'UnknownError',
                    status: states.FAILED,
                });
            });
    }

    onSubmit() {
        postAuthorizationAccept(true, this.state.oauthStateString, this.state.scopes)
            .then(response => {
                window.location = response.location; // location is the return from OAuth service that states where to redirect back to
            })
            .catch(error => {
                this.setState({ error });
            });
    }

    onScopeToggle(scopes) {
        this.setState({ scopes });
    }

    render() {
        if (this.state.status === states.LOADING) {
            return (<BeatLoader />);
        } else if (this.state.status === states.FAILED) {
            return (
                <div>
                    {this.state.error}
                </div>
            )
        }

        return (
            <div>
                <h1>Requested permissions</h1>
                <div>
                    <h2>{this.props.name}</h2>
                    <a href={this.props.url}>{this.props.url}</a>

                    <ScopeSelector
                        scopes={this.state.requestedScopes}
                        default={false}
                        onChange={this.onScopeToggle}
                    />

                    <div className="d-flex justify-content-center">
                        <Link className="btn btn-secondary" to="/">
                            Cancel
                        </Link>
                        <button className="btn btn-primary" onClick={this.onSubmit}>
                            Authorize
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

OAuthAuthorizePage.propTypes = {
    //TODO: Wut is this?
    name: PropTypes.string,
    //TODO: Wut is this?
    url: PropTypes.string
};
