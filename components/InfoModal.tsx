import React, { useEffect } from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scroll
      document.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out"
      onClick={onClose} 
      role="dialog"
      aria-modal="true"
      aria-labelledby="infoModalTitle"
    >
      <div
        className="bg-slate-800 text-slate-300 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all duration-300 ease-out scale-95 opacity-0 animate-modal-appear"
        onClick={(e) => e.stopPropagation()} 
      >
        <header className="flex justify-between items-center p-5 md:p-6 border-b border-slate-700 sticky top-0 bg-slate-800 z-10 rounded-t-xl">
          <h2 id="infoModalTitle" className="text-xl md:text-2xl font-semibold text-emerald-400">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-emerald-300 transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Chiudi finestra"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        <div className="p-5 md:p-6 overflow-y-auto space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;