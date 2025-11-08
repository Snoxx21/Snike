// New: Defines multiple color themes for the game.
export interface Theme {
  name: string;
  colors: {
    '--background-color': string;
    '--border-color': string;
    '--grid-cell-color': string;
    '--snake-head-color': string;
    '--snake-body-color': string;
    '--food-color': string;
    '--text-color': string;
    '--shadow-color': string;
    '--food-shadow-color': string;
  };
}

export const THEMES: Theme[] = [
  {
    name: 'Default Cyan',
    colors: {
      '--background-color': '#0f172a', // slate-900
      '--border-color': 'rgba(6, 182, 212, 0.3)', // cyan-500/30
      '--grid-cell-color': 'rgba(30, 41, 59, 0.5)', // slate-800/50
      '--snake-head-color': '#a5f3fc', // cyan-200
      '--snake-body-color': '#22d3ee', // cyan-400
      '--food-color': '#ef4444', // red-500
      '--text-color': '#67e8f9', // cyan-300
      '--shadow-color': 'rgba(6, 182, 212, 0.2)', // cyan-500/20
      '--food-shadow-color': 'rgba(239, 68, 68, 0.5)', // red-500/50
    },
  },
  {
    name: 'Cyberpunk Neon',
    colors: {
      '--background-color': '#1e1b4b', // indigo-950
      '--border-color': 'rgba(217, 70, 239, 0.3)', // fuchsia-500/30
      '--grid-cell-color': 'rgba(55, 48, 163, 0.5)', // indigo-900/50
      '--snake-head-color': '#f5d0fe', // fuchsia-200
      '--snake-body-color': '#d946ef', // fuchsia-500
      '--food-color': '#facc15', // yellow-400
      '--text-color': '#f0abfc', // fuchsia-300
      '--shadow-color': 'rgba(217, 70, 239, 0.2)', // fuchsia-500/20
      '--food-shadow-color': 'rgba(250, 204, 21, 0.5)', // yellow-400/50
    },
  },
  {
    name: 'Matrix Green',
    colors: {
      '--background-color': '#000000',
      '--border-color': 'rgba(34, 197, 94, 0.3)', // green-500/30
      '--grid-cell-color': 'rgba(20, 83, 45, 0.5)', // green-900/50
      '--snake-head-color': '#bbf7d0', // green-200
      '--snake-body-color': '#4ade80', // green-400
      '--food-color': '#eab308', // yellow-500
      '--text-color': '#86efac', // green-300
      '--shadow-color': 'rgba(34, 197, 94, 0.2)', // green-500/20
      '--food-shadow-color': 'rgba(234, 179, 8, 0.5)', // yellow-500/50
    },
  },
  {
    name: 'Vaporwave Sunset',
    colors: {
      '--background-color': '#312e81', // indigo-900
      '--border-color': 'rgba(236, 72, 153, 0.3)', // pink-500/30
      '--grid-cell-color': 'rgba(79, 70, 229, 0.5)', // indigo-700/50
      '--snake-head-color': '#a5f3fc', // cyan-200
      '--snake-body-color': '#67e8f9', // cyan-300
      '--food-color': '#fb923c', // orange-400
      '--text-color': '#f9a8d4', // pink-300
      '--shadow-color': 'rgba(236, 72, 153, 0.2)', // pink-500/20
      '--food-shadow-color': 'rgba(251, 146, 60, 0.5)', // orange-400/50
    },
  },
   {
    name: 'Blood Moon',
    colors: {
      '--background-color': '#111827', // gray-900
      '--border-color': 'rgba(220, 38, 38, 0.3)', // red-600/30
      '--grid-cell-color': 'rgba(55, 65, 81, 0.5)', // gray-700/50
      '--snake-head-color': '#fca5a5', // red-300
      '--snake-body-color': '#ef4444', // red-500
      '--food-color': '#fbbf24', // amber-400
      '--text-color': '#f87171', // red-400
      '--shadow-color': 'rgba(220, 38, 38, 0.2)', // red-600/20
      '--food-shadow-color': 'rgba(251, 191, 36, 0.5)', // amber-400/50
    },
  },
];