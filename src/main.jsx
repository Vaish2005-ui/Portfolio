import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Using './' prefix
import './index.css'; // Using './' prefix

// Use ReactDOM to create a root element and render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode helps highlight potential problems in an application
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);