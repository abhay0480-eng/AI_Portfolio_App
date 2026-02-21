import React, { createContext, useContext, useState, useEffect } from 'react';
import { subscribeToStats } from '../services/analyticsService';
import { isFirebaseReady } from '../services/firebaseConfig';

const StatsContext = createContext({
    views: 0,
    reactions: {},
    feedbackCount: 0,
});

export function StatsProvider({ children }) {
    const [stats, setStats] = useState({ views: 0, reactions: {}, feedbackCount: 0 });

    useEffect(() => {
        if (!isFirebaseReady()) return;
        const unsub = subscribeToStats(setStats);
        return unsub;
    }, []);

    return (
        <StatsContext.Provider value={stats}>
            {children}
        </StatsContext.Provider>
    );
}

/**
 * Hook to access centralized Firebase stats.
 * Replaces individual subscribeToStats() calls in components.
 */
export function useStats() {
    return useContext(StatsContext);
}
