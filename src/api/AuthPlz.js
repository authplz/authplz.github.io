import {
    getApi,
    getJson,
    postForm,
    postJson,
    credentials,
    baseUrl
} from './helpers';

export const status = () => getApi('/api/status');

export const createUser = ({ email, username, password }) =>
    postForm('/api/create', { username, email, password });

export const login = ({ email, password }) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return fetch(`${baseUrl}/api/login`, {
        method: 'post',
        credentials: credentials,
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            return response.json().then(data => ({
                ...response,
                data,
                isTwoFactor: response.status === 202
            }));
        }
        return response
            .json()
            .then(data => {
                throw data.code || 'UNKNOWN_ERROR'
            });
    });
}

export const logout = () =>
    fetch(`${baseUrl}/api/logout`, {
        method: 'post',
        credentials: credentials,
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw response.json().then(data => data.code || 'UNKNOWN_ERROR');
    });

export const account = () =>
    getJson('/api/account');

export const passwordReset = data =>
    postForm('/api/reset', data);

export const accountRecovery = (email) =>
    postForm('/api/recovery', { email: encodeURI(email) });

export const getRecovery = data =>
    getApi('/api/recovery', data)

    // 2FA things

    // Fetch a U2F token enrolment challenge
export const getU2FTokenEnrolment = (name) =>
    getJson('/api/u2f/enrol', { name });

    // Post a U2F token enrolment response
export const postU2FTokenEnrolment = (resp) =>
    postJson('/api/u2f/enrol', resp);

    // Fetch a U2F token authorization challenge
export const getU2FTokenAuthorize = () =>
    getJson('/api/u2f/authenticate');

    // Post a U2F token authorization response
export const postU2FTokenAuthorize = (resp) =>
    postJson('/api/u2f/authenticate', resp);

    // Fetch a TOTP enrolment challenge
export const getTOTPTokenEnrolment = (name) =>
    getJson('/api/totp/enrol', { name });

    // Post a TOTP enrolment response (code generated from challenge secret)
export const postTOTPTokenEnrolment = (code) =>
    postJson('/api/totp/enrol', { code });

    // Post a TOTP authorization
export const PostTOTPTokenAuthorize = (code) =>
    postJson('/api/totp/authorize', { code });

    // Post a backup code authorization
export const postBackupCodeAuthorize = (code) =>
    postJson('/api/backupcode/authorize', { code });

    // OAuth things

    // Fetch OAuth client options
export const getOAuthOptions = () =>
    getJson('/api/oauth/options');

    // Post a response to an authorization request
export const createOauthClient = (name, url, scopes, grants, responses) =>
    postJson('/api/oauth/clients', {
        name,
        redirects: [url],
        scopes,
        grant_types: grants,
        response_types: responses,
    });

    // Fetch a pending OAuth authorization
export const getPendingAuthorization = () =>
    getJson('/api/oauth/pending');

    // Post a response to an authorization request
export const postAuthorizationAccept = (accept, oauthStateString, scopes) =>
    postJson('/api/oauth/auth', {
        accept,
        state: oauthStateString,
        granted_scopes: scopes
    });
