import React, { useState, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const ListenButton = ({ text }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const utteranceRef = useRef(null);

    const handleToggle = useCallback(() => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        // Clean text: remove action tags [[...]] and markdown-like syntax
        const cleanText = text
            .replace(/\[\[[A-Z_]+\]\]/g, '')
            .replace(/[#*`]/g, '')
            .replace(/\n{2,}/g, '. ')
            .trim();

        if (!cleanText) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utteranceRef.current = utterance;

        // Try to find a good voice (prefer Indian English or default)
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v =>
            v.lang.includes('en-IN') || v.lang.includes('hi-IN')
        ) || voices.find(v =>
            v.lang.includes('en') && v.name.toLowerCase().includes('google')
        ) || voices[0];

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        utterance.rate = 0.95;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
    }, [text, isSpeaking]);

    // Check if browser supports speech synthesis
    if (typeof window === 'undefined' || !window.speechSynthesis) {
        return null;
    }

    return (
        <button
            onClick={handleToggle}
            className={`flex items-center gap-1 px-2 py-1 text-[10px] font-mono rounded-md border transition-all ${isSpeaking
                    ? 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30 hover:bg-yellow-900/30'
                    : 'text-gray-500 bg-gray-900/50 border-gray-800 hover:text-green-400 hover:border-green-500/30'
                }`}
            title={isSpeaking ? 'Stop speaking' : 'Listen to this message'}
        >
            {isSpeaking ? (
                <>
                    <VolumeX size={11} />
                    <span>Stop</span>
                    {/* Animated bars */}
                    <div className="flex items-end gap-px ml-0.5 h-3">
                        <div className="w-0.5 bg-yellow-400 rounded-full animate-pulse" style={{ height: '40%', animationDelay: '0ms' }} />
                        <div className="w-0.5 bg-yellow-400 rounded-full animate-pulse" style={{ height: '80%', animationDelay: '150ms' }} />
                        <div className="w-0.5 bg-yellow-400 rounded-full animate-pulse" style={{ height: '60%', animationDelay: '300ms' }} />
                    </div>
                </>
            ) : (
                <>
                    <Volume2 size={11} />
                    <span>Listen</span>
                </>
            )}
        </button>
    );
};

export default React.memo(ListenButton);
