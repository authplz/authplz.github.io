import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle-switch';

class ScopeSelector extends React.Component {
    constructor(props) {
        super(props);

        // Create form state
        this.state = {
            scopes: this.props.scopes.reduce((scopes, scope) => ({
                ...scopes,
                [scope]: this.props.default,
            }), {}),
        };
    }

    onScopeChange = (scope) => {
        const scopes = this.state.scopes;
        scopes[scope] = !scopes[scope];
        this.setState(prevState => ({
            ...prevState.scopes,
            [scope]: !prevState.scopes[scope],
        }), () => {
            const enabledScopes = Object.keys(scopes)
                .filter(scope => this.state.scopes[scope]);
            console.log(enabledScopes);
            this.props.onChange(enabledScopes);
        });
    }

    render() {
        return (
            <div>
                {this.props.scopes && this.props.scopes.map(scope =>
                    <div key={scope}>
                        {scope}
                        <Toggle
                            on={this.state.scopes[scope]}
                            onClick={() => this.onScopeChange(scope)}
                        />
                    </div>
                )}
            </div>
        );
    }
}

// Require a scopes array and onchange function
ScopeSelector.propTypes = {
    default: PropTypes.bool.isRequired,
    scopes: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default ScopeSelector;
