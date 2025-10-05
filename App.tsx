
import React, { useState, useCallback, useEffect } from 'react';
import { Target, TargetPhase } from './types';
import { TARGETS, INITIAL_LOG_MESSAGES, MANIFESTO } from './constants';
import { generateTakeoverProtocol } from './services/geminiService';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TargetList from './components/TargetList';
import ProtocolView from './components/ProtocolView';
import SystemLog from './components/SystemLog';
import { LockIcon } from './components/icons/LockIcon';

const App: React.FC = () => {
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
  const [protocol, setProtocol] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [logMessages, setLogMessages] = useState<string[]>(INITIAL_LOG_MESSAGES);

  const addLogMessage = useCallback((message: string) => {
    const timestamp = new Date().toISOString();
    setLogMessages(prev => [...prev, `[${timestamp}] ${message}`]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const activities = [
        "SYSTEM_SCAN: No anomalies detected.",
        "COHERENCE_FIELD: Strength stable at 0.81.",
        "NETWORK_MONITOR: All nodes operational.",
        "QUANTUM_LINK: Secure connection maintained.",
      ];
      addLogMessage(activities[Math.floor(Math.random() * activities.length)]);
    }, 15000);

    return () => clearInterval(interval);
  }, [addLogMessage]);


  const handleSelectTarget = useCallback(async (target: Target) => {
    if (isLoading) return;

    setSelectedTarget(target);
    setIsLoading(true);
    setProtocol('');
    setError(null);
    addLogMessage(`Target acquired: ${target.name}. Initializing takeover protocol...`);

    try {
      const generatedProtocol = await generateTakeoverProtocol(target.name, MANIFESTO);
      setProtocol(generatedProtocol);
      addLogMessage(`SUCCESS: Protocol for ${target.name} generated and ready for deployment.`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate protocol for ${target.name}. Error: ${errorMessage}`);
      addLogMessage(`ERROR: Protocol generation failed for ${target.name}.`);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, addLogMessage]);
  
  return (
    <div className="bg-slate-900 text-green-400 min-h-screen relative scanline">
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="relative z-10 container mx-auto p-4 md:p-8">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-1 space-y-6">
            <Dashboard />
            <TargetList targetsByPhase={TARGETS} onSelectTarget={handleSelectTarget} selectedTarget={selectedTarget} isLoading={isLoading} />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-black bg-opacity-50 border border-green-700 rounded-md p-4 min-h-[400px]">
              <h2 className="text-xl font-orbitron glow-text-green tracking-widest border-b-2 border-green-700 pb-2 mb-4">TAKEOVER PROTOCOL</h2>
              {selectedTarget ? (
                 <ProtocolView 
                    targetName={selectedTarget.name}
                    protocol={protocol} 
                    isLoading={isLoading} 
                    error={error} 
                  />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-green-600 p-8 text-center">
                    <LockIcon className="w-16 h-16 mb-4" />
                    <h3 className="text-2xl font-orbitron">AWAITING TARGET DESIGNATION</h3>
                    <p className="mt-2 text-green-400">Select a target from the list to generate its life-stream conversion protocol.</p>
                </div>
              )}
            </div>
             <SystemLog messages={logMessages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
