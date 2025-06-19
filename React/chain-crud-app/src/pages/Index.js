import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home'; // or App if you're using an App.js file
import './Home.css'; // keep this if you need styling for Home

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
