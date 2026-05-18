import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom'
import App from './App'
import { HelmetProvider } from 'react-helmet-async'

// Disable console logs in production
if (import.meta.env.PROD) {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  console.warn = () => {};
}

// CRITICAL: Set React on window for production build stability
// This prevents "Uncaught ReferenceError: React is not defined" in built chunks
if (typeof window !== 'undefined') {
  (window as any).React = React;
}

// Shim for React 19 findDOMNode removal (required by react-quill)
if (!(ReactDOM as any).findDOMNode) {
  (ReactDOM as any).findDOMNode = (el: any) => {
    return el instanceof HTMLElement ? el : null;
  };
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>,
  )
}
