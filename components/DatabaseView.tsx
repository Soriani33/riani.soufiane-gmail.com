import React, { useState, useEffect } from 'react';
import { ChevronLeft, Search, Plus, Edit2, Trash2, Database, Users, Briefcase } from 'lucide-react';
import { Player, Coach, PositionType } from '../types';
import { storageService } from '../services/storageService';
import { DEFAULT_AVATAR } from '../constants';
import PlayerModal from './PlayerModal';
import PlayerDetailModal from './PlayerDetailModal';
import CoachDetailModal from './CoachDetailModal';

interface DatabaseViewProps {
  onBack: () => void;
}

type Tab = 'players' | 'coaches';

const DatabaseView: React.FC<DatabaseViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('players');
  
  // Players State
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerSearch, setPlayerSearch] = useState('');
  const [playerFilter, setPlayerFilter] = useState<PositionType | 'ALL'>('ALL');
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [isEditPlayerOpen, setIsEditPlayerOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // Coaches State
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [coachSearch, setCoachSearch] = useState('');
  const [isCoachModalOpen, setIsCoachModalOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setPlayers(storageService.getPlayers());
    setCoaches(storageService.getCoaches());
  };

  // --- Players Logic ---
  const handlePlayerDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Supprimer ce joueur ?")) {
      storageService.deletePlayer(id);
      loadData();
    }
  };
  const handlePlayerEdit = (player: Player) => {
    setSelectedPlayer(player);
    setIsEditPlayerOpen(true);
  };
  const handlePlayerUpdate = (updated: Player) => {
    storageService.savePlayer(updated);
    loadData();
    setIsEditPlayerOpen(false);
  };
  const handlePlayerAdd = () => {
     loadData();
     setIsAddPlayerOpen(false);
  };

  // --- Coaches Logic ---
  const handleCoachDelete = (id: string) => {
    if (confirm("Supprimer cet entraîneur ?")) {
      storageService.deleteCoach(id);
      loadData();
      setIsCoachModalOpen(false); // Close modal if deleting from within edit
    }
  };
  const handleCoachSave = (coach: Coach) => {
      storageService.saveCoach(coach);
      loadData();
      setIsCoachModalOpen(false);
  };
  const openCoachModal = (coach: Coach | null = null) => {
      setSelectedCoach(coach);
      setIsCoachModalOpen(true);
  };

  // Filtering
  const filteredPlayers = players.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(playerSearch.toLowerCase());
    const matchesType = playerFilter === 'ALL' || p.type === playerFilter;
    return matchesSearch && matchesType;
  });

  const filteredCoaches = coaches.filter(c => 
    c.name.toLowerCase().includes(coachSearch.toLowerCase())
  );

  return (
    <div className="animate-fade-in flex flex-col h-full min-h-screen">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
            <ChevronLeft /> Retour
            </button>
            <h2 className="text-3xl font-teko text-white uppercase flex items-center gap-2">
                <Database className="text-blue-500" /> Base de Données
            </h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 border-b border-gray-700">
          <button 
            onClick={() => setActiveTab('players')}
            className={`flex items-center gap-2 px-6 py-3 font-teko text-xl border-b-2 transition-colors ${activeTab === 'players' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            <Users size={20} /> JOUEURS
          </button>
          <button 
            onClick={() => setActiveTab('coaches')}
            className={`flex items-center gap-2 px-6 py-3 font-teko text-xl border-b-2 transition-colors ${activeTab === 'coaches' ? 'border-yellow-500 text-yellow-400' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            <Briefcase size={20} /> ENTRAÎNEURS
          </button>
      </div>

      {/* --- PLAYERS VIEW --- */}
      {activeTab === 'players' && (
        <>
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                    <input 
                    type="text" 
                    placeholder="Rechercher joueur..." 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:border-emerald-500 focus:outline-none text-white"
                    value={playerSearch}
                    onChange={(e) => setPlayerSearch(e.target.value)}
                    />
                </div>
                <select 
                    value={playerFilter} 
                    onChange={(e) => setPlayerFilter(e.target.value as any)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
                >
                    <option value="ALL">Tous Postes</option>
                    <option value={PositionType.GK}>Gardiens</option>
                    <option value={PositionType.DEF}>Défenseurs</option>
                    <option value={PositionType.MID}>Milieux</option>
                    <option value={PositionType.FWD}>Attaquants</option>
                </select>
                <button 
                    onClick={() => setIsAddPlayerOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-teko text-xl flex items-center gap-2 shadow-lg"
                >
                    <Plus size={20} /> AJOUTER
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
                {filteredPlayers.map(player => (
                    <div key={player.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-emerald-500/50 transition-all flex items-center gap-4 group">
                        <div className="relative">
                            <img 
                                src={player.photoUrl} 
                                alt={player.name} 
                                className="w-16 h-16 rounded-full object-cover bg-gray-700 border-2 border-gray-600" 
                                onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)} 
                            />
                            <div className="absolute -bottom-1 -right-1 bg-gray-900 text-emerald-400 text-xs font-bold px-1.5 py-0.5 rounded border border-gray-700">
                                {player.rating}
                            </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <h3 className="font-teko text-xl text-white truncate">{player.name}</h3>
                            <p className="text-gray-400 text-sm truncate">{player.position} • {player.details?.club || 'Libre'}</p>
                        </div>

                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => handlePlayerEdit(player)}
                                className="p-2 bg-gray-700 hover:bg-blue-600 text-white rounded-lg transition-colors"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button 
                                onClick={(e) => handlePlayerDelete(player.id, e)}
                                className="p-2 bg-gray-700 hover:bg-red-600 text-white rounded-lg transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
      )}

      {/* --- COACHES VIEW --- */}
      {activeTab === 'coaches' && (
        <>
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                    <input 
                    type="text" 
                    placeholder="Rechercher coach..." 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:border-yellow-500 focus:outline-none text-white"
                    value={coachSearch}
                    onChange={(e) => setCoachSearch(e.target.value)}
                    />
                </div>
                <button 
                    onClick={() => openCoachModal(null)}
                    className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg font-teko text-xl flex items-center gap-2 shadow-lg"
                >
                    <Plus size={20} /> AJOUTER
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
                {filteredCoaches.map(coach => (
                    <div key={coach.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-yellow-500/50 transition-all flex items-center gap-4 group">
                        <div className="relative">
                            <img 
                                src={coach.photoUrl} 
                                alt={coach.name} 
                                className="w-16 h-16 rounded-full object-cover bg-gray-700 border-2 border-gray-600" 
                                onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)} 
                            />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <h3 className="font-teko text-xl text-white truncate">{coach.name}</h3>
                            <p className="text-gray-400 text-sm truncate">{coach.nationality}</p>
                            <p className="text-yellow-500 text-xs uppercase font-bold mt-1">{coach.tacticalStyle}</p>
                        </div>

                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => openCoachModal(coach)}
                                className="p-2 bg-gray-700 hover:bg-blue-600 text-white rounded-lg transition-colors"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button 
                                onClick={() => handleCoachDelete(coach.id)}
                                className="p-2 bg-gray-700 hover:bg-red-600 text-white rounded-lg transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
      )}

      {/* Modals */}
      <PlayerModal 
        isOpen={isAddPlayerOpen}
        onClose={() => setIsAddPlayerOpen(false)}
        onSelect={handlePlayerAdd}
        positionIndex={0}
      />

      <PlayerDetailModal 
        isOpen={isEditPlayerOpen}
        onClose={() => setIsEditPlayerOpen(false)}
        player={selectedPlayer}
        onRemove={() => {}} 
        onUpdate={handlePlayerUpdate}
      />

      <CoachDetailModal 
        isOpen={isCoachModalOpen}
        onClose={() => setIsCoachModalOpen(false)}
        coach={selectedCoach}
        onSave={handleCoachSave}
        onDelete={selectedCoach ? handleCoachDelete : undefined}
      />

    </div>
  );
};

export default DatabaseView;