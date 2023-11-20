/// <reference types="vite/client" />
declare global {
  interface Window {
    fetch: vitest.Mock;
  }
}
