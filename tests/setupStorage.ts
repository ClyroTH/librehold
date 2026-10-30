// Node 25+ ships its own localStorage, which warns on every access without --localstorage-file.
// Plain-node tests get an in-memory one instead; happy-dom tests already have theirs.
if (typeof window === 'undefined') {
  const items = new Map<string, string>();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (k: string) => items.get(k) ?? null,
      setItem: (k: string, v: string) => void items.set(k, String(v)),
      removeItem: (k: string) => void items.delete(k),
      clear: () => items.clear(),
    },
  });
}
