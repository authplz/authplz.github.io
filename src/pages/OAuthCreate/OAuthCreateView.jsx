import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import TextInput from '../../components/TextInput';
import AlertView from '../../components/AlertView';
import ScopeSelector from '../../components/ScopeSelector';

class OAuthCreateView extends React.Component {
    constructor(props) {
        super(props);

        const scopes = {};
        this.props.scopes.forEach((scope) => {
            scopes[scope] = false;
        });

    // Create form state
        this.state = {
            name: '',
            url: '',
            grants: [],
            scopes,
            errors: {},
        };

        this.handleScopeChange = this.handleScopeChange.bind(this);
        this.handleGrantChange = this.handleGrantChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleScopeChange(scopes) {
        this.setState({ scopes });
    }

    handleGrantChange(grants) {
        this.setState({ grants });
    }

    handleURLChange(e) {
        this.setState({ url: e.target.value });
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handleSubmit() {
        this.props.onSubmit(this.state);
    }

    handleCancel() {
        this.props.onCancel(this.state);
    }

    render() {
        return (
            <div>
                <h1>OAuth Client Creation</h1>

                <TextInput
                    id="name"
                    labelText="Client Name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                    fullWidth
                    errorText={this.props.errors.name}
                />
                <TextInput
                    id="url"
                    labelText="Client URL (redirect)"
                    value={this.state.url}
                    onChange={this.handleURLChange}
                    fullWidth
                    errorText={this.props.errors.url}
                />

                <h3>Scopes</h3>
                <ScopeSelector
                  scopes={this.props.scopes}
                  default={false}
                  onChange={this.handleScopeChange}
                />

                <h3>Grants</h3>
                <ScopeSelector
                  scopes={this.props.grants}
                  default={false}
                  onChange={this.handleGrantChange}
                />

                <AlertView alert={this.props.alert} />

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Link to="/" className="btn btn-secondary">
                        Cancel
                    </Link>
                    <button onClick={this.handleSubmit} className="btn btn-primary">
                        Create
                    </button>
                </div>
            </div>
        );
    }
}

OAuthCreateView.propTypes = {
    scopes: PropTypes.arrayOf(PropTypes.string).isRequired,
    alert: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    grants: PropTypes.arrayOf(PropTypes.string).isRequired,
    errors: PropTypes.object,
};

export default OAuthCreateView;
