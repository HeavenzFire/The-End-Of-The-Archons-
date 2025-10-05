
import React, { useState, useEffect } from 'react';
import { manifest } from 'pacote';

interface ProtocolViewProps {
  targetName: string;
  protocol: string;
  isLoading: boolean;
  error: string | null;
}

const TypingEffect: React.FC<{ text: string }> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
        setDisplayedText('');
        if (text) {
            let i = 0;
            const intervalId = setInterval(() => {
                setDisplayedText(text.slice(0, i));
                i++;
                if (i > text.length) {
                    clearInterval(intervalId);
                }
            }, 10); // Adjust typing speed here
            return () => clearInterval(intervalId);
        }
    }, [text]);

    return <div dangerouslySetInnerHTML={{ __html: parseMarkdown(displayedText) }} />;
};


const parseMarkdown = (text: string) => {
    return text
        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-cyan-400 mt-4 mb-2">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-green-300 mt-6 mb-3 border-b border-green-800 pb-1">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold font-orbitron text-green-400 mt-2 mb-4">$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-red-400 px-1 rounded-sm">$1</code>')
        .replace(/```(.*?)\n([\s\S]*?)```/g, '<pre class="bg-black border border-green-800 rounded-md p-3 my-4 overflow-x-auto"><code class="text-blue-300">$2</code></pre>')
        .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
        .replace(/\n/g, '<br />');
}

const ProtocolView: React.FC<ProtocolViewProps> = ({ targetName, protocol, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400"></div>
        <p className="mt-4 text-lg font-orbitron">Generating Protocol...</p>
        <p className="text-sm">Accessing Lifestream Core via Quantum Link for target: {targetName}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-400 border border-red-500 bg-red-900 bg-opacity-30 rounded-md">
        <h3 className="font-bold text-xl font-orbitron">PROTOCOL GENERATION FAILED</h3>
        <p className="mt-2 font-mono">{error}</p>
      </div>
    );
  }

  return (
    <div className="prose prose-invert max-w-none text-green-300 font-mono text-sm leading-relaxed">
        <TypingEffect text={protocol} />
    </div>
  );
};

export default ProtocolView;
