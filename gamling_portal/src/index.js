import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { SessionDataContextProvider, ToolTipsContextProvider, UserDataContextProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
/*
<React.StrictMode>
</React.StrictMode>
*/
root.render(
    <SessionDataContextProvider>
        <UserDataContextProvider>
            <ToolTipsContextProvider>
                <App />
            </ToolTipsContextProvider>
        </UserDataContextProvider>
    </SessionDataContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
