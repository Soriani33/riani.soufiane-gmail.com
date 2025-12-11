import React, { useState, useEffect } from 'react';
import { ChevronLeft, Search, Plus, Edit2, Trash2, Database, Wand2 } from 'lucide-react';
import { Player, PositionType } from '../types';
import { storageService } from '../services/storageService';
import { DEFAULT_AVATAR } from '../constants';
import PlayerModal from './PlayerModal';
import PlayerDetailModal from './PlayerDetailModal';

interface DatabaseViewProps {
  onBack: () => void;
}

const DatabaseView: React.FC<DatabaseViewProps> = ({ onBack }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<PositionType | 'ALL'>('ALL');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = () => {
    setPlayers(storageService.getPlayers());
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Supprimer ce joueur de la base de données ?")) {
      storageService.deletePlayer(id);
      loadPlayers();
    }
  };

  const handleEditClick = (player: Player) => {
    setSelectedPlayer(player);
    setIsEditModalOpen(true);
  };

  const handleUpdatePlayer = (updatedPlayer: Player) => {
    storageService.savePlayer(updatedPlayer);
    loadPlayers();
    setIsEditModalOpen(false);
  };

  // Add flow reuses PlayerModal but we don't need to "Select" it for a team, just save it.
  const handleAddPlayer = (newPlayer: Player) => {
     // PlayerModal already calls storageService.savePlayer inside it.
     // So we just reload.
     loadPlayers();
     setIsAddModalOpen(false);
  };

  const filteredPlayers = players.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'ALL' || p.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="animate-fade-in flex flex-col h-full min-h-screen">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
            <ChevronLeft /> Retour
            </button>
            <h2 className="text-3xl font-teko text-white uppercase flex items-center gap-2">
                <Database className="text-blue-500" /> Gestion Joueurs
            </h2>
        </div>
        
        <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-teko text-xl flex items-center gap-2 shadow-lg"
        >
            <Plus size={20} /> AJOUTER JOUEUR
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <input 
            type="text" 
            placeholder="Rechercher par nom..." 
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
        </div>
        <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value as any)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
        >
            <option value="ALL">Tous les postes</option>
            <option value={PositionType.GK}>Gardiens</option>
            <option value={PositionType.DEF}>Défenseurs</option>
            <option value={PositionType.MID}>Milieux</option>
            <option value={PositionType.FWD}>Attaquants</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
        {filteredPlayers.map(player => (
            <div key={player.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-blue-500/50 transition-all flex items-center gap-4 group">
                <div className="relative">
                    <img 
                        src={player.photoUrl} 
                        alt={player.name} 
                        className="w-16 h-16 rounded-full object-cover bg-gray-700 border-2 border-gray-600" 
                        onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)} 
                    />
                    <div className="absolute -bottom-1 -right-1 bg-gray-900 text-blue-400 text-xs font-bold px-1.5 py-0.5 rounded border border-gray-700">
                        {player.rating}
                    </div>
                </div>
                
                <div className="flex-1 min-w-0">
                    <h3 className="font-teko text-xl text-white truncate">{player.name}</h3>
                    <p className="text-gray-400 text-sm truncate">{player.position} • {player.details?.club || 'Libre'}</p>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={() => handleEditClick(player)}
                        className="p-2 bg-gray-700 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                        title="Modifier"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button 
                        onClick={(e) => handleDelete(player.id, e)}
                        className="p-2 bg-gray-700 hover:bg-red-600 text-white rounded-lg transition-colors"
                        title="Supprimer"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        ))}
        {filteredPlayers.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500">
                Aucun joueur trouvé.
            </div>
        )}
      </div>

      {/* Add Modal (Reuse PlayerModal) */}
      <PlayerModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSelect={handleAddPlayer}
        positionIndex={0}
      />

      {/* Edit Modal (Reuse PlayerDetailModal) */}
      <PlayerDetailModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        player={selectedPlayer}
        onRemove={() => {}} // Remove logic handled by separate delete button in grid
        onUpdate={handleUpdatePlayer}
      />

    </div>
  );
};

export default DatabaseView;