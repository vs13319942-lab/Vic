
import React, { useEffect } from 'react';
import { Animal, Language } from '../types';

interface CompletionModalProps {
  animal: Animal;
  onPlayAgain: () => void;
  onMenu: () => void;
  t: { [key: string]: string };
  lang: Language;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ animal, onPlayAgain, onMenu, t, lang }) => {
  useEffect(() => {
    // Simulate playing sound
    console.log(`Playing sound: ${animal.sound}`);
    // In a real app, you would use something like:
    // const audio = new Audio(`/sounds/${animal.sound}`);
    // audio.play();
  }, [animal.sound]);
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center transform scale-up-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
            {/* Confetti-like background */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-yellow-500 drop-shadow-md">{t.wellDone}</h1>
          <h2 className="text-3xl font-semibold text-green-600 mt-2">{t.youDidIt}</h2>
          
          <img src={animal.image} alt={animal.name[lang]} className="w-48 h-48 object-cover rounded-full mx-auto my-6 border-8 border-green-400 shadow-lg"/>
          
          <h3 className="text-4xl font-bold text-gray-800">{animal.name[lang]}</h3>
          <p className="text-lg text-gray-600 mt-4 px-4">{animal.description[lang]}</p>
          
          <div className="mt-8 flex justify-center space-x-4">
            <button onClick={onPlayAgain} className="bg-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105">
              {t.playAgain}
            </button>
            <button onClick={onMenu} className="bg-orange-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-orange-600 transition-transform transform hover:scale-105">
              {t.backToMenu}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in {
            animation: fade-in 0.5s ease-in-out;
        }
        @keyframes scale-up-center {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .scale-up-center {
            animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default CompletionModal;
