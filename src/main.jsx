import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.scss';
import Router from './components/Router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
