import { db, isFirebaseReady } from './firebaseConfig';
import {
    doc,
    getDoc,
    setDoc,
    increment,
    collection,
    addDoc,
    onSnapshot,
    serverTimestamp,
} from 'firebase/firestore';

const STATS_DOC = 'portfolio-stats';
const VIEW_SESSION_KEY = 'abhayos_viewed';

// Helper: ensure the stats document exists (memoized — only checks once per session)
let cachedStatsRef = null;
async function ensureStatsDoc() {
    if (cachedStatsRef) return cachedStatsRef;
    const ref = doc(db, 'analytics', STATS_DOC);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
        await setDoc(ref, {
            views: 0,
            reactions: { '🔥': 0, '💯': 0, '🚀': 0, '❤️': 0, '👏': 0, '🤩': 0 },
            feedbackCount: 0,
        });
    }
    cachedStatsRef = ref;
    return ref;
}

// --- View Counter ---
export async function incrementView() {
    if (!isFirebaseReady()) return;
    if (sessionStorage.getItem(VIEW_SESSION_KEY)) return;
    sessionStorage.setItem(VIEW_SESSION_KEY, 'true');

    try {
        const ref = await ensureStatsDoc();
        await setDoc(ref, { views: increment(1) }, { merge: true });
    } catch (err) {
        console.warn('View increment failed:', err.message);
    }
}

// --- Emoji Reactions ---
export async function addReaction(emoji) {
    if (!isFirebaseReady()) return;

    try {
        const ref = await ensureStatsDoc();
        await setDoc(ref, { reactions: { [emoji]: increment(1) } }, { merge: true });
    } catch (err) {
        console.warn('Reaction failed:', err.message);
    }
}

// --- Feedback ---
export async function submitFeedback(mood, text, name = 'Anonymous') {
    if (!isFirebaseReady()) return false;

    try {
        await addDoc(collection(db, 'feedbacks'), {
            mood,
            text: text || '',
            name,
            timestamp: serverTimestamp(),
        });

        const ref = await ensureStatsDoc();
        await setDoc(ref, { feedbackCount: increment(1) }, { merge: true });
        return true;
    } catch (err) {
        console.warn('Feedback submit failed:', err.message);
        return false;
    }
}

// --- Real-time Stats Listener ---
export function subscribeToStats(callback) {
    if (!isFirebaseReady()) {
        callback({ views: 0, reactions: {}, feedbackCount: 0 });
        return () => { };
    }

    const ref = doc(db, 'analytics', STATS_DOC);
    return onSnapshot(
        ref,
        (snap) => {
            if (snap.exists()) {
                callback(snap.data());
            } else {
                callback({ views: 0, reactions: {}, feedbackCount: 0 });
            }
        },
        (err) => {
            console.warn('Stats listener error:', err.message);
            callback({ views: 0, reactions: {}, feedbackCount: 0 });
        }
    );
}
