
import {
    isEmail,
} from 'validator';

import {
    emailErrors,
} from './constants';

export const validateEmail = email => {
    if (email == null || email === '') {
        return emailErrors.EMAIL_EMPTY;
    } else if (!isEmail(email)) {
        return emailErrors.EMAIL_INVALID;
    }
}
