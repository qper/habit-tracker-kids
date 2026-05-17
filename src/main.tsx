import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Register PWA Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(
    new URL('virtual:pwa-register', import.meta.url),
    { scope: import.meta.env.BASE_URL }
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
