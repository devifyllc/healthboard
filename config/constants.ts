/**
 * Global, developer-configurable defaults for the health monitor.
 * Change these values (and rebuild) to retune polling behavior.
 */

/** How often applications are re-checked, in seconds. */
export const DEFAULT_CHECK_INTERVAL_SECONDS = 300

/** How long to wait for a response before marking a check as DOWN, in seconds. */
export const DEFAULT_CHECK_TIMEOUT_SECONDS = 10

/** Response time (ms) at or above which a successful check is shown as DEGRADED instead of UP. */
export const DEGRADED_RESPONSE_TIME_MS = 2500

/** Number of most recent check results kept per application for uptime calculation. */
export const HISTORY_SIZE = 100
