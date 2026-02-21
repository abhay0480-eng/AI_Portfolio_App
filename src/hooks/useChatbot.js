import { useState, useEffect, useRef, useCallback } from 'react';
import { askGemini, setApiKey, getApiKey, clearApiKey, isAiEnabled, resetConversation } from '../services/geminiService';
import { askSarvam, setSarvamKey, getSarvamKey, clearSarvamKey, isSarvamEnabled, resetSarvamConversation } from '../services/sarvamService';
import { parseAiResponse } from '../utils/parseAiResponse';

// --- Command Registry (offline fallback) ---
const commandRegistry = [
    {
        match: (cmd) => ['hi', 'hello', 'hey'].includes(cmd),
        response: "Hello there! Ready to explore the codebase?",
        widget: 'quick-actions',
    },
    {
        match: (cmd) => ['clear', 'cls'].includes(cmd),
        response: null,
        widget: null,
    },
    {
        match: (cmd) =>
            cmd.includes('project') || cmd.includes('work') || cmd.includes('build'),
        response: "Accessing project directory... Found 2 active repositories.",
        widget: 'projects',
    },
    {
        match: (cmd) =>
            cmd.includes('exp') || cmd.includes('history') || cmd.includes('job') || cmd.includes('career'),
        response:
            "Retrieving employment history logs. Abhay has 3+ years of professional experience, currently spearheading modernization at GlobalLogic.",
        widget: 'experience',
    },
    {
        match: (cmd) =>
            cmd.includes('skill') || cmd.includes('tech') || cmd.includes('stack'),
        response:
            "Scanning technical capabilities... Proficiency verified in React, Redux, and Performance Optimization.",
        widget: 'skills',
    },
    {
        match: (cmd) =>
            cmd.includes('contact') || cmd.includes('email') || cmd.includes('hire'),
        response: "Communication channels open. You can reach Abhay via the following protocols:",
        widget: 'contact',
    },
    {
        match: (cmd) => cmd.includes('about') || cmd.includes('who'),
        response:
            "Identity verified: Abhay Kumar. Senior Software Developer based in Aligarh. Obsessed with clean code, PWAs, and 90+ Lighthouse scores.",
        widget: 'profile',
    },
    {
        match: (cmd) => cmd.includes('highlight') || cmd.includes('achieve') || cmd.includes('stats'),
        response: "Loading key performance metrics from career logs...",
        widget: 'highlights',
    },
    {
        match: (cmd) => cmd.includes('resume') || cmd.includes('download') || cmd.includes('cv'),
        response: "Preparing resume for download...",
        widget: 'resume-download',
    },
    // --- HR-specific commands ---
    {
        match: (cmd) => cmd.includes('profile card') || cmd.includes('hr profile') || cmd.includes('candidate profile'),
        response: "Rendering HR profile card with availability status and quick stats...",
        widget: 'hr-profile',
    },
    {
        match: (cmd) => cmd.includes('skill chart') || cmd.includes('skill radar') || cmd.includes('proficiency'),
        response: "Generating skill proficiency analysis chart...",
        widget: 'skill-radar',
    },
    {
        match: (cmd) => cmd.includes('timeline') || cmd.includes('career path') || cmd.includes('progression'),
        response: "Loading interactive career progression timeline...",
        widget: 'timeline',
    },
    {
        match: (cmd) => cmd.includes('evaluate') || cmd.includes('snapshot') || cmd.includes('assessment') || cmd.includes('fit'),
        response: "Running candidate evaluation and generating fit scores...",
        widget: 'candidate-snapshot',
    },
    {
        match: (cmd) => cmd.includes('full resume') || cmd.includes('complete resume') || cmd.includes('resume view'),
        response: "Opening interactive resume explorer...",
        widget: 'full-resume',
    },
    {
        match: (cmd) => cmd.includes('certification') || cmd.includes('license') || cmd.includes('certificate'),
        response: "Loading certifications and licenses...",
        widget: 'certifications',
    },
    {
        match: (cmd) => cmd.includes('feedback') || cmd.includes('review') || cmd.includes('rate'),
        response: "I'd love to hear your thoughts! 💬",
        widget: 'feedback',
    },
    {
        match: (cmd) => cmd.includes('stats') || cmd.includes('analytics') || cmd.includes('views'),
        response: "Here are the live visitor analytics 📊",
        widget: 'visitor-stats',
    },
    {
        match: (cmd) => cmd.includes('help'),
        response:
            "Available commands: projects, experience, skills, contact, about, highlights, resume, certifications, feedback, stats, profile card, skill chart, timeline, evaluate, full resume, clear. Or just ask me anything!",
        widget: 'quick-actions',
    },
];

