
import React from 'react';
import PropTypes from 'prop-types';

const SecondFactorLink = props =>
    <div>
        <a href={props.info.link}><h3>{props.info.type}</h3></a>
        <p>{props.info.description}</p>
    </div>;

SecondFactorLink.propTypes = {
    info: PropTypes.object.isRequired,
};


const SecondFactorPicker = props =>
    <div>
        <h1>Second Factor Authentication Required</h1>
        <p>Please select one of the following factors:</p>
        <div hidden={!props.u2f}><SecondFactorLink info={SecondFactorPicker.u2fInfo} /></div>
        <div hidden={!props.totp}><SecondFactorLink info={SecondFactorPicker.totpInfo} /></div>
        <div hidden={!props.backup}><SecondFactorLink info={SecondFactorPicker.backupInfo} /></div>
    </div>;

SecondFactorPicker.propTypes = {
    u2f: PropTypes.bool.isRequired,
    totp: PropTypes.bool.isRequired,
    backup: PropTypes.bool.isRequired,
};

SecondFactorPicker.u2fInfo = {
    type: 'Universal Second Factor (U2F/FIDO)',
    description: 'Authenticate using a U2F (or FIDO) Token such as a Yubikey',
    link: '#/2fa-u2f-authorize',
};
SecondFactorPicker.totpInfo = {
    type: 'Time based One Time Pad (TOTP)',
    description: 'Authenticate using a TOTP application such as Google Authenticator',
    link: '#/2fa-totp-authorize',
};

SecondFactorPicker.backupInfo = {
    type: 'Backup Code',
    description: 'Authenticate using an offline backup code',
    link: '#/2fa-backup-authorize',
};

export { SecondFactorPicker, SecondFactorLink };
