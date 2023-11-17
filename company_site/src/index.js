import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { store } from './redux/store';
import App from './App';
import "monday-ui-react-core/dist/main.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
 </Provider>
);
