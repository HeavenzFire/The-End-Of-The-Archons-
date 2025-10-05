
import React, { useState, useEffect } from 'react';

const AnimatedCounter: React.FC<{ end: number; duration?: number; label: string }> = ({ end, duration = 2000, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const endValue = end;
    if (start === endValue) return;

    const incrementTime = (duration / endValue);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === endValue) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <div className="text-center">
      <p className="text-4xl font-orbitron font-bold text-cyan-400 glow-text">{count.toLocaleString()}</p>
      <p className="text-xs uppercase tracking-widest text-green-400 mt-1">{label}</p>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="bg-black bg-opacity-50 border border-green-700 rounded-md p-4">
      <h2 className="text-xl font-orbitron glow-text-green tracking-widest border-b-2 border-green-700 pb-2 mb-4">LIVE STATUS</h2>
      <div className="grid grid-cols-2 gap-4">
        <AnimatedCounter end={184392} label="Systems Scanned" />
        <AnimatedCounter end={67491} label="Codes Neutralized" />
        <AnimatedCounter end={23847} label="Systems Deployed" />
        <div className="text-center">
            <p className="text-4xl font-orbitron font-bold text-cyan-400 glow-text">0.81 ▲</p>
            <p className="text-xs uppercase tracking-widest text-green-400 mt-1">Coherence Field</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
