
import React from 'react';

interface MainMenuProps {
  onPlay: () => void;
  t: { [key: string]: string };
}

const MenuButton: React.FC<{ onClick: () => void; color: string; children: React.ReactNode; icon: string; }> = ({ onClick, color, children, icon }) => (
    <button
        onClick={onClick}
        className={`w-64 h-24 rounded-2xl text-white text-3xl font-bold shadow-lg flex items-center justify-center space-x-4 transform transition-transform hover:scale-105 ${color}`}
    >
        <span className="text-4xl">{icon}</span>
        <span>{children}</span>
    </button>
);


const MainMenu: React.FC<MainMenuProps> = ({ onPlay, t }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-8xl font-bold text-green-700 drop-shadow-lg">
          Animales Puzzle Kids
        </h1>
        <p className="text-2xl text-yellow-600 font-semibold mt-2">Lite</p>
      </div>
      <div className="space-y-6">
        <MenuButton onClick={onPlay} color="bg-green-500 hover:bg-green-600" icon="🧩">{t.play}</MenuButton>
        <MenuButton onClick={() => alert(t.learn + ' ' + t.sounds + ' - ' + t.settings + ' sections coming soon!')} color="bg-blue-500 hover:bg-blue-600" icon="💡">{t.learn}</MenuButton>
        <MenuButton onClick={() => alert(t.learn + ' ' + t.sounds + ' - ' + t.settings + ' sections coming soon!')} color="bg-yellow-500 hover:bg-yellow-600" icon="🔊">{t.sounds}</MenuButton>
        <MenuButton onClick={() => alert(t.learn + ' ' + t.sounds + ' - ' + t.settings + ' sections coming soon!')} color="bg-red-500 hover:bg-red-600" icon="⚙️">{t.settings}</MenuButton>
      </div>
    </div>
  );
};

export default MainMenu;
