import React, { useState, useEffect } from 'react';
import { X, Search, Wand2, UserPlus, Check, Image as ImageIcon } from 'lucide-react';
import { Player, PositionType } from '../types';
import { storageService } from '../services/storageService';
import { geminiService } from '../services/geminiService';
import { DEFAULT_AVATAR } from '../constants';

interface PlayerModalProps {
  positionIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (player: Player) => void;
  requiredType?: PositionType;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ positionIndex, isOpen, onClose, onSelect, requiredType }) => {
  const [activeTab, setActiveTab] = useState<'pool' | 'create'>('pool');
  const [players, setPlayers] = useState<Player[]>([]);
  const [filterType, setFilterType] = useState<PositionType | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  
  // Creation State
  const [newName, setNewName] = useState('');
  const [manualPhotoUrl, setManualPhotoUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlayer, setGeneratedPlayer] = useState<Partial<Player> | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPlayers(storageService.getPlayers());
      // Default filter to required type (e.g. GK)
      if (requiredType) setFilterType(requiredType);
      else setFilterType('ALL');
      
      // Reset creation state
      setNewName('');
      setManualPhotoUrl('');
      setGeneratedPlayer(null);
    }
  }, [isOpen, requiredType]);

  const handleGenerate = async () => {
    if (!newName) return;
    setIsGenerating(true);
    const data = await geminiService.generatePlayerInfo(newName);
    setGeneratedPlayer({ ...data, photoUrl: data.photoUrl || DEFAULT_AVATAR });
    setIsGenerating(false);
  };

  const handleSavePlayer = () => {
    if (!generatedPlayer || !generatedPlayer.name) return;
    
    // Use manual URL if provided, otherwise AI generated one, otherwise default
    const finalPhotoUrl = manualPhotoUrl.trim() || generatedPlayer.photoUrl || DEFAULT_AVATAR;

    const newPlayer: Player = {
        id: Date.now().toString(),
        name: generatedPlayer.name,
        position: generatedPlayer.position || 'CM',
        type: generatedPlayer.type as PositionType || PositionType.MID,
        rating: generatedPlayer.rating || 75,
        photoUrl: finalPhotoUrl,
        stats: generatedPlayer.stats || { pace:0, shooting:0, passing:0, dribbling:0, defending:0, physical:0 },
        details: generatedPlayer.details
    };
    storageService.savePlayer(newPlayer);
    onSelect(newPlayer);
    onClose();
  };

  const filteredPlayers = players.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'ALL' || p.type === filterType;
    return matchesSearch && matchesType;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-emerald-500/30 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-2xl font-teko text-white uppercase">
            Select Player <span className="text-emerald-500">#{positionIndex + 1}</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X /></button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <button 
            onClick={() => setActiveTab('pool')}
            className={`flex-1 py-3 font-teko text-xl transition-colors ${activeTab === 'pool' ? 'bg-gray-800 text-emerald-400' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Database
          </button>
          <button 
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-3 font-teko text-xl transition-colors ${activeTab === 'create' ? 'bg-gray-800 text-indigo-400' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Create New (AI)
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {activeTab === 'pool' && (
            <div className="space-y-4">
               <div className="flex gap-2">
                 <div className="relative flex-1">
                   <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                   <input 
                    type="text" 
                    placeholder="Search name..." 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:border-emerald-500 focus:outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                   />
                 </div>
                 <select 
                   value={filterType} 
                   onChange={(e) => setFilterType(e.target.value as any)}
                   className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                 >
                   <option value="ALL">All Pos</option>
                   <option value={PositionType.GK}>GK</option>
                   <option value={PositionType.DEF}>DEF</option>
                   <option value={PositionType.MID}>MID</option>
                   <option value={PositionType.FWD}>FWD</option>
                 </select>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 {filteredPlayers.map(player => (
                   <div 
                    key={player.id}
                    onClick={() => { onSelect(player); onClose(); }}
                    className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-transparent hover:border-emerald-500 cursor-pointer transition-all"
                   >
                     <img src={player.photoUrl} alt="" className="w-12 h-12 rounded-full object-cover bg-gray-700" onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)} />
                     <div>
                       <div className="flex items-center gap-2">
                         <span className="font-teko text-lg leading-none">{player.name}</span>
                         <span className="text-xs bg-gray-700 px-1 rounded text-emerald-400">{player.rating}</span>
                       </div>
                       <span className="text-xs text-gray-500">{player.position}</span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'create' && (
             <div className="space-y-6">
               <div className="space-y-4">
                 <div>
                   <label className="block text-sm text-gray-400 mb-1">Player Name</label>
                   <div className="flex gap-2">
                     <input 
                       type="text" 
                       className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-indigo-500 focus:outline-none"
                       placeholder="e.g. Zinedine Zidane"
                       value={newName}
                       onChange={(e) => setNewName(e.target.value)}
                     />
                     <button 
                       onClick={handleGenerate}
                       disabled={isGenerating || !newName}
                       className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                     >
                       {isGenerating ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div> : <Wand2 size={18} />}
                       AI Auto-Fill
                     </button>
                   </div>
                 </div>

                 <div>
                    <label className="block text-sm text-gray-400 mb-1">Avatar Image URL (Optional)</label>
                    <div className="flex gap-2">
                      <input 
                         type="text" 
                         className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-emerald-500 focus:outline-none text-sm"
                         placeholder="https://example.com/photo.jpg"
                         value={manualPhotoUrl}
                         onChange={(e) => setManualPhotoUrl(e.target.value)}
                      />
                      <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden flex-shrink-0 border border-gray-600">
                         {manualPhotoUrl ? (
                             <img src={manualPhotoUrl} className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display='none'} />
                         ) : (
                             <div className="w-full h-full flex items-center justify-center text-gray-500"><ImageIcon size={16} /></div>
                         )}
                      </div>
                    </div>
                 </div>
               </div>

               {generatedPlayer && (
                 <div className="bg-gray-800 p-4 rounded-xl border border-indigo-500/30 animate-fade-in">
                   <div className="flex gap-4 items-center mb-4">
                     <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden border-2 border-indigo-500">
                       <img 
                          src={manualPhotoUrl || generatedPlayer.photoUrl} 
                          className="w-full h-full object-cover" 
                          onError={(e) => e.currentTarget.src = DEFAULT_AVATAR} 
                       />
                     </div>
                     <div>
                       <h3 className="font-teko text-2xl">{generatedPlayer.name}</h3>
                       <p className="text-indigo-400">{generatedPlayer.position} | OVR: {generatedPlayer.rating}</p>
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
                     {Object.entries(generatedPlayer.stats || {}).map(([key, val]) => (
                       <div key={key} className="bg-gray-900 p-1 rounded">
                         <span className="text-gray-500 uppercase text-[10px] block">{key.substring(0,3)}</span>
                         <span className="font-bold text-white">{val}</span>
                       </div>
                     ))}
                   </div>

                   <button 
                     onClick={handleSavePlayer}
                     className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg font-teko text-xl uppercase tracking-wide flex items-center justify-center gap-2"
                   >
                     <Check size={20} /> Save & Select
                   </button>
                 </div>
               )}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;