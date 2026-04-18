import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { submitFeedback } from '../services/analyticsService';
import { isFirebaseReady } from '../services/firebaseConfig';

const MOODS = [
    { emoji: '😍', label: 'Amazing' },
    { emoji: '😊', label: 'Good' },
    { emoji: '😐', label: 'Okay' },
    { emoji: '😕', label: 'Meh' },
];

const FeedbackForm = ({ onSkip, onSubmitSuccess }) => {
    const [selectedMood, setSelectedMood] = useState(null);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isFirebaseReady()) {
        return (
            <div className="mt-3 p-4 rounded-lg border border-yellow-500/20 bg-yellow-900/10">
                <p className="text-xs font-mono text-yellow-400">
                    ⚠️ Firebase not configured. Feedback feature requires Firebase setup.
                </p>
                {onSkip && (
                    <button
                        onClick={onSkip}
                        className="mt-2 text-xs text-yellow-500 hover:text-yellow-400 underline"
                    >
                        Skip
                    </button>
                )}
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="mt-3 p-5 rounded-xl border border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/10 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="text-4xl mb-2 animate-bounce">🎉</div>
                <h3 className="text-sm font-mono font-bold text-green-400 mb-1">
                    Thank you for your feedback!
                </h3>
                <p className="text-[11px] font-mono text-gray-500">
                    Your thoughts help Abhay improve. ❤️
                </p>
            </div>
        );
    }

    const handleSubmit = async () => {
        if (!selectedMood || isSubmitting) return;
        setIsSubmitting(true);
        try {
            await submitFeedback(selectedMood, text, name || 'Anonymous');
            setSubmitted(true);
            if (onSubmitSuccess) setTimeout(onSubmitSuccess, 1500);
        } catch (err) {
            console.warn('Feedback error:', err);
            setSubmitted(true); // Still show thank you on error
            if (onSubmitSuccess) setTimeout(onSubmitSuccess, 1500);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-3 p-4 rounded-xl border border-green-500/20 bg-gradient-to-br from-gray-900 to-gray-950 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2">
                <span className="text-sm">💬</span>
                <h3 className="text-xs font-mono font-bold text-green-400 uppercase tracking-wider">
                    Quick Feedback
                </h3>
            </div>

            {/* Mood selector */}
            <div>
                <p className="text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-wider">
                    How's your experience?
                </p>
                <div className="flex gap-2">
                    {MOODS.map((mood) => (
                        <button
                            key={mood.emoji}
                            onClick={() => setSelectedMood(mood.emoji)}
                            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg border transition-all active:scale-90 ${selectedMood === mood.emoji
                                ? 'border-green-500/50 bg-green-900/30 scale-105'
                                : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
                                }`}
                        >
                            <span className="text-xl">{mood.emoji}</span>
                            <span className="text-[9px] font-mono text-gray-500">{mood.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Name input */}
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full bg-gray-950 border border-gray-700 text-green-400 font-mono text-xs rounded-md px-3 py-2 focus:outline-none focus:border-green-500/50 transition-colors"
            />

            {/* Text input */}
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Any thoughts? (optional)"
                rows={2}
                className="w-full bg-gray-950 border border-gray-700 text-green-400 font-mono text-xs rounded-md px-3 py-2 resize-none focus:outline-none focus:border-green-500/50 transition-colors"
            />

            {/* Submit & Skip */}
            <div className="flex gap-2">
                {onSkip && (
                    <button
                        onClick={onSkip}
                        className="flex-1 py-2.5 rounded-lg font-mono text-xs font-semibold bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                        Skip
                    </button>
                )}
                <button
                    onClick={handleSubmit}
                    disabled={!selectedMood || isSubmitting}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-mono text-xs font-semibold transition-all active:scale-95 ${selectedMood
                        ? 'bg-green-600 text-black hover:bg-green-500'
                        : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                        }`}
                >
                    {isSubmitting ? (
                        <span className="animate-pulse">Sending...</span>
                    ) : (
                        <>
                            <Send size={12} />
                            Submit
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default React.memo(FeedbackForm);
