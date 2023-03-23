import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LogIn from './components/LogIn'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <LogIn/>
  </React.StrictMode>
);


