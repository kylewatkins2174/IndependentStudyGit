import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MapContextProvider} from "./Contexts/showMapContext";
import {FacilityContextProvider} from "./Contexts/FacilityContext";
import {ContactContextProvider} from "./Contexts/ContactContext";
import {AuthContextProvider} from "./Contexts/AuthContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <FacilityContextProvider>
    <ContactContextProvider>
    <MapContextProvider>
    <App />
    </MapContextProvider>
    </ContactContextProvider>
    </FacilityContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();