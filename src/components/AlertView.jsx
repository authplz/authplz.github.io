import React from 'react';
import PropTypes from 'prop-types';

const AlertView = props =>
    <div>
        <p hidden={!props.alert}>{props.alert}</p>
    </div>;

AlertView.propTypes = {
    alert: PropTypes.string,
};

AlertView.defaultProps = {
    alert: '',
};

export default AlertView;
