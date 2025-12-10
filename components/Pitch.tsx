import React from 'react';
import { Player, Formation, Coordinates, Team } from '../types';
import { getMirroredCoordinates, DEFAULT_AVATAR } from '../constants';

interface PitchProps {
  bgUrl: string;
  formation: Formation;
  players: (Player | null)[];
  mode?: 'single' | 'match';
  awayFormation?: Formation;
  awayPlayers?: (Player | null)[];
  onSlotClick?: (index: number, isAway?: boolean) => void;
  showLabels?: boolean;
}

const Pitch: React.FC<PitchProps> = ({ 
  bgUrl, 
  formation, 
  players, 
  mode = 'single', 
  awayFormation, 
  awayPlayers,
  onSlotClick,
  showLabels = true
}) => {

  const renderPlayer = (player: Player | null, coords: Coordinates, index: number, isAway: boolean = false) => {
    // Simplified visual logic for labels
    const ringColor = isAway ? 'border-red-500' : 'border-emerald-400';
    
    return (
      <div 
        key={`${isAway ? 'away' : 'home'}-${index}`}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group hover:z-50"
        style={{ top: `${coords.top}%`, left: `${coords.left}%` }}
        onClick={() => onSlotClick && onSlotClick(index, isAway)}
      >
        {/* Avatar: Increased size significantly as requested previously */}
        <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full border-[3px] ${ringColor} bg-gray-900 overflow-hidden shadow-xl transition-transform duration-200 group-hover:scale-110 relative z-10`}>
          {player ? (
            <img 
              src={player.photoUrl} 
              alt={player.name} 
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold text-2xl hover:text-white transition-colors bg-black/40">+</div>
          )}
        </div>
        
        {/* Label: Reverted to cleaner, simpler style */}
        {showLabels && (
          <div className="mt-1 relative z-20 flex flex-col items-center">
            {player ? (
               <div className="bg-black/70 backdrop-blur-sm px-3 py-0.5 rounded text-center min-w-[80px] border-b-2 border-transparent group-hover:border-white transition-all">
                 <span className="block text-white font-teko text-lg md:text-xl leading-none tracking-wide uppercase shadow-black drop-shadow-md">
                   {player.name}
                 </span>
                 {/* Optional: Show rating in small pill */}
                 <div className="flex justify-center mt-[-2px]">
                    <span className={`text-[10px] font-bold px-1 rounded ${isAway ? 'text-red-300' : 'text-emerald-300'}`}>
                        {player.rating}
                    </span>
                 </div>
               </div>
            ) : (
                <span className="text-xs bg-black/50 text-white px-2 py-0.5 rounded font-mono">
                    {index === 0 ? 'GK' : 'POS'}
                </span>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full aspect-[2/3] md:aspect-[3/4] rounded-xl overflow-hidden border-4 border-gray-800 shadow-2xl bg-gray-900">
      {/* Pitch Texture */}
      <img src={bgUrl} alt="Pitch" className="absolute inset-0 w-full h-full object-cover opacity-90" />
      
      {/* Subtle Pitch Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/2 bottom-0 w-[2px] bg-white/40 -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/40 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full border-2 border-white/40 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 left-1/2 w-40 h-20 border-b-2 border-l-2 border-r-2 border-white/40 -translate-x-1/2 rounded-b-sm"></div>
        <div className="absolute bottom-0 left-1/2 w-40 h-20 border-t-2 border-l-2 border-r-2 border-white/40 -translate-x-1/2 rounded-t-sm"></div>
      </div>

      {/* Home Team */}
      {formation.positions.map((coords, i) => renderPlayer(players[i], coords, i, false))}

      {/* Away Team (if match mode) */}
      {mode === 'match' && awayFormation && awayPlayers && (
        getMirroredCoordinates(awayFormation.positions).map((coords, i) => 
          renderPlayer(awayPlayers[i], coords, i, true)
        )
      )}
    </div>
  );
};

export default Pitch;