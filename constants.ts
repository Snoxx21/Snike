// Fix: Define and export game constants to resolve 'Cannot find name' errors.
import { Point, Direction, Difficulty } from './types';

export const GRID_SIZE = 20;

export const DIFFICULTY_SETTINGS: {
  [key in Difficulty]: { initialSpeed: number; speedIncrement: number };
} = {
  EASY: { initialSpeed: 200, speedIncrement: 4 },
  MEDIUM: { initialSpeed: 150, speedIncrement: 6 },
  HARD: { initialSpeed: 100, speedIncrement: 8 },
};

export const INITIAL_SNAKE_POSITION: Point[] = [{ x: 10, y: 10 }];
export const INITIAL_DIRECTION: Direction = 'RIGHT';
