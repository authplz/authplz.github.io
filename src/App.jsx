import React from 'react';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';

import './App.css';
import { logout } from './api/AuthPlz';

import CreateUserPage from './pages/CreateUser';
import LoginUserPage from './pages/LoginUser';
import AccountPage from './pages/Account';
import SecondFactorPage from './pages/SecondFactor';

import FidoRegisterPage from './pages/FidoRegister';
import FidoAuthorizePage from './pages/FidoAuthorize';

import OAuthCreatePage from './pages/OAuthCreate';
import OAuthAuthorizePage from './pages/OAuthAuthorize';
import ForgotPasswordPage from './pages/ForgotPassword';
import RecoverPasswordPage from './pages/RecoverPassword';

export default () => (
    <div>
        <div className="btn-group">
            <Link className="btn btn-secondary" to="/create">Create User</Link>
            <Link className="btn btn-secondary" to="/login">Login</Link>
            <Link className="btn btn-secondary" to="/account">Account</Link>
            <Link className="btn btn-secondary" to="/2fa">Choose 2fa</Link>
            <Link className="btn btn-secondary" to="/2fa-u2f-register">Register U2F token</Link>
            <Link className="btn btn-secondary" to="/2fa-u2f-authorize">U2F Authorize</Link>
            <Link className="btn btn-secondary" to="/oauth-create">Create OAuth Client</Link>
            <Link className="btn btn-secondary" to="/oauth-authorize">Authorize OAuth</Link>
            <button className="btn btn-secondary" onClick={logout}>Log out</button>
            <Link className="btn btn-secondary" to="/forgotpassword">forgot password</Link>
        </div>
        <div className="d-flex justify-content-center mt-5">
            <div style={{width: '400px'}}>
                <Switch>
                    <Route path="/create" component={CreateUserPage} />
                    <Route path="/login" component={LoginUserPage} />
                    <Route path="/account" component={AccountPage} />
                    <Route path="/2fa" component={SecondFactorPage} />
                    <Route path="/2fa-u2f-register" component={FidoRegisterPage} />
                    <Route path="/2fa-u2f-authorize" component={FidoAuthorizePage} />
                    <Route path="/oauth-create" component={OAuthCreatePage} />
                    <Route path="/oauth-authorize" component={OAuthAuthorizePage} />
                    <Route path="/forgotpassword" component={ForgotPasswordPage} />
                    <Route path="/recover" component={RecoverPasswordPage} />
                </Switch>
            </div>
        </div>
    </div>
);
