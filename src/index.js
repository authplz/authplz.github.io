import React from 'react';
import ReactDOM from 'react-dom';

import { IntlProvider } from 'react-intl';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import messages from './lang/en-nz';

const history = createBrowserHistory();

ReactDOM.render(
    <IntlProvider locale="en" messages={messages}>
        <Router history={history}>
            <App />
        </Router>
    </IntlProvider>
    , document.getElementById('root'),
);
registerServiceWorker();
