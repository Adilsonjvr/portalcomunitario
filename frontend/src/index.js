import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Importe o arquivo CSS global, se houver
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
