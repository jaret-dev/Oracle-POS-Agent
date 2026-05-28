import { db } from "@/db/client";
import { errorLog } from "@/db/schema";

type Severity = "info" | "warn" | "error" | "fatal";

type LogOpts = {
  severity: Severity;
  source: string;
  message: string;
  stack?: string;
  requestContext?: Record<string, unknown>;
  userId?: string;
};

/**
 * Fail-loud logger. Writes to the error_log table AND stderr/stdout.
 * Designed so a swallowed exception is impossible: if the DB write itself
 * fails, the original error is rethrown and the DB failure is logged too.
 */
export async function logError(opts: LogOpts): Promise<void> {
  const line = `[${opts.severity}] ${opts.source}: ${opts.message}`;
  if (opts.severity === "error" || opts.severity === "fatal") {
    console.error(line);
    if (opts.stack) console.error(opts.stack);
  } else if (opts.severity === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }

  try {
    await db.insert(errorLog).values({
      severity: opts.severity,
      source: opts.source,
      message: opts.message,
      stack: opts.stack,
      requestContext: opts.requestContext ?? null,
      userId: opts.userId ?? null,
    });
  } catch (dbErr) {
    console.error("[log] failed to persist to error_log:", dbErr);
    // Don't rethrow — we don't want logging to mask the original failure.
  }
}

/** Wraps a route handler so any thrown error gets logged before being rethrown. */
export function withErrorLog<T extends (...args: unknown[]) => Promise<Response>>(
  source: string,
  handler: T
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await handler(...args);
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      await logError({
        severity: "error",
        source,
        message: err.message,
        stack: err.stack,
      });
      throw err;
    }
  }) as T;
}
