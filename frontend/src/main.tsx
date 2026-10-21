import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './shared/components/ErrorBoundary';
import { MockProvider } from './mock/MockContext';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <MockProvider>
        <App />
      </MockProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
