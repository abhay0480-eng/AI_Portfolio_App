import { db, isFirebaseReady } from './firebaseConfig';
import {
    ref,
    set,
    update,
    push,
    onValue,
    serverTimestamp,
    increment,
} from 'firebase/database';

const STATS_PATH = 'analytics/portfolio-stats';
const FEEDBACKS_PATH = 'feedbacks';
const VIEW_SESSION_KEY = 'abhayos_viewed';

// --- View Counter ---
export async function incrementView() {
    if (!isFirebaseReady()) return;
    if (sessionStorage.getItem(VIEW_SESSION_KEY)) return;
    sessionStorage.setItem(VIEW_SESSION_KEY, 'true');

    try {
        const statsRef = ref(db, STATS_PATH);
        await update(statsRef, { views: increment(1) });
    } catch (err) {
        console.warn('View increment failed:', err.message);
    }
}

// --- Emoji Reactions ---
export async function addReaction(emoji) {
    if (!isFirebaseReady()) return;

    try {
        const reactionsRef = ref(db, `${STATS_PATH}/reactions`);
        await update(reactionsRef, { [emoji]: increment(1) });
    } catch (err) {
        console.warn('Reaction failed:', err.message);
    }
}

// --- Feedback ---
export async function submitFeedback(mood, text, name = 'Anonymous') {
    if (!isFirebaseReady()) return false;

    try {
        // 1. Push new feedback entry
        const feedbacksRef = ref(db, FEEDBACKS_PATH);
        await push(feedbacksRef, {
            mood,
            text: text || '',
            name,
            timestamp: serverTimestamp(),
        });

        // 2. Increment total feedback count
        const statsRef = ref(db, STATS_PATH);
        await update(statsRef, { feedbackCount: increment(1) });

        return true;
    } catch (err) {
        console.warn('Feedback submit failed:', err.message);
        return false;
    }
}

// --- Real-time Stats Listener ---
export function subscribeToStats(callback) {
    const DEFAULT_STATS = { views: 0, reactions: {}, feedbackCount: 0 };

    if (!isFirebaseReady()) {
        callback(DEFAULT_STATS);
        return () => { };
    }

    const statsRef = ref(db, STATS_PATH);
    const unsubscribe = onValue(
        statsRef,
        (snapshot) => {
            if (snapshot.exists()) {
                // Merge with defaults to ensure all keys exist
                const data = snapshot.val();
                callback({ ...DEFAULT_STATS, ...data });
            } else {
                callback(DEFAULT_STATS);
            }
        },
        (err) => {
            console.warn('Stats listener error:', err.message);
            callback(DEFAULT_STATS);
        }
    );

    return unsubscribe;
}
