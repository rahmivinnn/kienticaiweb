"use client";

import React from 'react';

// Define window.gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: {
        [key: string]: any;
      }
    ) => void;
  }
}

// Page view tracking
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
      page_path: url,
    });
  }
};

// Event tracking
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// User tracking
export const trackUser = (userId: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', { user_id: userId });
  }
};

// Conversion tracking
export const trackConversion = (
  conversionId: string,
  label: string,
  value?: number,
  currency?: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}/${conversionId}`,
      value: value,
      currency: currency || 'USD',
      transaction_id: label,
    });
  }
};

// Feature usage tracking
export const trackFeatureUsage = (featureName: string, metadata?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'feature_use', {
      feature_name: featureName,
      ...metadata,
    });
  }
};

// Error tracking
export const trackError = (
  errorType: string,
  errorMessage: string,
  errorCode?: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: `${errorType}: ${errorMessage}`,
      fatal: false,
      error_code: errorCode,
    });
  }
};

// Timing tracking
export const trackTiming = (
  category: string,
  variable: string,
  value: number,
  label?: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: variable,
      value: value,
      event_category: category,
      event_label: label,
    });
  }
};

// Initialize analytics
export const initAnalytics = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
      send_page_view: false, // We'll handle page views manually
    });
  }
};

// Analytics hook for page views
export const usePageViewTracking = (path: string) => {
  React.useEffect(() => {
    trackPageView(path);
  }, [path]);
};
