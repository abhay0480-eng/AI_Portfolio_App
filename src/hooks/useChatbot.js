import { useState, useEffect, useRef, useCallback } from 'react';
import { askGemini, setApiKey, getApiKey, clearApiKey, isAiEnabled, resetConversation } from '../services/geminiService';
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
    {
        match: (cmd) => cmd.includes('help'),
        response:
            "Available commands: projects, experience, skills, contact, about, highlights, resume, clear. Or just ask me anything!",
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

        // ai on
        if (command === 'ai on') {
            if (isAiEnabled()) {
                setAiMode(true);
                resetConversation();
                return { text: "🤖 AI mode activated. Gemini is now handling responses.", widgets: [] };
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
            const status = isAiEnabled() ? '🟢 ONLINE' : '🔴 OFFLINE';
            const mode = aiMode ? 'AI (Groq)' : 'Keyword Matching';
            return { text: `AI Engine: ${status}\nActive Mode: ${mode}\nModel: llama-3.3-70b-versatile (Groq)`, widgets: [] };
        }

        // clear key
        if (command === 'clear key' || command === 'clear api') {
            clearApiKey();
            setAiMode(false);
            resetConversation();
            return { text: "🗑️ API key removed. Switched to offline mode.", widgets: ['quick-actions'] };
        }

        return null; // Not a special command
    }, [aiMode]);

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

        // --- AI Mode: use Gemini ---
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
                    // Fallback to keyword matching on error
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
    }, [aiMode, handleSpecialCommand]);

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
        scrollRef,
        inputRef,
        handleCommand,
        handleSubmit,
    };
}
