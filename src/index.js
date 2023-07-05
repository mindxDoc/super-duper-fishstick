import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import '@fortawesome/fontawesome-svg-core/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = "https://book-review-gamma.vercel.app"

root.render(
  <App />
);
