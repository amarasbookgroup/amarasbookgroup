// jest-dom matchers register globally on `expect` and are safe to import in
// any environment.
import "@testing-library/jest-dom/vitest";

// DOM-only shims, gated on `window` so node-environment tests (the prerender
// script tests) don't crash on the missing globals.
if (typeof window !== "undefined") {
  // jsdom doesn't implement layout APIs that the gallery relies on. A no-op
  // is fine since we never assert on scroll position.
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = function scrollIntoView() {};
  }
  if (!window.scrollTo) {
    window.scrollTo = function scrollTo() {};
  }

  // jsdom 29 occasionally exposes a `localStorage` whose methods aren't
  // callable on the default URL ("about:blank"). Replace with a deterministic
  // in-memory implementation so tests are stable regardless of host config.
  const createMemoryStorage = () => {
    const store = new Map();
    return {
      get length() {
        return store.size;
      },
      key(i) {
        return Array.from(store.keys())[i] ?? null;
      },
      getItem(k) {
        return store.has(k) ? store.get(k) : null;
      },
      setItem(k, v) {
        store.set(String(k), String(v));
      },
      removeItem(k) {
        store.delete(k);
      },
      clear() {
        store.clear();
      },
    };
  };

  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: createMemoryStorage(),
  });
  Object.defineProperty(window, "sessionStorage", {
    configurable: true,
    value: createMemoryStorage(),
  });
}
