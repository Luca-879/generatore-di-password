
import React, { useState, useEffect } from 'react';
import PasswordGenerator from './components/PasswordGenerator';
import InfoModal from './components/InfoModal'; 

const App: React.FC = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [appDescription, setAppDescription] = useState('');

  useEffect(() => {
    fetch('/metadata.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data && data.description) {
          setAppDescription(data.description);
        }
      })
      .catch(error => console.error('Error fetching metadata:', error));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 selection:bg-emerald-500 selection:text-white">
      <header className="mb-6 text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 drop-shadow-lg">
          Generatore di Password Pro
        </h1>
        <p className="text-slate-300 mt-2 text-lg">Crea la tua password perfetta e ultra sicura!</p>
        <button
          onClick={() => setIsInfoModalOpen(true)}
          className="text-emerald-400 hover:text-emerald-300 underline text-md mt-4 transition-colors duration-150"
          aria-haspopup="dialog"
          aria-expanded={isInfoModalOpen}
        >
          Scopri perché e come usare questo generatore
        </button>
      </header>

      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title="Potenzia la Tua Sicurezza Digitale!"
      >
        <p className="mb-3 text-sm md:text-base leading-relaxed">
          Nell'era digitale, le password sono la prima linea di difesa per i tuoi account online. Password deboli,
          riutilizzate o facili da indovinare sono un invito aperto per i malintenzionati. Il mio
          Generatore di Password Pro crea password <strong className="text-emerald-400">complesse e uniche</strong>,
          rendendo estremamente difficile per chiunque accedere ai tuoi dati sensibili.
        </p>
        <p className="mb-6 text-sm md:text-base leading-relaxed">
          Proteggi la tua identità online e dormi sonni tranquilli!
        </p>

        <h3 className="text-xl font-semibold text-sky-400 mb-3 text-center">Come Creare la Tua Super Password:</h3>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base leading-relaxed marker:text-emerald-400 mb-6">
          <li>
            <strong className="text-slate-100">Scegli la Lunghezza:</strong> Trascina lo slider per definire quanto vuoi che sia lunga la tua password.
            Consiglio: almeno 12-16 caratteri.
          </li>
          <li>
            <strong className="text-slate-100">Seleziona i Caratteri:</strong> Attiva le opzioni per includere lettere maiuscole (A-Z),
            minuscole (a-z), numeri (0-9) e simboli (!@#$). Un mix variegato aumenta drasticamente la robustezza!
          </li>
          <li>
            <strong className="text-slate-100">Genera & Copia:</strong> Clicca su '<span className="text-emerald-400 font-semibold">Genera Password</span>' e voilà! La tua nuova password
            super sicura apparirà. Usa il comodo pulsante con l'icona per copiarla istantaneamente.
          </li>
          <li>
            <strong className="text-slate-100">Consiglio Pro:</strong> Usa una password <strong className="text-sky-300">diversa e unica</strong> per ogni account importante.
            Non appuntarle su post-it! Considera un gestore di password per tenerle al sicuro.
          </li>
        </ul>

        <div className="border-t border-slate-700 my-6"></div>

        <h3 className="text-xl font-semibold text-sky-400 mb-3 text-center">La Tua Privacy è la Mia Priorità</h3>
        <p className="text-sm md:text-base leading-relaxed text-center">
          Questo generatore di password opera <strong className="text-emerald-400">interamente nel tuo browser</strong>.
          Nessuna password generata, né alcuna delle tue impostazioni, viene inviata, memorizzata o condivisa
          con server esterni o terze parti. <strong className="text-slate-100">La tua sicurezza e privacy sono garantite al 100%</strong>.
          Puoi usare questo strumento con la massima tranquillità.
        </p>
      </InfoModal>

      <PasswordGenerator />

      <footer className="mt-12 text-center text-slate-400 text-sm px-4">
        {appDescription && <p className="mb-2">{appDescription}</p>}
        <p>&copy; {new Date().getFullYear()} Generatore di Password Pro. Proteggi la tua vita digitale.</p>
        <p>Creato con <span className="text-emerald-400 animate-pulse">❤</span> da: Luca Difede</p>
      </footer>
    </div>
  );
};

export default App;
