export default function LoginPage() {
  return (
    <main className="min-h-screen grid place-items-center">
      <form
        action="/api/auth/callback/credentials"
        method="POST"
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
        <button
          type="submit"
          className="w-full bg-accent hover:bg-accentMute text-bg font-medium rounded px-3 py-2"
        >
          Sign in
        </button>
        <p className="text-xs text-mute">
          Auth wiring is stubbed in Phase 1. NextAuth credentials provider lands in Phase 3.
        </p>
      </form>
    </main>
  );
}
