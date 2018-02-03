import React from 'react';

import TextInput from '../../components/TextInput';
import { BeatLoader } from 'react-spinners';

import AlertView from '../../components/AlertView';

import {
    getU2FTokenEnrolment,
    postU2FTokenEnrolment
} from '../../api/AuthPlz';
import { u2f } from '../../lib/u2f-api';

class FidoRegisterPage extends React.Component {

    constructor(props) {
        super(props);
    // Create form state
        this.state = {
            name: '',
            error: '',
            pending: false,
            retry: false,
            stateIndex: 0,
            done: false,
            request: {},
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    onSubmit() {
    // Request registration
        getU2FTokenEnrolment(this.state.name).then((req) => {
            console.log('Got registration request');
            console.log(req);
            u2f.register(req.appId,
              req.registerRequests,
              req.registeredKeys || [],
              this.handleRegistrationResponse,
              10);
            this.setState({ stateIndex: 1, pending: true, retry: false, request: req });
        }, () => {
            this.setState({ error: 'Error fetching challenge from server' });
        });
    }

    // Handle form changes
    onRetry() {
        const req = this.state.request;
        u2f.register(
          req.appId,
          req.registerRequests,
          req.registeredKeys || [],
          this.handleRegistrationResponse,
          60);
        this.setState({ stateIndex: 1, error: '', pending: true, retry: false, request: req });
    }

    onCancel() {
        this.setState({ stateIndex: 0, pending: false });
    }

    // Handle a registration response from the token
    handleRegistrationResponse(resp) {
        console.log('Got registration response');

        // Check for errors
        if (typeof resp.errorCode !== 'undefined') {
            console.log(resp);

            let message = 'U2F Internal Error';
            switch (resp.errorCode) {
            case 1: message = resp.errorMessage; break;
            case 2: message = 'Bad U2F Request'; break;
            case 3: message = 'U2F Configuration Unsupported'; break;
            case 4: message = 'U2F Device ineligible'; break;
            case 5: message = 'U2F Request Timeout'; break;
            default: message = 'U2F Unknown Error';
            }

            this.setState({ pending: false, retry: true, error: message });
            return;
        }

        // Return response to server
        postU2FTokenEnrolment(resp).then(() => {
            console.log('Enrolment complete');
            this.setState({ done: true, stateIndex: 2 });
        }, (err) => {
            console.log(err);
            this.setState({ pending: false, error: 'Error posting enrolment to server' });
        });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.onSubmit();
        }
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    render() {
        const enterNameStep = (
            <div>
                
                <TextInput
                    labelText="Enter a name for the new U2F Token"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                />
                <AlertView alert={this.state.error} />
                <button onClick={this.onSubmit} className="btn btn-primary">
                    Next
                </button>
            </div>
        );

        const securityKeyStep = (
            <div>
                <h1>Insert your security key</h1>
                <p>
                    If your device has a button please press it, otherwise remove and reinsert the device
                </p>
                <div hidden={!this.state.pending}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <BeatLoader />
                    </div>
                </div>
                <AlertView alert={this.state.error} />
                <div hidden={!this.state.retry}>
                    <button onClick={this.onRetry} className="btn btn-primary">
                        Retry
                    </button>
                </div>
            </div>
        );

        const registrationCompleteStep = (
            <div>
                <h1>U2F Registration Complete</h1>
                <p>
                    Successfully enrolled device: {this.state.name}
                </p>
            </div>
        );

        return (
            <div>
                {this.state.stateIndex === 0 && enterNameStep}
                {this.state.stateIndex === 1 && securityKeyStep}
                {this.state.stateIndex === 2 && registrationCompleteStep}
            </div>
        );
    }
}

export default FidoRegisterPage;
