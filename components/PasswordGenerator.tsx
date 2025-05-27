
import React, { useState, useCallback, useEffect } from 'react';
import { PasswordOptions, PasswordStrengthLevel } from '../types';
import { UPPERCASE_CHARS, LOWERCASE_CHARS, NUMBER_CHARS, SYMBOL_CHARS } from '../constants';
import Checkbox from './Checkbox';
import Slider from './Slider';
import Button from './Button';
import CopyToClipboardButton from './CopyToClipboardButton';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const PasswordGenerator: React.FC = () => {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });
  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [strength, setStrength] = useState<PasswordStrengthLevel>(PasswordStrengthLevel.EMPTY);

  const calculateStrength = useCallback((password: string, currentOptions: PasswordOptions): PasswordStrengthLevel => {
    if (!password) return PasswordStrengthLevel.EMPTY;

    let score = 0;
    const len = password.length;

    if (len >= 8) score += 1;
    if (len >= 12) score += 1;
    if (len >= 16) score += 1;

    let charTypes = 0;
    if (currentOptions.includeUppercase && /[A-Z]/.test(password)) charTypes++;
    if (currentOptions.includeLowercase && /[a-z]/.test(password)) charTypes++;
    if (currentOptions.includeNumbers && /[0-9]/.test(password)) charTypes++;
    if (currentOptions.includeSymbols && /[^A-Za-z0-9]/.test(password)) charTypes++;
    
    if (charTypes === 1 && len < 10) score -=1; // Penalize single type short passwords
    if (charTypes >= 2) score += 1;
    if (charTypes >= 3) score += 1;
    if (charTypes >= 4) score += 1;


    if (score <= 0 && len > 0) return PasswordStrengthLevel.VERY_WEAK;
    if (score === 1) return PasswordStrengthLevel.WEAK;
    if (score === 2) return PasswordStrengthLevel.MEDIUM;
    if (score === 3) return PasswordStrengthLevel.STRONG;
    if (score >= 4) return PasswordStrengthLevel.VERY_STRONG;
    
    // Fallback based on simpler logic if score is unusual
    if (len === 0) return PasswordStrengthLevel.EMPTY;
    if (len < 8 || charTypes < 2) return PasswordStrengthLevel.VERY_WEAK;
    if (len < 10 || charTypes < 3) return PasswordStrengthLevel.WEAK;
    if (len < 12 || charTypes < 4) return PasswordStrengthLevel.MEDIUM;
    if (len < 16) return PasswordStrengthLevel.STRONG;
    return PasswordStrengthLevel.VERY_STRONG;

  }, []);

  const handleGeneratePassword = useCallback(() => {
    setError('');
    if (!options.includeUppercase && !options.includeLowercase && !options.includeNumbers && !options.includeSymbols) {
      setError('Per favore, seleziona almeno un tipo di carattere.');
      setGeneratedPassword('');
      setStrength(PasswordStrengthLevel.EMPTY);
      return;
    }

    let charPool = '';
    const guaranteedChars: string[] = [];

    if (options.includeUppercase) {
      charPool += UPPERCASE_CHARS;
      guaranteedChars.push(UPPERCASE_CHARS[Math.floor(Math.random() * UPPERCASE_CHARS.length)]);
    }
    if (options.includeLowercase) {
      charPool += LOWERCASE_CHARS;
      guaranteedChars.push(LOWERCASE_CHARS[Math.floor(Math.random() * LOWERCASE_CHARS.length)]);
    }
    if (options.includeNumbers) {
      charPool += NUMBER_CHARS;
      guaranteedChars.push(NUMBER_CHARS[Math.floor(Math.random() * NUMBER_CHARS.length)]);
    }
    if (options.includeSymbols) {
      charPool += SYMBOL_CHARS;
      guaranteedChars.push(SYMBOL_CHARS[Math.floor(Math.random() * SYMBOL_CHARS.length)]);
    }
    
    const currentPasswordLength = Math.max(options.length, guaranteedChars.length);
    if (options.length < guaranteedChars.length) {
        setOptions(prev => ({...prev, length: guaranteedChars.length}));
    }


    let remainingLength = currentPasswordLength - guaranteedChars.length;
    const randomChars: string[] = [];

    if (charPool.length > 0) { 
        for (let i = 0; i < remainingLength; i++) {
          randomChars.push(charPool[Math.floor(Math.random() * charPool.length)]);
        }
    } else if (remainingLength > 0) { 
        setError('Il set di caratteri è vuoto, impossibile generare la password.');
        setGeneratedPassword('');
        setStrength(PasswordStrengthLevel.EMPTY);
        return;
    }
    
    const finalPasswordArray = shuffleArray([...guaranteedChars, ...randomChars]).slice(0, currentPasswordLength);
    const newPassword = finalPasswordArray.join('');
    
    setGeneratedPassword(newPassword);
    setStrength(calculateStrength(newPassword, options));
  }, [options, calculateStrength]);

  useEffect(() => {
    handleGeneratePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.length]); 

  useEffect(() => {
    handleGeneratePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleOptionChange = <K extends keyof PasswordOptions,>(option: K, value: PasswordOptions[K]) => {
    setOptions(prev => ({ ...prev, [option]: value }));
  };
  
  const canGenerate = options.includeUppercase || options.includeLowercase || options.includeNumbers || options.includeSymbols;

  return (
    <div className="w-full max-w-lg bg-slate-800 shadow-2xl rounded-xl p-6 md:p-8 space-y-6 transform transition-all duration-500 hover:scale-[1.01]">
      <div className="relative">
        <input
          type="text"
          readOnly
          value={generatedPassword}
          placeholder="P@$$wOrd"
          aria-label="Password Generata"
          className="w-full p-4 pr-14 bg-slate-900 text-emerald-400 rounded-lg text-xl font-mono tracking-wider border-2 border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
        />
        {generatedPassword && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <CopyToClipboardButton textToCopy={generatedPassword} />
          </div>
        )}
      </div>

      {error && <p className="text-red-400 text-sm text-center animate-pulse">{error}</p>}
      
      <PasswordStrengthIndicator strength={strength} />

      <div className="space-y-5">
        <div>
          <label htmlFor="length" className="block text-sm font-medium text-slate-300 mb-1">
            Lunghezza Password: <span className="text-emerald-400 font-bold">{options.length}</span>
          </label>
          <Slider
            id="length"
            min={6}
            max={64}
            value={options.length}
            onChange={(e) => handleOptionChange('length', parseInt(e.target.value, 10))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <Checkbox
            id="includeUppercase"
            label="Includi Maiuscole (A-Z)"
            checked={options.includeUppercase}
            onChange={(e) => handleOptionChange('includeUppercase', e.target.checked)}
          />
          <Checkbox
            id="includeLowercase"
            label="Includi Minuscole (a-z)"
            checked={options.includeLowercase}
            onChange={(e) => handleOptionChange('includeLowercase', e.target.checked)}
          />
          <Checkbox
            id="includeNumbers"
            label="Includi Numeri (0-9)"
            checked={options.includeNumbers}
            onChange={(e) => handleOptionChange('includeNumbers', e.target.checked)}
          />
          <Checkbox
            id="includeSymbols"
            label="Includi Simboli (!@#$)"
            checked={options.includeSymbols}
            onChange={(e) => handleOptionChange('includeSymbols', e.target.checked)}
          />
        </div>
      </div>

      <Button 
        onClick={handleGeneratePassword}
        disabled={!canGenerate}
        className="w-full text-lg py-3.5 transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95"
      >
        {canGenerate ? 'Genera Password' : 'Seleziona Opzioni'}
      </Button>
    </div>
  );
};

export default PasswordGenerator;