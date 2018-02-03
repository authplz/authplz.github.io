import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { FormattedRelative } from 'react-intl';

import AlertView from '../../components/AlertView';


export default class OAuthClientView extends PureComponent {
    render() {
        const props = this.props;

        if ((typeof props.client === 'undefined') || (props.client === null)) {
            return (
                <div>
                    <p>No client property available</p>
                </div>
            );
        }

        return (
            <div>
                <h1>Client: {props.client.name}</h1>

                <h3>Client ID:</h3>
                <p>{props.client.id}</p>
                <div hidden={!props.client.secret}>
                    <h3>Secret:</h3>
                    <p>{props.client.secret}</p>
                    <p>IMPORTANT: This secret will only be displayed once.</p>
                </div>

                <table>
                    <tbody>
                        <tr>
                            <td>Scopes</td>
                            <td>{props.client.scopes.join(', ')}</td>
                        </tr>
                        <tr>
                            <td>Redirects</td>
                            <td>{props.client.redirects.join(', ')}</td>
                        </tr>
                        <tr>
                            <td>Grants</td>
                            <td>{props.client.grants.join(', ')}</td>
                        </tr>
                        <tr>
                            <td>Created At</td>
                            <td>
                                <FormattedRelative value={props.client.created_at} />
                            </td>
                        </tr>
                        <tr>
                            <td>Last Update</td>
                            <td>
                                <FormattedRelative value={props.client.updated_at} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <AlertView alert={props.alert} />

            </div>
        );
    }
}

OAuthClientView.propTypes = {
    client: PropTypes.object.isRequired,
    alert: PropTypes.string,
};
