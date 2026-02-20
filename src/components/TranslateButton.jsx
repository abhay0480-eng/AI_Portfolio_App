import React, { useState } from 'react';
import { Globe, ChevronDown, Loader2, X } from 'lucide-react';
import { translateWithSarvam, getSupportedLanguages, isSarvamEnabled } from '../services/sarvamService';

const TranslateButton = ({ text }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [translatedText, setTranslatedText] = useState('');
    const [selectedLang, setSelectedLang] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isSarvamEnabled()) return null;

    const languages = getSupportedLanguages();

    const handleTranslate = async (langCode) => {
        setSelectedLang(langCode);
        setIsOpen(false);
        setIsLoading(true);
        setError('');
        setTranslatedText('');

        try {
            const result = await translateWithSarvam(text, langCode);
            setTranslatedText(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setTranslatedText('');
        setSelectedLang('');
        setError('');
    };

    return (
        <div className="mt-2">
            {/* Translate Button Row */}
            <div className="flex items-center gap-2">
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-1 px-2 py-1 text-[10px] font-mono text-gray-500 hover:text-green-400 bg-gray-900/50 border border-gray-800 rounded-md hover:border-green-500/30 transition-all"
                        title="Translate to Indian language"
                    >
                        <Globe size={11} />
                        <span>{selectedLang ? languages.find(l => l.code === selectedLang)?.name : 'Translate'}</span>
                        <ChevronDown size={10} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Language Dropdown */}
                    {isOpen && (
                        <div className="absolute bottom-full mb-1 left-0 z-50 bg-gray-900 border border-gray-700 rounded-lg shadow-xl py-1 min-w-[140px] animate-in fade-in zoom-in-95 duration-200">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleTranslate(lang.code)}
                                    className={`w-full text-left px-3 py-1.5 text-[11px] font-mono transition-colors ${selectedLang === lang.code
                                            ? 'text-green-400 bg-green-900/20'
                                            : 'text-gray-400 hover:text-green-300 hover:bg-gray-800'
                                        }`}
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Loading indicator */}
                {isLoading && (
                    <div className="flex items-center gap-1 text-[10px] text-yellow-400 font-mono">
                        <Loader2 size={10} className="animate-spin" />
                        <span>Translating...</span>
                    </div>
                )}

                {/* Clear button */}
                {translatedText && (
                    <button
                        onClick={handleClear}
                        className="text-gray-600 hover:text-gray-400 transition-colors"
                        title="Clear translation"
                    >
                        <X size={12} />
                    </button>
                )}
            </div>

            {/* Translated Text */}
            {translatedText && (
                <div className="mt-2 p-3 bg-green-900/10 border border-green-500/20 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-[10px] text-green-600 font-mono uppercase tracking-wider mb-1">
                        🌐 {languages.find(l => l.code === selectedLang)?.name} Translation
                    </p>
                    <p className="text-sm text-green-200 font-mono leading-relaxed">{translatedText}</p>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="mt-2 p-2 bg-red-900/10 border border-red-500/20 rounded text-[10px] text-red-400 font-mono">
                    ⚠️ {error}
                </div>
            )}
        </div>
    );
};

export default React.memo(TranslateButton);
