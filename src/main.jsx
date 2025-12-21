import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import {store,persistor} from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

// Register service worker for PWA functionality


// Web Vitals monitoring
function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log('Web Vital:', metric);
  
  // Example: Send to Google Analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true
    });
  }
  
  // Send to your backend for monitoring
  fetch('/api/analytics/web-vitals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(metric)
  }).catch(error => {
    console.warn('Failed to send web vitals:', error);
  });
}

// Initialize Web Vitals monitoring
onCLS(sendToAnalytics);
onFID(sendToAnalytics);
onFCP(sendToAnalytics);
onLCP(sendToAnalytics);
onTTFB(sendToAnalytics);
