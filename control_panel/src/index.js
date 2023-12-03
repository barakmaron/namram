import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';

import './index.css';
import { store } from './redux/store';
import AppConnector from './AppConnector';

import "monday-ui-react-core/dist/main.css";
import 'primereact/resources/themes/saga-green/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <PrimeReactProvider>
                <AppConnector />
            </PrimeReactProvider>
        </BrowserRouter>
    </Provider>
);

