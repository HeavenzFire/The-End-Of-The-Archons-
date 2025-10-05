
import React from 'react';
import { Target, TargetPhase } from '../types';
import { TargetIcon } from './icons/TargetIcon';

interface TargetListProps {
  targetsByPhase: TargetPhase[];
  onSelectTarget: (target: Target) => void;
  selectedTarget: Target | null;
  isLoading: boolean;
}

const TargetList: React.FC<TargetListProps> = ({ targetsByPhase, onSelectTarget, selectedTarget, isLoading }) => {
  return (
    <div className="bg-black bg-opacity-50 border border-green-700 rounded-md p-4">
      <h2 className="text-xl font-orbitron glow-text-green tracking-widest border-b-2 border-green-700 pb-2 mb-4">IMMEDIATE TARGETS</h2>
      <div className="space-y-6">
        {targetsByPhase.map(phase => (
          <div key={phase.phase}>
            <h3 className="font-bold text-green-300 tracking-wider">{phase.phase}</h3>
            <div className="mt-2 space-y-2">
              {phase.targets.map(target => (
                <button
                  key={target.id}
                  onClick={() => onSelectTarget(target)}
                  disabled={isLoading}
                  className={`w-full text-left p-3 rounded-md transition-all duration-300 flex items-center space-x-3
                    ${selectedTarget?.id === target.id ? 'bg-green-500 text-slate-900' : 'bg-slate-800 hover:bg-slate-700'}
                    ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  <TargetIcon className={`w-6 h-6 flex-shrink-0 ${selectedTarget?.id === target.id ? 'text-slate-900' : 'text-cyan-400'}`} />
                  <div>
                    <p className="font-bold">{target.name}</p>
                    <p className={`text-xs ${selectedTarget?.id === target.id ? 'text-slate-800' : 'text-green-300 opacity-80'}`}>{target.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TargetList;
