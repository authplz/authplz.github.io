
import React from 'react';

import TextInput from '../../components/TextInput';
import AlertView from '../../components/AlertView';

import { createUser } from '../../api/AuthPlz';
import { Link } from 'react-router-dom';

import {
    validateUsername,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
} from './helpers';

class CreateUserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            usernameError: null,
            emailError: null,
            passwordError: null,
            confirmPasswordError: null,
            result: null,
        };
    }

    onSubmit = () => {
        this.setState(prevState => ({
            usernameError: validateUsername(prevState.username),
            emailError: validateEmail(prevState.email),
            passwordError: validatePassword(prevState.password),
            confirmPasswordError: validateConfirmPassword(prevState.password, prevState.confirmPassword),
        }), () => {
            const state = this.state;
            const formIsValid = (
                state.usernameError == null
                && state.emailError == null
                && state.passwordError == null
                && state.confirmPasswordError == null
            );

            if (formIsValid) {
                createUser({
                    email: this.state.email,
                    username: this.state.username,
                    password: this.state.password
                })
                    .then(response => this.setState({ result: response.message }))
                    .catch(error => this.setState({ error }));
            }
        });
    }

    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.onSubmit(this.state);
        }
    }

    onUsernameChange = (e) => {
        const username = e.target.value;
        this.setState(prevState => {
            const usernameError = prevState.usernameError != null
                ? validateUsername(username)
                : null;
            return {
                usernameError,
                username,
            }
        });
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(prevState => {
            const emailError = prevState.emailError != null
                ? validateEmail(email)
                : null;
            return {
                emailError,
                email,
            }
        });
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
        return (
            <fieldset onKeyDown={this.onKeyDown}>
                <TextInput
                  className="form-group"
                  labelText="Username"
                  value={this.state.username}
                  onChange={this.onUsernameChange}
                  errorText={this.state.usernameError}
                />

                <TextInput
                  className="form-group"
                  labelText="Email"
                  value={this.state.email}
                  onChange={this.onEmailChange}
                  errorText={this.state.emailError}
                />

                <TextInput
                  className="form-group"
                  labelText="Password"
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                  errorText={this.state.passwordError}
                  type="password"
                />

                <TextInput
                  className="form-group"
                  labelText="Password (again)"
                  value={this.state.confirmPassword}
                  onChange={this.onConfirmPasswordChange}
                  errorText={this.state.confirmPasswordError}
                  type="password"
                />

                <AlertView alert={this.state.result} />

                <div className="flex-column align-items-center pt-2">
                    <button onClick={this.onSubmit} className="btn btn-primary btn-block">
                        Create
                    </button>
                    <Link to="/login" className="btn btn-link d-block mt-2">
                        Existing Account
                    </Link>
                </div>
            </fieldset>
        );
    }
}

export default CreateUserPage;
