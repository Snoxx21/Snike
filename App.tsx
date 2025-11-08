import React, { useState, useEffect, useCallback } from 'react';
import { useInterval } from './hooks/useInterval';
import {
  GRID_SIZE,
  DIFFICULTY_SETTINGS,
  INITIAL_SNAKE_POSITION,
  INITIAL_DIRECTION,
} from './constants';
import { Point, Direction, Difficulty, GameState } from './types';
import { audioManager } from './utils/audio';
import { MenuScreen } from './components/MenuScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { SpeakerIcon } from './components/icons/SpeakerIcon';
import { THEMES, Theme } from './themes';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE_POSITION);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [speed, setSpeed] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>(THEMES[0]);

  const generateFood = useCallback((snakeToAvoid: Point[]): Point => {
    const isOccupied = (p: Point, s: Point[]) => s.some(segment => segment.x === p.x && segment.y === p.y);

    let newFood: Point;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (isOccupied(newFood, snakeToAvoid));
    
    return newFood;
  }, []);

  const startGame = useCallback((selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    const { initialSpeed } = DIFFICULTY_SETTINGS[selectedDifficulty];
    setSpeed(initialSpeed);
    const initialSnake = INITIAL_SNAKE_POSITION;
    setSnake(initialSnake);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setFood(generateFood(initialSnake));
    
    const randomThemeIndex = Math.floor(Math.random() * THEMES.length);
    setTheme(THEMES[randomThemeIndex]);

    setGameState('PLAYING');
    audioManager.startMusic();
  }, [generateFood]);

  const restartGame = useCallback(() => {
    setGameState('MENU');
    audioManager.stopMusic();
  }, []);

  const gameOver = useCallback(() => {
    setSpeed(null);
    setGameState('GAME_OVER');
    audioManager.stopMusic();
    audioManager.playGameOverSound();
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    const key = e.key;

    const getDirectionFromKey = (k: string): Direction | null => {
      switch (k) {
        case 'ArrowUp': case 'w': return 'UP';
        case 'ArrowDown': case 's': return 'DOWN';
        case 'ArrowLeft': case 'a': return 'LEFT';
        case 'ArrowRight': case 'd': return 'RIGHT';
        default: return null;
      }
    };
    
    const newDirection = getDirectionFromKey(key);
    
    if (newDirection) {
      setDirection(prevDirection => {
        // Prevent snake from reversing
        if (
          (newDirection === 'UP' && prevDirection === 'DOWN') ||
          (newDirection === 'DOWN' && prevDirection === 'UP') ||
          (newDirection === 'LEFT' && prevDirection === 'RIGHT') ||
          (newDirection === 'RIGHT' && prevDirection === 'LEFT')
        ) {
          return prevDirection;
        }
        return newDirection;
      });
    }
  }, []);


  useEffect(() => {
    if (gameState === 'PLAYING') {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [gameState, handleKeyDown]);


  const gameLoop = useCallback(() => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'UP': head.y -= 1; break;
      case 'DOWN': head.y += 1; break;
      case 'LEFT': head.x -= 1; break;
      case 'RIGHT': head.x += 1; break;
    }

    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      gameOver();
      return;
    }

    // Self collision
    for (let i = 0; i < newSnake.length; i++) {
        if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
            gameOver();
            return;
        }
    }

    newSnake.unshift(head);

    // Food collision
    if (head.x === food.x && head.y === food.y) {
      const newScore = score + 1;
      setScore(newScore);
      const { initialSpeed, speedIncrement } = DIFFICULTY_SETTINGS[difficulty];
      setSpeed(Math.max(50, initialSpeed - newScore * speedIncrement));
      
      let newThemeIndex;
      const currentThemeIndex = THEMES.findIndex(t => t.name === theme.name);
      do {
          newThemeIndex = Math.floor(Math.random() * THEMES.length);
      } while (THEMES.length > 1 && newThemeIndex === currentThemeIndex);
      setTheme(THEMES[newThemeIndex]);

      setFood(generateFood(newSnake));
      audioManager.playFoodSound();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, score, difficulty, gameOver, generateFood, theme]);

  useInterval(gameLoop, speed);
  
  const toggleMute = () => {
    setIsMuted(audioManager.toggleMute());
  };

  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isSnake = snake.some(p => p.x === x && p.y === y);
        const isSnakeHead = isSnake && snake[0].x === x && snake[0].y === y;
        const isFood = food.x === x && food.y === y;
        
        const style: React.CSSProperties = { position: 'relative' };
        if (isSnakeHead) {
            style.backgroundColor = 'var(--snake-head-color)';
            style.borderRadius = '25%';
            style.transform = 'scale(1.1)';
            style.zIndex = '10';
        } else if (isSnake) {
            style.backgroundColor = 'var(--snake-body-color)';
            style.borderRadius = '25%';
        } else if (isFood) {
            style.backgroundColor = 'var(--food-color)';
            style.borderRadius = '50%';
            style.boxShadow = `0 0 10px var(--food-shadow-color)`;
        } else {
            style.backgroundColor = 'var(--grid-cell-color)';
        }

        cells.push(<div key={`${x}-${y}`} className="w-full h-full" style={style}></div>);
      }
    }
    return cells;
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center font-mono p-4 transition-colors duration-500"
      style={theme.colors as React.CSSProperties}
    >
      <div 
        className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl aspect-square bg-slate-800/20 rounded-lg transition-all duration-500"
        style={{
          border: '4px solid var(--border-color)',
          boxShadow: `0 0 2rem var(--shadow-color)`,
        }}
      >
        {gameState === 'MENU' && <MenuScreen onStart={startGame} />}
        {gameState === 'GAME_OVER' && <GameOverScreen score={score} onRestart={restartGame} />}
        
        {gameState === 'PLAYING' && (
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            }}
            className="w-full h-full gap-px p-1"
          >
             {renderGrid()}
          </div>
        )}

        <div className="absolute -top-12 left-0 right-0 flex justify-between items-center px-2">
            <h2
                className="text-3xl font-bold transition-colors duration-500"
                style={{ color: 'var(--text-color)' }}
            >
                SCORE: <span className="text-4xl">{score}</span>
            </h2>
            <button onClick={toggleMute} className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-700">
                <SpeakerIcon muted={isMuted} className="w-8 h-8"/>
            </button>
        </div>
      </div>
      <p className="text-slate-500 mt-4 text-sm">A simple snake game built with React &amp; TailwindCSS.</p>
    </div>
  );
};

export default App;
