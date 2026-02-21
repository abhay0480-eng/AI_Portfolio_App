import React from 'react';
import { User } from 'lucide-react';
import TypewriterText from './TypewriterText';
import WidgetRenderer from './WidgetRenderer';
import TranslateButton from './TranslateButton';
import ListenButton from './ListenButton';
import AbhayAvatar from './AbhayAvatar';

const ChatMessage = ({ msg, onCommand }) => (
    <div className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
        <div className={`max-w-[95%] sm:max-w-[90%] md:max-w-[80%] ${msg.type === 'user' ? 'order-1' : 'order-2'}`}>
            <div className={`flex items-start gap-2 sm:gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>

                {/* Avatar */}
                {msg.type === 'user' ? (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-blue-900/30 text-blue-400">
                        <User size={16} />
                    </div>
                ) : (
                    <AbhayAvatar size={32} />
                )}

                {/* Text Content */}
                <div className="mt-1 min-w-0">
                    <p
                        className={`text-sm md:text-base leading-relaxed ${msg.type === 'user' ? 'text-blue-100' : 'text-green-100'
                            }`}
                    >
                        {msg.type === 'bot' && msg.id !== 1 ? (
                            <TypewriterText text={msg.text} />
                        ) : (
                            msg.text
                        )}
                    </p>

                    {/* Render any widgets associated with this message */}
                    {msg.widgets &&
                        msg.widgets.map((w) => (
                            <div key={w} className="mt-2">
                                <WidgetRenderer type={w} onCommand={onCommand} />
                            </div>
                        ))}

                    {/* Translate & Listen buttons for bot messages */}
                    {msg.type === 'bot' && msg.text && msg.id !== 1 && (
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <ListenButton text={msg.text} />
                            <TranslateButton text={msg.text} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);

export default React.memo(ChatMessage);
