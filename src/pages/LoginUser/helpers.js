
import {
    isEmail,
} from 'validator';

import {
    emailErrors,
    passwordErrors,
} from './constants';

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
    }
}