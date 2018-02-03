import React from 'react';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { BeatLoader } from 'react-spinners';

import TextInput from '../../components/TextInput';
import { accountRecovery } from '../../api/AuthPlz';

import {
    validateEmail,
} from './helpers';

const states = {
    STASIS: 'STASIS',
    LOADING: 'LOADING',
    SENT: 'SENT',
    FAILED: 'FAILED',
};

class ForgotPasswordPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            email: '',
            emailError: null,
            status: states.STASIS,
        };
    }

    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.onSubmit();
        }
    }

    handleEmailChange = (e) => {
        const email = e.target.value;
        this.setState(prevState => ({
            email,
            emailError: prevState.emailError ?
                validateEmail(email)
                : null,
        }));
    }

    onSubmit = () => {
        this.setState(prevState => ({
            emailError: validateEmail(prevState.email),
        }), () => {
            this.setState(() => ({
                status: states.LOADING
            }), () => {
                if (this.state.emailError == null) {
                    accountRecovery(this.state.email)
                    .then(res => this.setState({
                        status: states.SENT
                    }))
                    .catch(error => this.setState({
                        status: states.FAILED,
                        error
                    }));
                }
            });
        });
    }

    render() {
        const {
            email,
            emailError,
            status
        } = this.state;
        const { intl } = this.props;

        switch(status) {
        case states.FAILED:
            return (
                <FormattedMessage id="FORGOT_PASSWORD_EMAIL_FAILED" />
            );
        case states.LOADING: 
            return (
                <BeatLoader />
            );
        case states.SENT:
            return (
                <div>
                    <h3>
                        <FormattedMessage id="FORGOT_PASSWORD_EMAIL_SENT_HEADER" />
                    </h3>
                    <FormattedMessage id="FORGOT_PASSWORD_EMAIL_SENT" />
                </div>
            );
        case states.STASIS:
        default:
            return (
                <fieldset onKeyDown={this.onKeyDown}>
                    <h3>
                        <FormattedMessage id="FORGOT_PASSWORD_HEADER" />
                    </h3>
                    <TextInput
                        id="email"
                        labelText={intl.formatMessage({id: 'EMAIL_LABEL'})}
                        value={email}
                        onChange={this.handleEmailChange}
                        errorText={emailError}
                    />
                    <div className="flex-column align-items-center pt-2">
                        <button onClick={this.onSubmit} className="btn btn-primary btn-block">
                            <FormattedMessage id="FORGOT_PASSWORD_BUTTON_TEXT" />
                        </button>
                    </div>
                </fieldset>
            );
        }
    }
}

ForgotPasswordPage.propTypes = {
    intl: intlShape
}

export default injectIntl(ForgotPasswordPage);
