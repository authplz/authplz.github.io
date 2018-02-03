import {
    isAlphanumeric,
    isEmail,
} from 'validator';

import zxcvbn from 'zxcvbn';

import {
    usernameErrors,
    emailErrors,
    passwordErrors,
    confirmPasswordErrors,
} from './constants';

export const validateUsername = (username) => {
    // TODO: could / should? validate username existence here
    if (username == null || username === '') {
        return usernameErrors.USERNAME_EMPTY;
    } else if (!isAlphanumeric(username)) {
        return usernameErrors.USERNAME_NOT_ALPHANUMERIC;
    }
}

export const validateEmail = email => {
    if (email == null || email === '') {
        return emailErrors.EMAIL_EMPTY;
    } else if (!isEmail(email)) {
        return emailErrors.EMAIL_INVALID;
    }
}

export const validatePassword = password => {
    if (password == null || password === '') {
        return passwordErrors.PASSWORD_EMPTY;
    } else if (zxcvbn(password).score < 4) {
        return passwordErrors.PASSWORD_INVALID;
    }
}

export const validateConfirmPassword = (password, confirmPassword) => {
    if (confirmPassword == null || confirmPassword === '') {
        return confirmPasswordErrors.CONFIRM_PASSWORD_EMPTY;
    } else if (password !== confirmPassword) {
        return confirmPasswordErrors.PASSWORD_MISMATCH;
    }
}
