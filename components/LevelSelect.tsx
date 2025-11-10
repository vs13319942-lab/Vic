
import React from 'react';
import { ANIMALS } from '../constants';
import { Animal, Category, Language } from '../types';

interface LevelSelectProps {
  onSelectAnimal: (animal: Animal) => void;
  onBack: () => void;
  t: { [key: string]: string };
}

const CategorySection: React.FC<{ title: string, animals: Animal[], onSelect: (animal: Animal) => void, lang: Language }> = ({ title, animals, onSelect, lang }) => (
  <div className="mb-8">
    <h2 className="text-4xl font-bold text-green-800 mb-4 capitalize">{title}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {animals.map(animal => (
        <button
          key={animal.id}
          onClick={() => onSelect(animal)}
          className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center space-y-2 transform transition-transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-400"
        >
          <img src={animal.image} alt={animal.name[lang]} className="w-24 h-24 object-cover rounded-full border-4 border-yellow-400" />
          <span className="text-xl font-bold text-gray-700">{animal.name[lang]}</span>
        </button>
      ))}
    </div>
  </div>
);

const LevelSelect: React.FC<LevelSelectProps> = ({ onSelectAnimal, onBack, t }) => {
  const lang = Object.keys(t).includes('play') && t.play === 'Play' ? Language.EN : Language.ES;
  
  const animalsByCategory = (category: Category) => ANIMALS.filter(a => a.category === category);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
            <button onClick={onBack} className="bg-orange-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-orange-600 transition-transform transform hover:scale-105">
                ← {t.backToMenu}
            </button>
            <h1 className="text-5xl font-bold text-center text-green-700 drop-shadow-md">{t.selectAPuzzle}</h1>
            <div className="w-24"></div>
        </div>

      <CategorySection title={t.farm} animals={animalsByCategory(Category.FARM)} onSelect={onSelectAnimal} lang={lang} />
      <CategorySection title={t.jungle} animals={animalsByCategory(Category.JUNGLE)} onSelect={onSelectAnimal} lang={lang} />
      <CategorySection title={t.pets} animals={animalsByCategory(Category.PETS)} onSelect={onSelectAnimal} lang={lang} />
      <CategorySection title={t.aquatic} animals={animalsByCategory(Category.AQUATIC)} onSelect={onSelectAnimal} lang={lang} />
    </div>
  );
};

export default LevelSelect;