const INITIAL_MESSAGES = [
    {
        id: 1,
        type: 'bot',
        text: "Initializing AbhayOS v2.5.0... System online.",
        isTyping: false,
    },
    {
        id: 2,
        type: 'bot',
        text: "Hello! I'm the AI-powered assistant for Abhay Kumar, Senior React Developer. Ask me anything about his skills, projects, or experience — or use the quick actions below!",
        widgets: ['quick-actions'],
        isTyping: true,
    },
];

export function useChatbot() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [aiMode, setAiMode] = useState(() => isAiEnabled());
    const [sarvamMode, setSarvamMode] = useState(false);
    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isBotTyping]);

    // Focus input on load
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // --- Handle special terminal commands ---
    const handleSpecialCommand = useCallback((command, rawCmd) => {
        // export AI_KEY=...
        const exportMatch = rawCmd.match(/^export\s+AI_KEY\s*=\s*(.+)$/i);
        if (exportMatch) {
            const key = exportMatch[1].trim().replace(/^['"]|['"]$/g, '');
            if (key) {
                setApiKey(key);
                setAiMode(true);
                setSarvamMode(false);
                resetConversation();
                return {
                    text: `✅ API key configured successfully. AI mode activated.\n🔒 Key stored in localStorage (client-side only).\n\nTry asking me anything naturally, like "What are Abhay's strongest skills?"`,
                    widgets: ['quick-actions'],
                };
            }
            return {
                text: "❌ Error: No key provided. Usage: export AI_KEY=your_gemini_api_key",
                widgets: [],
            };
        }

        // export SARVAM_KEY=...
        const sarvamExportMatch = rawCmd.match(/^export\s+SARVAM_KEY\s*=\s*(.+)$/i);
        if (sarvamExportMatch) {
            const key = sarvamExportMatch[1].trim().replace(/^['"]|['"]$/g, '');
            if (key) {
                setSarvamKey(key);
                return {
                    text: `✅ Sarvam AI key configured successfully.\n🔒 Key stored in localStorage (client-side only).\n🌐 Translation & multilingual features enabled!\n\nUse 'sarvam on' to switch to Sarvam-M as your AI engine, or use the 🌐 translate button on any message.`,
                    widgets: ['quick-actions'],
                };
            }
            return {
                text: "❌ Error: No key provided. Usage: export SARVAM_KEY=your_sarvam_api_key",
                widgets: [],
            };
        }

        // sarvam on
        if (command === 'sarvam on') {
            if (isSarvamEnabled()) {
                setSarvamMode(true);
                setAiMode(false);
                resetSarvamConversation();
                return {
                    text: "🇮🇳 Sarvam-M activated! Multilingual Indian AI mode is ON.\nYou can now chat in Hindi, Tamil, Telugu, or any Indian language.\n\nTry: \"Abhay ke skills kya hain?\"",
                    widgets: ['quick-actions'],
                };
            }
            return { text: "❌ No Sarvam API key set. Use: export SARVAM_KEY=your_key", widgets: [] };
        }

        // sarvam off
        if (command === 'sarvam off') {
            setSarvamMode(false);
            return { text: "📴 Sarvam-M deactivated. Switched back to default mode.", widgets: ['quick-actions'] };
        }

        // sarvam status
        if (command === 'sarvam status') {
            const keySet = isSarvamEnabled() ? '🟢 KEY SET' : '🔴 NO KEY';
            const mode = sarvamMode ? '🟢 ACTIVE' : '⚪ INACTIVE';
            return {
                text: `Sarvam AI Status:\n  API Key: ${keySet}\n  Engine: ${mode}\n  Model: sarvam-m (₹0/token, FREE forever)\n  Features: Multilingual chat, Translation\n  Languages: Hindi, Tamil, Telugu, Bengali + 6 more`,
                widgets: [],
            };
        }

        // clear sarvam
        if (command === 'clear sarvam') {
            clearSarvamKey();
            setSarvamMode(false);
            resetSarvamConversation();
            return { text: "🗑️ Sarvam API key removed. Translation features disabled.", widgets: ['quick-actions'] };
        }

        // ai on
        if (command === 'ai on') {
            if (isAiEnabled()) {
                setAiMode(true);
                setSarvamMode(false);
                resetConversation();
                return { text: "🤖 AI mode activated. Groq is now handling responses.", widgets: [] };
            }
            return { text: "❌ No API key set. Use: export AI_KEY=your_key", widgets: [] };
        }

        // ai off
        if (command === 'ai off') {
            setAiMode(false);
            return { text: "📴 AI mode deactivated. Switched to offline keyword matching.", widgets: ['quick-actions'] };
        }

        // ai status
        if (command === 'ai status') {
            const groqStatus = isAiEnabled() ? '🟢 ONLINE' : '🔴 OFFLINE';
            const sarvamStatus = isSarvamEnabled() ? '🟢 KEY SET' : '🔴 NO KEY';
            const activeMode = sarvamMode ? 'Sarvam-M (Indian)' : aiMode ? 'Groq (LLaMA)' : 'Keyword Matching';
            return {
                text: `AI Engine Status:\n  Groq: ${groqStatus}\n  Sarvam: ${sarvamStatus}\n  Active Mode: ${activeMode}`,
                widgets: [],
            };
        }

        // clear key
        if (command === 'clear key' || command === 'clear api') {
            clearApiKey();
            setAiMode(false);
            resetConversation();
            return { text: "🗑️ API key removed. Switched to offline mode.", widgets: ['quick-actions'] };
        }

        return null; // Not a special command
    }, [aiMode, sarvamMode]);

    const handleCommand = useCallback((cmd) => {
        const command = cmd.toLowerCase().trim();

        // Add User Message immediately
        const newUserMsg = { id: Date.now(), type: 'user', text: cmd };
        setMessages((prev) => [...prev, newUserMsg]);
        setInput('');

        // --- Check special commands first (always work) ---
        const specialResult = handleSpecialCommand(command, cmd.trim());
        if (specialResult) {
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, type: 'bot', text: specialResult.text, widgets: specialResult.widgets },
            ]);
            return;
        }

        // --- Clear command ---
        if (['clear', 'cls'].includes(command)) {
            setMessages([
                {
                    id: Date.now(),
                    type: 'bot',
                    text: "Console cleared. Ready for new input.",
                    widgets: ['quick-actions'],
                },
            ]);
            return;
        }

        setIsBotTyping(true);

        // --- Sarvam Mode: use Sarvam-M ---
        if (sarvamMode && isSarvamEnabled()) {
            askSarvam(cmd)
                .then((rawResponse) => {
                    const { text, widgets } = parseAiResponse(rawResponse);
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: Date.now() + 1,
                            type: 'bot',
                            text: text || "I processed your request but have nothing to display.",
                            widgets,
                        },
                    ]);
                })
                .catch((error) => {
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: Date.now() + 1,
                            type: 'bot',
                            text: `⚠️ Sarvam AI Error: ${error.message}\n\nFalling back to keyword mode...`,
                            widgets: [],
                        },
                    ]);
                    // Fallback
                    const matched = commandRegistry.find((entry) => entry.match(command));
                    if (matched && matched.response) {
                        setTimeout(() => {
                            setMessages((prev) => [
                                ...prev,
                                {
                                    id: Date.now() + 2,
                                    type: 'bot',
                                    text: matched.response,
                                    widgets: matched.widget ? [matched.widget] : [],
                                },
                            ]);
                        }, 300);
                    }
                })
                .finally(() => {
                    setIsBotTyping(false);
                });
            return;
        }

        // --- AI Mode: use Groq ---
        if (aiMode && isAiEnabled()) {
            askGemini(cmd)
                .then((rawResponse) => {
                    const { text, widgets } = parseAiResponse(rawResponse);
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: Date.now() + 1,
                            type: 'bot',
                            text: text || "I processed your request but have nothing to display.",
                            widgets,
                        },
                    ]);
                })
                .catch((error) => {
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: Date.now() + 1,
                            type: 'bot',
                            text: `⚠️ AI Error: ${error.message}\n\nFalling back to keyword mode for this query...`,
                            widgets: [],
                        },
                    ]);
                    const matched = commandRegistry.find((entry) => entry.match(command));
                    if (matched && matched.response) {
                        setTimeout(() => {
                            setMessages((prev) => [
                                ...prev,
                                {
                                    id: Date.now() + 2,
                                    type: 'bot',
                                    text: matched.response,
                                    widgets: matched.widget ? [matched.widget] : [],
                                },
                            ]);
                        }, 300);
                    }
                })
                .finally(() => {
                    setIsBotTyping(false);
                });
            return;
        }

        // --- Offline Mode: keyword matching fallback ---
        const matched = commandRegistry.find((entry) => entry.match(command));
        const responseText = matched
            ? matched.response
            : `Command '${command}' not recognized. Try 'projects', 'skills', 'experience', or 'export AI_KEY=...' to enable AI mode.`;
        const widgetType = matched ? matched.widget : 'quick-actions';

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: responseText,
                    widgets: widgetType ? [widgetType] : [],
                },
            ]);
            setIsBotTyping(false);
        }, 400 + Math.random() * 600);
    }, [aiMode, sarvamMode, handleSpecialCommand]);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!input.trim()) return;
            handleCommand(input);
        },
        [input, handleCommand]
    );

    return {
        input,
        setInput,
        messages,
        isBotTyping,
        aiMode,
        sarvamMode,
        scrollRef,
        inputRef,
        handleCommand,
        handleSubmit,
    };
}
