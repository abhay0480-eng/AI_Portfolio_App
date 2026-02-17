import React, { useState, useEffect } from 'react';

const TypewriterText = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text.charAt(index));
                index++;
            } else {
                clearInterval(timer);
                if (onComplete) onComplete();
            }
        }, 20);
        return () => clearInterval(timer);
    }, [text]);

    return <span>{displayedText}</span>;
};

export default React.memo(TypewriterText);
