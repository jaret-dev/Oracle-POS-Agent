"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, { error: null as string | null });

  return (
    <main className="min-h-screen grid place-items-center">
      <form
        action={action}
        className="w-full max-w-sm bg-panel border border-border rounded-lg p-6 space-y-4"
      >
        <header className="space-y-1">
          <h1 className="text-xl font-semibold">Oracle POS Support</h1>
          <p className="text-sm text-mute">Internal tool. Harvey&apos;s staff only.</p>
        </header>
        <label className="block space-y-1">
          <span className="text-sm text-mute">Username</span>
          <input
            name="username"
            autoComplete="username"
            required
            className="w-full bg-bg border border-border rounded px-3 py-2 outline-none focus:border-accent"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm text-mute">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full bg-bg border border-border rounded px-3 py-2 outline-none focus:border-accent"
          />
        </label>
        {state.error && (
          <p className="text-sm text-err border border-err/40 rounded px-3 py-2 bg-err/5">
            {state.error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="w-full bg-accent hover:bg-accentMute disabled:opacity-60 text-bg font-medium rounded px-3 py-2"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
