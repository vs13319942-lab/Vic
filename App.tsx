
import React, { useState, useCallback } from 'react';
import { Animal, Language, Screen } from './types';
import MainMenu from './components/MainMenu';
import LevelSelect from './components/LevelSelect';
import GameScreen from './components/GameScreen';
import { translations } from './constants';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('menu');
  const [currentAnimal, setCurrentAnimal] = useState<Animal | null>(null);
  const [language, setLanguage] = useState<Language>(Language.ES);
  const [difficulty, setDifficulty] = useState<2 | 3 | 4>(2);

  const t = translations[language];

  const startGame = useCallback((animal: Animal) => {
    setCurrentAnimal(animal);
    setScreen('game');
  }, []);

  const backToMenu = useCallback(() => {
    setScreen('menu');
    setCurrentAnimal(null);
  }, []);
  
  const goToLevelSelect = useCallback(() => {
    setScreen('level-select');
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case 'menu':
        return <MainMenu t={t} onPlay={goToLevelSelect} />;
      case 'level-select':
        return <LevelSelect t={t} onSelectAnimal={startGame} onBack={backToMenu} />;
      case 'game':
        if (currentAnimal) {
          return (
            <GameScreen
              animal={currentAnimal}
              difficulty={difficulty}
              onBack={goToLevelSelect}
              onMenu={backToMenu}
              t={t}
            />
          );
        }
        return null;
      default:
        return <MainMenu t={t} onPlay={goToLevelSelect} />;
    }
  };
  
  const difficultyText = {
    2: t.easy,
    3: t.medium,
    4: t.hard
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-20" 
        style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/jungle.png')"}}
      ></div>
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-4 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-md">
         <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-yellow-600"> Nivel: {difficultyText[difficulty]}</span>
            <select
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value) as 2 | 3 | 4)}
                className="bg-yellow-400 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
                <option value={2}>{t.easy}</option>
                <option value={3}>{t.medium}</option>
                <option value={4}>{t.hard}</option>
            </select>
        </div>
        <div className="flex items-center space-x-2">
            <span role="img" aria-label="language" className="text-2xl">{language === Language.EN ? '🇺🇸' : '🇪🇸'}</span>
            <button
              onClick={() => setLanguage(lang => lang === Language.EN ? Language.ES : Language.EN)}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              {language === Language.EN ? 'Español' : 'English'}
            </button>
        </div>
      </div>
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
