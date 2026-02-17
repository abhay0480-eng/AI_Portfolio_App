import React from 'react';
import { User, Cpu } from 'lucide-react';
import TypewriterText from './TypewriterText';
import WidgetRenderer from './WidgetRenderer';

const ChatMessage = ({ msg, onCommand }) => (
    <div className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
        <div className={`max-w-[90%] md:max-w-[80%] ${msg.type === 'user' ? 'order-1' : 'order-2'}`}>
            <div className={`flex items-start gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>

                {/* Avatar */}
                <div
                    className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${msg.type === 'user'
                            ? 'bg-blue-900/30 text-blue-400'
                            : 'bg-green-900/30 text-green-400'
                        }`}
                >
                    {msg.type === 'user' ? <User size={16} /> : <Cpu size={16} />}
                </div>

                {/* Text Content */}
                <div className="mt-1">
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
                </div>
            </div>
        </div>
    </div>
);

export default React.memo(ChatMessage);
