// --- Response Cache Service ---
// Caches AI responses by normalized prompt to avoid redundant API calls.
// Uses in-memory Map for fast lookups + localStorage for persistence.

const CACHE_STORAGE_KEY = 'abhayos_response_cache';
const MAX_ENTRIES = 100;
const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// In-memory cache for instant lookups within same session
const memoryCache = new Map();

// --- Normalize prompt for consistent cache keys ---
function normalizePrompt(prompt) {
    return prompt
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ')       // collapse whitespace
        .replace(/[?.!,;:]+$/g, '') // strip trailing punctuation
        .replace(/[''""]/g, "'");   // normalize quotes
}

// --- localStorage helpers ---
function loadCacheFromStorage() {
    try {
        const raw = localStorage.getItem(CACHE_STORAGE_KEY);
        if (!raw) return {};
        return JSON.parse(raw);
    } catch {
        return {};
    }
}

function saveCacheToStorage(cacheObj) {
    try {
        localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(cacheObj));
    } catch {
        // localStorage full — silently fail, in-memory cache still works
    }
}

// --- Initialize memory cache from localStorage on load ---
function initMemoryCache() {
    if (memoryCache.size > 0) return; // already initialized
    const stored = loadCacheFromStorage();
    const now = Date.now();
    for (const [key, entry] of Object.entries(stored)) {
        if (now - entry.timestamp < TTL_MS) {
            memoryCache.set(key, entry);
        }
    }
}

// --- Public API ---

/**
 * Get a cached response for a prompt.
 * Returns the response string if cached and not expired, or null.
 */
export function getCachedResponse(prompt) {
    initMemoryCache();
    const key = normalizePrompt(prompt);
    const entry = memoryCache.get(key);

    if (!entry) return null;

    // Check TTL
    if (Date.now() - entry.timestamp > TTL_MS) {
        memoryCache.delete(key);
        // Also remove from localStorage
        const stored = loadCacheFromStorage();
        delete stored[key];
        saveCacheToStorage(stored);
        return null;
    }

    return entry.response;
}

/**
 * Store a response in the cache for a given prompt.
 */
export function setCachedResponse(prompt, response) {
    initMemoryCache();
    const key = normalizePrompt(prompt);
    const entry = { response, timestamp: Date.now() };

    // Update in-memory
    memoryCache.set(key, entry);

    // Update localStorage
    const stored = loadCacheFromStorage();
    stored[key] = entry;

    // Evict oldest entries if over MAX_ENTRIES
    const keys = Object.keys(stored);
    if (keys.length > MAX_ENTRIES) {
        const sorted = keys.sort((a, b) => stored[a].timestamp - stored[b].timestamp);
        const toRemove = sorted.slice(0, keys.length - MAX_ENTRIES);
        for (const k of toRemove) {
            delete stored[k];
            memoryCache.delete(k);
        }
    }

    saveCacheToStorage(stored);
}

/**
 * Clear all cached responses.
 */
export function clearResponseCache() {
    memoryCache.clear();
    localStorage.removeItem(CACHE_STORAGE_KEY);
}

/**
 * Get cache statistics.
 */
export function getCacheStats() {
    initMemoryCache();
    return {
        entries: memoryCache.size,
        maxEntries: MAX_ENTRIES,
        ttlHours: TTL_MS / (60 * 60 * 1000),
    };
}
