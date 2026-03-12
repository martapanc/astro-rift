import * as Sentry from '@sentry/astro';

Sentry.init({
    dsn: import.meta.env.PUBLIC_SENTRY_DSN,

    // Only enable in production
    enabled: import.meta.env.PROD,

    // Capture 100% of transactions for performance monitoring
    // Adjust this in production based on your needs
    tracesSampleRate: 1.0,

    // Set environment
    environment: import.meta.env.MODE,
});
