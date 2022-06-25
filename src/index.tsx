import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log('%c==============================', 'color:green');
console.log(
  '%cNODE_ENV: ',
  'font-weight: bold;color: green',
  process.env.NODE_ENV
);
console.log(
  '%cAPP_ENV: ',
  'font-weight: bold;color: green',
  process.env.APP_ENV
);
console.log('%c==============================', 'color:green');

const root = document.querySelector('#root');
if (root) {
  createRoot(root).render(<App />);
}
