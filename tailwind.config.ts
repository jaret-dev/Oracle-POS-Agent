import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0d10",
        panel: "#121519",
        border: "#1f242b",
        ink: "#e7ebf0",
        mute: "#8b949e",
        accent: "#ff6a00",
        accentMute: "#a64600",
        ok: "#3fb950",
        warn: "#d29922",
        err: "#f85149",
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
