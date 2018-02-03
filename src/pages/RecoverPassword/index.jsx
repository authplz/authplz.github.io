
import React from 'react';

import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

import TextInput from '../../components/TextInput';
import {
    getRecovery,
    passwordReset,
} from '../../api/AuthPlz';

import {
    validatePassword,
    validateConfirmPassword,
} from './helpers';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

const states = {
    LOADING: 'LOADING',
    STASIS: 'STASIS',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    INVALID_TOKEN: 'INVALID_TOKEN',
};

class RecoverPasswordPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            confirmPassword: '',
            passwordError: null,
            confirmPasswordError: null,
            result: null,
            status: states.LOADING,
        };
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const recoveryToken = params.get('token');
        getRecovery({ token: recoveryToken })
            .then(() => this.setState({
                status: states.STASIS,
            }))
            .catch(error => this.setState({
                status: states.INVALID_TOKEN,
                error,
            }));
    }

    onSubmit = () => {
        this.setState(prevState => ({
            passwordError: validatePassword(prevState.password),
            confirmPasswordError: validateConfirmPassword(prevState.password, prevState.confirmPassword),
        }), () => {
            const state = this.state;
            if (state.passwordError == null && state.confirmPasswordError == null) {
                passwordReset({ password: this.state.password })
                    .then(response => this.setState({
                        status: states.SUCCESS
                    }))
                    .catch(error => this.setState({
                        status: states.ERROR,
                        error,
                    }));
            }
        });
    }

    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.onSubmit(this.state);
        }
    }

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(prevState => {
            const passwordError = prevState.passwordError != null
                ? validatePassword(password)
                : null;
            const confirmPasswordError = prevState.confirmPasswordError != null
                ? validatePassword(password, prevState.confirmPassword)
                : null;
            return {
                passwordError,
                confirmPasswordError,
                password,
            }
        });
    }

    onConfirmPasswordChange = (e) => {
        const confirmPassword = e.target.value;
        this.setState(prevState => {
            const confirmPasswordError = prevState.confirmPasswordError != null
                ? validatePassword(prevState.password, confirmPassword)
                : null;
            return {
                confirmPasswordError,
                confirmPassword,
            }
        });
    }

    render() {
        const { intl } = this.props;
        switch(this.state.status) {
        case states.LOADING:
            return (
                <BeatLoader />
            );
        case states.SUCCESS:
            return (
                <div>
                    <h3 className="mb-4">
                        <FormattedMessage id="RECOVER_PASSWORD_SUCCESS_HEADER" />
                    </h3>
                    <FormattedMessage id="RECOVER_PASSWORD_SUCCESS" />
                    <Link to="/login" className="btn btn-primary btn-block mt-3">
                        <FormattedMessage id="RECOVER_PASSWORD_SUCCESS_LOGIN_BUTTON" />
                    </Link>
                </div>
            );
        case states.ERROR:
            return (
                <div>
                    <h3 className="mb-4">
                        <FormattedMessage id="RECOVER_PASSWORD_FAIL_HEADER" />
                    </h3>
                    <FormattedMessage id="RECOVER_PASSWORD_FAIL" />
                    <Link to="/forgotpassword" className="btn btn-primary btn-block mt-3">
                        <FormattedMessage id="RECOVER_PASSWORD_FAIL_RETRY_BUTTON" />
                    </Link>
                </div>
            );
        case states.STASIS:
            return (
                <fieldset onKeyDown={this.onKeyDown}>
                    <h3 className="mb-4">
                        <FormattedMessage id="PASSWORD_RESEST_HEADER" />
                    </h3>
                    <TextInput
                      className="form-group"
                      labelText={intl.formatMessage({id: 'PASSWORD_LABEL'})}
                      value={this.state.password}
                      onChange={this.onPasswordChange}
                      errorText={this.state.passwordError != null ? intl.formatMessage({id: this.state.passwordError}) : null}
                      type="password"
                    />

                    <TextInput
                      className="form-group"
                      labelText={intl.formatMessage({id: 'CONFIRM_PASSWORD_LABEL'})}
                      value={this.state.confirmPassword}
                      onChange={this.onConfirmPasswordChange}
                      errorText={this.state.confirmPasswordError != null ? intl.formatMessage({id: this.state.confirmPasswordError}) : null}
                      type="password"
                    />

                    <button onClick={this.onSubmit} className="btn btn-primary btn-block mt-3">
                        <FormattedMessage id="PASSWORD_RESET_SUBMIT_BUTTON" />
                    </button>
                </fieldset>
            );
        case states.INVALID_TOKEN:
        default:
            return (
                <div>
                    <h3 className="mb-4">
                        <FormattedMessage id="RECOVER_PASSWORD_INVALID_TOKEN_HEADER" />
                    </h3>
                    <FormattedMessage id="RECOVER_PASSWORD_INVALID_TOKEN" />
                    <Link to="/forgotpassword" className="btn btn-primary btn-block mt-3">
                        <FormattedMessage id="RECOVER_PASSWORD_FAIL_RETRY_BUTTON" />
                    </Link>
                </div>
            );
        }
    }
}

RecoverPasswordPage.propTypes = {
    intl: intlShape,
};

export default injectIntl(RecoverPasswordPage);
