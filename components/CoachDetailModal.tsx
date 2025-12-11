import React, { useState, useEffect } from 'react';
import { X, Save, User, Image as ImageIcon, MapPin, BrainCircuit } from 'lucide-react';
import { Coach } from '../types';
import { DEFAULT_AVATAR } from '../constants';

interface CoachDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  coach: Coach | null; // null = mode création
  onSave: (coach: Coach) => void;
  onDelete?: (id: string) => void;
}

const CoachDetailModal: React.FC<CoachDetailModalProps> = ({ isOpen, onClose, coach, onSave, onDelete }) => {
  const [formData, setFormData] = useState<Coach>({
    id: '',
    name: '',
    photoUrl: '',
    tacticalStyle: 'Équilibré',
    nationality: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (coach) {
        setFormData(coach);
      } else {
        // Reset for new coach
        setFormData({
          id: Date.now().toString(),
          name: '',
          photoUrl: '',
          tacticalStyle: 'Équilibré',
          nationality: ''
        });
      }
    }
  }, [isOpen, coach]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-900 border border-gray-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-800/50">
          <h2 className="text-2xl font-teko text-white uppercase">
            {coach ? 'Modifier Coach' : 'Nouveau Coach'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X /></button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
            
            {/* Avatar Preview */}
            <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-gray-800 border-4 border-yellow-500 overflow-hidden relative shadow-lg">
                    {formData.photoUrl ? (
                        <img src={formData.photoUrl} className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display='none'} />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600"><User size={32} /></div>
                    )}
                </div>
            </div>

            {/* Name */}
            <div>
                <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Nom</label>
                <div className="relative">
                    <User className="absolute left-3 top-2.5 text-gray-500" size={16} />
                    <input 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-yellow-500 focus:outline-none"
                        placeholder="Ex: Pep Guardiola"
                    />
                </div>
            </div>

            {/* Nationality */}
            <div>
                <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Nationalité</label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 text-gray-500" size={16} />
                    <input 
                        value={formData.nationality || ''}
                        onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-yellow-500 focus:outline-none"
                        placeholder="Ex: Spain"
                    />
                </div>
            </div>

            {/* Tactical Style */}
            <div>
                <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Style Tactique</label>
                <div className="relative">
                    <BrainCircuit className="absolute left-3 top-2.5 text-gray-500" size={16} />
                    <select
                        value={formData.tacticalStyle}
                        onChange={(e) => setFormData({...formData, tacticalStyle: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-yellow-500 focus:outline-none appearance-none"
                    >
                         <option value="Équilibré">Équilibré</option>
                         <option value="Jeu de Position">Jeu de Position</option>
                         <option value="Gegenpressing">Gegenpressing</option>
                         <option value="Tiki-Taka">Tiki-Taka</option>
                         <option value="Contre-Attaque">Contre-Attaque</option>
                         <option value="Bloc Bas">Bloc Bas</option>
                         <option value="Total Football">Total Football</option>
                         <option value="Catenaccio">Catenaccio</option>
                    </select>
                </div>
            </div>

            {/* Photo URL */}
            <div>
                <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Photo URL</label>
                <div className="relative">
                    <ImageIcon className="absolute left-3 top-2.5 text-gray-500" size={16} />
                    <input 
                        value={formData.photoUrl}
                        onChange={(e) => setFormData({...formData, photoUrl: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-xs text-white focus:border-yellow-500 focus:outline-none"
                        placeholder="https://..."
                    />
                </div>
            </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-800 border-t border-gray-700 flex gap-3">
             <button 
               onClick={() => onSave(formData)}
               className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-lg font-teko text-xl tracking-wide flex items-center justify-center gap-2"
             >
               <Save size={18} /> ENREGISTRER
             </button>
             {coach && onDelete && (
                 <button 
                    onClick={() => onDelete(coach.id)}
                    className="px-4 bg-red-900/50 hover:bg-red-600 text-red-200 hover:text-white border border-red-900 rounded-lg transition-colors"
                 >
                    <X size={20} />
                 </button>
             )}
        </div>

      </div>
    </div>
  );
};

export default CoachDetailModal;