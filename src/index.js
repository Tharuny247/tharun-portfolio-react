import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Render the root React component into the #root div created in
// public/index.html.  Using createRoot enables React 18 concurrent
// features without the legacy render API.
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);