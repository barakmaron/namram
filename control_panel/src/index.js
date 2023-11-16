import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppConnector from './AppConnector';
import "monday-ui-react-core/dist/main.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store={store}>
    <BrowserRouter>
      <AppConnector />
    </BrowserRouter>
 </Provider>
);

