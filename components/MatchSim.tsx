import React, { useState, useEffect } from 'react';
import { ChevronLeft, PlayCircle, Trophy, Save, RefreshCw, Swords } from 'lucide-react';
import { storageService } from '../services/storageService';
import { geminiService } from '../services/geminiService';
import { Team, MatchResult, Player, Formation } from '../types';
import { PITCHES, FORMATIONS_LIST, DEFAULT_BALL, DEFAULT_AVATAR } from '../constants';
import Pitch from './Pitch';
import PlayerModal from './PlayerModal';

interface MatchSimProps {
  onBack: () => void;
  preselectedHomeId: string | null;
}

const MatchSim: React.FC<MatchSimProps> = ({ onBack, preselectedHomeId }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  
  // Independent State for Home and Away (Full Objects for manipulation)
  const [homeTeam, setHomeTeam] = useState<Team | null>(null);
  const [awayTeam, setAwayTeam] = useState<Team | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);
  
  // Modal State
  const [modalState, setModalState] = useState<{ isOpen: boolean, side: 'home' | 'away' | null, slotIndex: number | null }>({
      isOpen: false, side: null, slotIndex: null
  });

  useEffect(() => {
    const allTeams = storageService.getTeams();
    setTeams(allTeams);

    // Initial Setup
    if (preselectedHomeId) {
        const h = allTeams.find(t => t.id === preselectedHomeId);
        if(h) setHomeTeam(JSON.parse(JSON.stringify(h))); // Deep copy to avoid mutating reference immediately
    } else if (allTeams.length > 0) {
        setHomeTeam(JSON.parse(JSON.stringify(allTeams[0])));
    }

    // Default Away Team (Try to find a different one)
    if (allTeams.length > 1) {
         const a = allTeams.find(t => t.id !== preselectedHomeId);
         if(a) setAwayTeam(JSON.parse(JSON.stringify(a)));
    } else {
        // Create empty dummy if needed or just copy home
        setAwayTeam(JSON.parse(JSON.stringify(allTeams[0] || createEmptyTeam('Adversaire'))));
    }
  }, [preselectedHomeId]);

  const createEmptyTeam = (name: string): Team => ({
      id: Date.now().toString(),
      name,
      logoUrl: '',
      primaryColor: '#fff',
      formationName: '4-4-2 Flat',
      pitchId: 'p1',
      players: Array(11).fill(null),
  });

  const handleSimulate = async () => {
    if (!homeTeam || !awayTeam) return;
    
    // Validate lineups
    const homeCount = homeTeam.players.filter(p => p).length;
    const awayCount = awayTeam.players.filter(p => p).length;

    if (homeCount < 11 || awayCount < 11) {
        if (!confirm(`Attention : Les équipes ne sont pas complètes (Domicile: ${homeCount}/11, Extérieur: ${awayCount}/11). Simuler quand même ?`)) {
            return;
        }
    }

    setIsPlaying(true);
    setResult(null);
    
    setTimeout(async () => {
        const res = await geminiService.simulateMatch(homeTeam, awayTeam);
        setResult(res);
        setIsPlaying(false);
    }, 2000);
  };

  const handleSaveTeam = (team: Team | null) => {
      if(!team) return;
      storageService.saveTeam(team);
      alert(`Équipe "${team.name}" sauvegardée !`);
      setTeams(storageService.getTeams()); // Refresh list
  };

  const handleTeamChange = (side: 'home' | 'away', teamId: string) => {
      const t = teams.find(x => x.id === teamId);
      if(t) {
          const clone = JSON.parse(JSON.stringify(t));
          if(side === 'home') setHomeTeam(clone);
          else setAwayTeam(clone);
      }
  };

  const handleFormationChange = (side: 'home' | 'away', fName: string) => {
      const target = side === 'home' ? homeTeam : awayTeam;
      if(target) {
          const updated = { ...target, formationName: fName };
          if(side === 'home') setHomeTeam(updated);
          else setAwayTeam(updated);
      }
  };

  const handleSlotClick = (side: 'home' | 'away', index: number) => {
      setModalState({ isOpen: true, side, slotIndex: index });
  };

  const handlePlayerSelect = (p: Player) => {
      const { side, slotIndex } = modalState;
      if (side && slotIndex !== null) {
          const target = side === 'home' ? homeTeam : awayTeam;
          if (target) {
              const newPlayers = [...target.players];
              newPlayers[slotIndex] = p;
              const updated = { ...target, players: newPlayers };
              if (side === 'home') setHomeTeam(updated);
              else setAwayTeam(updated);
          }
      }
  };

  // Helper to render builder column
  const renderTeamColumn = (side: 'home' | 'away', team: Team | null) => {
      if (!team) return <div className="text-center p-4">Chargement...</div>;

      const formation = FORMATIONS_LIST.find(f => f.name === team.formationName) || FORMATIONS_LIST[0];
      const pitchObj = PITCHES.find(p => p.id === team.pitchId) || PITCHES[0];
      const isHome = side === 'home';
      const labelColor = isHome ? 'text-emerald-400' : 'text-red-400';

      return (
          <div className="flex flex-col gap-4">
              {/* Header Controls */}
              <div className="bg-gray-800/80 p-4 rounded-xl border border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                      <label className={`font-teko text-2xl ${labelColor} uppercase`}>
                          {isHome ? 'Domicile' : 'Extérieur'}
                      </label>
                      <button onClick={() => handleSaveTeam(team)} className="text-gray-400 hover:text-white" title="Sauvegarder cette version">
                          <Save size={18} />
                      </button>
                  </div>
                  
                  {/* Select Team Dropdown */}
                  <select 
                      className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 mb-2 text-sm"
                      value={team.id} // This is just matching ID to list, but team object might be modified
                      onChange={(e) => handleTeamChange(side, e.target.value)}
                  >
                      {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>

                  {/* Settings */}
                  <div className="grid grid-cols-2 gap-2">
                       <div>
                           <label className="text-xs text-gray-500 block">Nom</label>
                           <input 
                              value={team.name} 
                              onChange={(e) => {
                                  const upd = { ...team, name: e.target.value };
                                  if(isHome) setHomeTeam(upd); else setAwayTeam(upd);
                              }}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 text-sm"
                           />
                       </div>
                       <div>
                           <label className="text-xs text-gray-500 block">Formation</label>
                           <select 
                               value={team.formationName} 
                               onChange={(e) => handleFormationChange(side, e.target.value)}
                               className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 text-sm"
                           >
                               {FORMATIONS_LIST.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                           </select>
                       </div>
                  </div>
              </div>

              {/* Logo Shield - Match Sim Version */}
              <div className="flex justify-center mb-2">
                  <div 
                    className="w-24 h-28 bg-gradient-to-b from-gray-800 to-gray-950 border-[3px] border-yellow-500/50 shadow-lg relative flex items-center justify-center overflow-hidden rounded-b-[3rem]"
                  >
                    {team.logoUrl ? (
                        <img src={team.logoUrl} className="w-full h-full object-cover scale-105" />
                    ) : (
                        <Swords size={24} className="text-gray-700" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none"></div>
                  </div>
              </div>

              {/* Pitch */}
              <div className="relative">
                 <Pitch 
                    bgUrl={pitchObj.url}
                    formation={formation}
                    players={team.players}
                    mode="single"
                    onSlotClick={(idx) => handleSlotClick(side, idx)}
                 />
              </div>
          </div>
      );
  };

  return (
    <div className="flex flex-col min-h-screen animate-fade-in pb-20">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="text-gray-400 hover:text-white flex items-center gap-1"><ChevronLeft /> Quitter Match</button>
        <h2 className="text-3xl font-teko text-white uppercase">Préparation du Match</h2>
      </div>

      {!result && !isPlaying && (
        <div className="flex justify-center mb-8">
            <button 
                onClick={handleSimulate}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-12 py-4 rounded-full font-teko text-4xl shadow-lg shadow-indigo-500/40 flex items-center gap-4 hover:scale-105 transition-transform"
            >
                <PlayCircle size={40} /> JOUER LE MATCH
            </button>
        </div>
      )}

      {/* Match Setup Grid (Dual Builder) or Match Result */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
        
        {/* Only show builders if not watching result/playing */}
        {(!result && !isPlaying) && (
            <>
                <div className="border-r border-gray-800 pr-4">
                    {renderTeamColumn('home', homeTeam)}
                </div>
                <div className="pl-4">
                    {renderTeamColumn('away', awayTeam)}
                </div>
            </>
        )}

        {/* Playing / Result View */}
        {(isPlaying || result) && (
            <div className="col-span-1 lg:col-span-2 flex flex-col items-center">
                
                {/* Scoreboard */}
                <div className="w-full max-w-4xl bg-black/80 backdrop-blur border border-gray-700 rounded-xl p-6 text-center shadow-2xl mb-8">
                    {isPlaying ? (
                        <div className="text-2xl font-teko animate-pulse text-indigo-400">SIMULATION EN COURS...</div>
                    ) : (
                        <div>
                            <div className="flex justify-between items-center text-5xl md:text-8xl font-teko font-bold mb-4">
                                <span className="text-emerald-400">{result?.scoreHome}</span>
                                <span className="text-gray-600 text-2xl">-</span>
                                <span className="text-red-400">{result?.scoreAway}</span>
                            </div>
                            <div className="flex justify-between text-xl font-teko uppercase tracking-wider text-gray-400 px-10">
                                 <span>{homeTeam?.name}</span>
                                 <span>{awayTeam?.name}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Combined Pitch Visualization for Match Mode */}
                <div className="w-full max-w-lg relative mb-8">
                     {homeTeam && awayTeam && (
                        <>
                            <Pitch 
                                bgUrl={PITCHES.find(p => p.id === homeTeam.pitchId)?.url || PITCHES[0].url}
                                formation={FORMATIONS_LIST.find(f => f.name === homeTeam.formationName) || FORMATIONS_LIST[0]}
                                players={homeTeam.players}
                                mode="match"
                                awayFormation={FORMATIONS_LIST.find(f => f.name === awayTeam.formationName) || FORMATIONS_LIST[0]}
                                awayPlayers={awayTeam.players}
                                showLabels={false}
                            />
                            {isPlaying && (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce z-50">
                                    <img src={DEFAULT_BALL} className="w-8 h-8" alt="ball" />
                                </div>
                            )}
                        </>
                     )}
                </div>

                {/* Results Analysis */}
                {result && (
                     <div className="w-full max-w-4xl space-y-4 animate-fade-in-up">
                        <div className="glass-panel p-5 rounded-lg border-l-4 border-indigo-500">
                            <h4 className="font-teko text-xl text-indigo-300 mb-2">Résumé du Match</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">{result.summary}</p>
                        </div>

                        <div className="glass-panel p-5 rounded-lg border-l-4 border-yellow-500">
                             <h4 className="font-teko text-xl text-yellow-300 mb-2 flex items-center gap-2"><Trophy size={18} /> MVP</h4>
                             <p className="text-white font-bold text-lg">{result.mvp}</p>
                        </div>

                        <div className="glass-panel p-5 rounded-lg">
                            <h4 className="font-teko text-xl text-gray-300 mb-3">Temps Forts</h4>
                            <ul className="space-y-2">
                                {result.highlights.map((h, i) => (
                                    <li key={i} className="text-sm text-gray-400 border-b border-gray-800 pb-1 last:border-0">
                                        {h}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="text-center pt-8">
                             <button onClick={() => setIsPlaying(false) || setResult(null)} className="flex items-center gap-2 mx-auto text-gray-400 hover:text-white">
                                <RefreshCw /> Rejouer / Configurer
                             </button>
                        </div>
                    </div>
                )}
            </div>
        )}
      </div>

      {/* Modal is shared */}
      <PlayerModal 
        isOpen={modalState.isOpen}
        onClose={() => setModalState({...modalState, isOpen: false})}
        onSelect={handlePlayerSelect}
        positionIndex={modalState.slotIndex || 0}
        requiredType={modalState.slotIndex === 0 ? 'GK' as any : undefined}
      />
    </div>
  );
};

export default MatchSim;