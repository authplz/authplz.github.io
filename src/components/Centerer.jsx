import React from 'react';
import PropTypes from 'prop-types';

const Centerer = props => (
    <div style={{ display: 'flex', maxWidth: '500px', margin: '32px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {props.children}
    </div>
);

Centerer.propTypes = {
    children: PropTypes.node,
};

export default Centerer;
