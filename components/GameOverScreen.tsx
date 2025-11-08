
import React from 'react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart }) => {
  return (
    <div className="absolute inset-0 bg-slate-900 bg-opacity-80 backdrop-blur-sm flex flex-col justify-center items-center text-center p-4">
      <h2 className="text-7xl md:text-9xl font-bold text-red-500 drop-shadow-[0_2px_2px_rgba(255,0,0,0.5)] tracking-widest">
        GAME OVER
      </h2>
      <p className="text-slate-300 mt-4 text-2xl">Your final score is:</p>
      <p className="text-cyan-300 text-6xl font-bold mt-2 drop-shadow-[0_2px_2px_rgba(0,255,255,0.5)]">
        {score}
      </p>

      <button
        onClick={onRestart}
        className="mt-12 px-8 py-3 bg-cyan-500/10 border-2 border-cyan-400 text-cyan-300 text-2xl font-bold rounded-md shadow-lg
                   hover:bg-cyan-400 hover:text-slate-900 hover:border-cyan-200 transition-all duration-300
                   transform hover:scale-105 shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]"
      >
        PLAY AGAIN
      </button>
    </div>
  );
};
