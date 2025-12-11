import React, { useState, useEffect } from 'react';
import { X, Search, UserPlus } from 'lucide-react';
import { Coach } from '../types';
import { storageService } from '../services/storageService';
import { DEFAULT_AVATAR } from '../constants';
import CoachDetailModal from './CoachDetailModal';

interface CoachSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (coach: Coach) => void;
}

const CoachSelectionModal: React.FC<CoachSelectionModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [search, setSearch] = useState('');
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCoaches(storageService.getCoaches());
    }
  }, [isOpen]);

  const handleSaveNewCoach = (newCoach: Coach) => {
      storageService.saveCoach(newCoach);
      setCoaches(storageService.getCoaches());
      setIsDetailOpen(false);
      onSelect(newCoach); // Sélection automatique
      onClose();
  };

  const filtered = coaches.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-yellow-500/30 w-full max-w-xl rounded-2xl shadow-2xl flex flex-col max-h-[80vh]">
        
        <div className="flex justify-between items-center p-5 border-b border-gray-800">
          <h2 className="text-2xl font-teko text-white uppercase">Sélectionner Coach</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X /></button>
        </div>

        <div className="p-4 border-b border-gray-800 flex gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:border-yellow-500 focus:outline-none text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <button 
                onClick={() => setIsDetailOpen(true)}
                className="bg-gray-800 hover:bg-yellow-600 hover:text-black border border-gray-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
                <UserPlus size={18} /> Nouveau
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {filtered.map(coach => (
                <div 
                    key={coach.id}
                    onClick={() => { onSelect(coach); onClose(); }}
                    className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-xl border border-transparent hover:border-yellow-500 cursor-pointer transition-all group"
                >
                    <div className="w-14 h-14 rounded-full bg-gray-700 overflow-hidden border-2 border-gray-600 group-hover:border-yellow-500 transition-colors">
                        <img 
                            src={coach.photoUrl} 
                            className="w-full h-full object-cover" 
                            onError={(e) => e.currentTarget.src = DEFAULT_AVATAR} 
                            alt={coach.name}
                        />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-teko text-xl text-white leading-none group-hover:text-yellow-400 transition-colors">{coach.name}</h3>
                        <div className="flex gap-2 text-sm text-gray-400">
                             <span>{coach.nationality}</span>
                             <span className="text-yellow-500">• {coach.tacticalStyle}</span>
                        </div>
                    </div>
                </div>
            ))}
            {filtered.length === 0 && (
                <p className="text-center text-gray-500 py-8">Aucun entraîneur trouvé.</p>
            )}
        </div>
      </div>

      <CoachDetailModal 
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        coach={null}
        onSave={handleSaveNewCoach}
      />
    </div>
  );
};

export default CoachSelectionModal;