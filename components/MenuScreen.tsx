// Fix: Implement the MenuScreen component to resolve 'Cannot find name' errors.
import React from 'react';
import { audioManager } from '../utils/audio';
import { ArrowKeysIcon } from './icons/ArrowKeysIcon';
import { WASDIcon } from './icons/WASDIcon';
import { Difficulty } from '../types';

interface MenuScreenProps {
  onStart: (difficulty: Difficulty) => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ onStart }) => {
  const handleStart = (difficulty: Difficulty) => {
    // Initialize audio on user interaction
    audioManager.initialize();
    onStart(difficulty);
  };

  return (
    <div className="absolute inset-0 bg-slate-900 bg-opacity-80 backdrop-blur-sm flex flex-col justify-center items-center text-center p-4">
      <h1 className="text-8xl md:text-9xl font-bold text-cyan-300 drop-shadow-[0_2px_2px_rgba(0,255,255,0.5)] tracking-widest">
        SNAKE
      </h1>
      <p className="text-slate-400 mt-4 text-xl">Choose your difficulty.</p>
      
      <div className="mt-12 flex flex-col md:flex-row gap-4">
        <button
          onClick={() => handleStart('EASY')}
          className="px-8 py-3 bg-green-500/10 border-2 border-green-400 text-green-300 text-2xl font-bold rounded-md shadow-lg
                     hover:bg-green-400 hover:text-slate-900 hover:border-green-200 transition-all duration-300
                     transform hover:scale-105 shadow-[0_0_15px_rgba(0,255,0,0.3)] hover:shadow-[0_0_25px_rgba(0,255,0,0.6)]"
        >
          EASY
        </button>
        <button
          onClick={() => handleStart('MEDIUM')}
          className="px-8 py-3 bg-cyan-500/10 border-2 border-cyan-400 text-cyan-300 text-2xl font-bold rounded-md shadow-lg
                     hover:bg-cyan-400 hover:text-slate-900 hover:border-cyan-200 transition-all duration-300
                     transform hover:scale-105 shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]"
        >
          MEDIUM
        </button>
        <button
          onClick={() => handleStart('HARD')}
          className="px-8 py-3 bg-red-500/10 border-2 border-red-400 text-red-300 text-2xl font-bold rounded-md shadow-lg
                     hover:bg-red-400 hover:text-slate-900 hover:border-red-200 transition-all duration-300
                     transform hover:scale-105 shadow-[0_0_15px_rgba(255,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,0,0,0.6)]"
        >
          HARD
        </button>
      </div>

      <div className="mt-16 text-slate-400">
        <h3 className="text-lg font-bold text-slate-300">CONTROLS</h3>
        <div className="flex justify-center items-center gap-12 mt-4">
          <div className="flex flex-col items-center gap-2">
            <WASDIcon className="w-24 h-auto" />
            <p>W-A-S-D</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ArrowKeysIcon className="w-24 h-auto" />
            <p>Arrow Keys</p>
          </div>
        </div>
      </div>
    </div>
  );
};
