import * as Sentry from '@sentry/astro';

Sentry.init({
    dsn: import.meta.env.PUBLIC_SENTRY_DSN,

    // Enable in all environments (set to import.meta.env.PROD for production-only)
    enabled: true,

    // Capture 100% of transactions for performance monitoring
    // Adjust this in production based on your needs
    tracesSampleRate: 1.0,

    // Capture Replay for 10% of all sessions,
    // plus 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    integrations: [
        Sentry.replayIntegration({
            // Mask all text to protect user privacy
            maskAllText: true,
            blockAllMedia: true,
        }),
    ],

    // Set environment
    environment: import.meta.env.MODE,
});
