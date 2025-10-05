
import React, { useRef, useEffect } from 'react';

interface SystemLogProps {
  messages: string[];
}

const SystemLog: React.FC<SystemLogProps> = ({ messages }) => {
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-black bg-opacity-50 border border-green-700 rounded-md p-4">
      <h2 className="text-xl font-orbitron glow-text-green tracking-widest border-b-2 border-green-700 pb-2 mb-4">SYSTEM LOG</h2>
      <div
        ref={logContainerRef}
        className="h-48 overflow-y-auto font-mono text-xs text-green-500 space-y-1 pr-2"
      >
        {messages.map((msg, index) => (
          <p key={index} className="whitespace-pre-wrap break-words">{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default SystemLog;
