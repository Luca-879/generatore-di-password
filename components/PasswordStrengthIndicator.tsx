
import React from 'react';
import { PasswordStrengthLevel } from '../types';

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrengthLevel;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ strength }) => {
  const strengthConfig = {
    [PasswordStrengthLevel.EMPTY]: { text: 'In attesa...', color: 'bg-slate-600', segments: 0 },
    [PasswordStrengthLevel.VERY_WEAK]: { text: 'Molto Debole', color: 'bg-red-500', segments: 1 },
    [PasswordStrengthLevel.WEAK]: { text: 'Debole', color: 'bg-orange-500', segments: 2 },
    [PasswordStrengthLevel.MEDIUM]: { text: 'Media', color: 'bg-yellow-500', segments: 3 },
    [PasswordStrengthLevel.STRONG]: { text: 'Forte', color: 'bg-lime-500', segments: 4 },
    [PasswordStrengthLevel.VERY_STRONG]: { text: 'Molto Forte!', color: 'bg-emerald-500', segments: 5 },
  };

  const currentConfig = strengthConfig[strength];

  return (
    <div className="w-full my-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-slate-300">Robustezza:</span>
        <span className={`text-xs font-bold ${
          strength === PasswordStrengthLevel.VERY_WEAK ? 'text-red-400' :
          strength === PasswordStrengthLevel.WEAK ? 'text-orange-400' :
          strength === PasswordStrengthLevel.MEDIUM ? 'text-yellow-400' :
          strength === PasswordStrengthLevel.STRONG ? 'text-lime-400' :
          strength === PasswordStrengthLevel.VERY_STRONG ? 'text-emerald-400' :
          'text-slate-400' 
        }`}>{currentConfig.text}</span>
      </div>
      <div className="flex h-2.5 rounded-full bg-slate-700 overflow-hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`flex-1 transition-all duration-300 ease-in-out ${index < currentConfig.segments ? currentConfig.color : 'bg-slate-700'} ${index > 0 ? 'ml-0.5' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;