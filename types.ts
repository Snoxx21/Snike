// Fix: Define and export game types to resolve 'Cannot find name' errors.
export interface Point {
  x: number;
  y: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type GameState = 'MENU' | 'PLAYING' | 'GAME_OVER';
