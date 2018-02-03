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
