export function reportTelemetry(event: string, payload: Record<string, unknown> = {}) {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify({ event, ...payload }),
  }).catch(() => {
    // Intentionally silent failover.
  });
}
