import React, { useState, useEffect } from 'react';
import { X, Trash2, Edit2, Save, User, Activity } from 'lucide-react';
import { Player } from '../types';
import { DEFAULT_AVATAR } from '../constants';

interface PlayerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: Player | null;
  onRemove: () => void;
  onUpdate: (updatedPlayer: Player) => void;
}

const PlayerDetailModal: React.FC<PlayerDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  player, 
  onRemove, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<{ name: string; photoUrl: string }>({ name: '', photoUrl: '' });

  useEffect(() => {
    if (player) {
      setEditForm({ name: player.name, photoUrl: player.photoUrl });
      setIsEditing(false);
    }
  }, [player, isOpen]);

  const handleSave = () => {
    if (player) {
      onUpdate({
        ...player,
        name: editForm.name,
        photoUrl: editForm.photoUrl
      });
      setIsEditing(false);
    }
  };

  if (!isOpen || !player) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose} // Close on backdrop click
    >
      <div 
        className="bg-gray-900 border border-gray-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
      >
        
        {/* Header with Background Gradient */}
        <div className="relative h-32 bg-gradient-to-r from-emerald-900 to-gray-900">
           <button 
             onClick={onClose} 
             className="absolute top-4 right-4 text-white/70 hover:text-white z-10 bg-black/20 rounded-full p-1"
           >
             <X size={24} />
           </button>
           
           <div className="absolute -bottom-12 left-6 flex items-end">
             <div className="relative">
                <img 
                  src={isEditing ? (editForm.photoUrl || DEFAULT_AVATAR) : player.photoUrl} 
                  className="w-24 h-24 rounded-full border-4 border-gray-900 bg-gray-800 object-cover shadow-xl"
                  onError={(e) => e.currentTarget.src = DEFAULT_AVATAR}
                />
                <div className="absolute bottom-0 right-0 bg-gray-900 rounded-full p-1 border border-gray-700">
                   <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold font-teko text-lg">
                     {player.rating}
                   </div>
                </div>
             </div>
           </div>
        </div>

        {/* Content Body */}
        <div className="pt-16 pb-6 px-6 flex-1 overflow-y-auto">
          
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1 mr-4">
              {isEditing ? (
                <div className="space-y-3 animate-fade-in">
                   <div>
                     <label className="text-xs text-gray-500 uppercase font-bold">Nom du Joueur</label>
                     <input 
                       value={editForm.name}
                       onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                       className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                     />
                   </div>
                   <div>
                     <label className="text-xs text-gray-500 uppercase font-bold">URL Avatar</label>
                     <input 
                       value={editForm.photoUrl}
                       onChange={(e) => setEditForm({...editForm, photoUrl: e.target.value})}
                       className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-xs focus:border-emerald-500 focus:outline-none"
                     />
                   </div>
                </div>
              ) : (
                <div>
                   <h2 className="text-3xl font-teko text-white uppercase leading-none">{player.name}</h2>
                   <div className="flex gap-2 text-sm text-gray-400 mt-1">
                      <span className="bg-gray-800 px-2 py-0.5 rounded text-emerald-400 font-bold">{player.position}</span>
                      <span>{player.details?.nationality || 'International'}</span>
                      {player.details?.club && <span>• {player.details.club}</span>}
                   </div>
                </div>
              )}
            </div>

            {/* Actions Top Right */}
            {!isEditing && (
               <button 
                 onClick={() => setIsEditing(true)}
                 className="p-2 bg-gray-800 hover:bg-emerald-600 rounded-lg text-gray-400 hover:text-white transition-colors border border-gray-700"
                 title="Modifier les infos"
               >
                 <Edit2 size={18} />
               </button>
            )}
          </div>

          {/* Stats Grid */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
               <Activity size={14} /> Attributs
            </h3>
            <div className="grid grid-cols-3 gap-y-4 gap-x-2">
               {player.stats && Object.entries(player.stats).map(([key, val]) => (
                 <div key={key} className="text-center">
                    <div className="text-xl font-teko text-white font-bold">{val}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">{key.substring(0,3)}</div>
                 </div>
               ))}
               {!player.stats && <div className="col-span-3 text-center text-gray-500 text-sm">Pas de stats disponibles</div>}
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
             {player.details?.age && (
                <div className="bg-gray-800 p-2 rounded border border-gray-700">
                   <span className="text-gray-500 text-xs block">Âge</span>
                   {player.details.age} ans
                </div>
             )}
             {player.details?.height && (
                <div className="bg-gray-800 p-2 rounded border border-gray-700">
                   <span className="text-gray-500 text-xs block">Taille</span>
                   {player.details.height}
                </div>
             )}
             {player.details?.value && (
                <div className="bg-gray-800 p-2 rounded border border-gray-700 col-span-2">
                   <span className="text-gray-500 text-xs block">Valeur Marchande</span>
                   {player.details.value}
                </div>
             )}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-800 border-t border-gray-700 flex gap-3">
          {isEditing ? (
             <>
               <button 
                 onClick={handleSave}
                 className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-lg font-teko text-xl tracking-wide flex items-center justify-center gap-2"
               >
                 <Save size={18} /> SAUVEGARDER
               </button>
               <button 
                 onClick={() => setIsEditing(false)}
                 className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-teko text-xl tracking-wide"
               >
                 ANNULER
               </button>
             </>
          ) : (
             <button 
               onClick={onRemove}
               className="w-full bg-red-900/50 hover:bg-red-600 text-red-200 hover:text-white border border-red-900 hover:border-red-500 py-3 rounded-lg font-teko text-xl tracking-wide flex items-center justify-center gap-2 transition-all"
             >
               <Trash2 size={18} /> RETIRER DU TERRAIN
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailModal;