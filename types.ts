
export enum Language {
  EN = 'en',
  ES = 'es',
}

export enum Category {
  FARM = 'farm',
  JUNGLE = 'jungle',
  PETS = 'pets',
  AQUATIC = 'aquatic',
}

export interface Animal {
  id: number;
  name: { [key in Language]: string };
  category: Category;
  image: string;
  sound: string; // Placeholder for sound file path
  description: { [key in Language]: string };
}

export interface PuzzlePiece {
  id: number;
  correctIndex: number;
  shuffledIndex: number;
  isPlaced: boolean;
}

export type Screen = 'menu' | 'level-select' | 'game';
