import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import Store from "./redux/store";
import {Provider} from "react-redux";
import {GoogleOAuthProvider} from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="1004137847361-3p3lh814vts1f6ts9e2al867rjrjp9gc.apps.googleusercontent.com">
        <Provider store={Store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </GoogleOAuthProvider>
);

reportWebVitals();
