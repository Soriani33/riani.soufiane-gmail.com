import React, { useState, useEffect, useRef } from 'react';
import { X, Save, User, Image as ImageIcon, Upload } from 'lucide-react';
import { UserProfile } from '../types';
import { DEFAULT_AVATAR, DEFAULT_BANNER } from '../constants';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (p: UserProfile) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, profile, onSave }) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(profile);
    }
  }, [isOpen, profile]);

  const handleChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simple size validation (limit to ~1MB to prevent localStorage quotas issues)
      if (file.size > 1024 * 1024) {
        alert("L'image est trop volumineuse (Max 1Mo). Essayez une image plus petite.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleChange('avatarUrl', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-900 border border-gray-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-2xl font-teko text-white uppercase">Modifier Profil</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X /></button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Preview */}
          <div className="relative h-32 rounded-lg overflow-hidden border border-gray-700 group bg-gray-800">
             <img src={formData.bannerUrl || DEFAULT_BANNER} className="w-full h-full object-cover opacity-60" onError={(e) => e.currentTarget.src = DEFAULT_BANNER} />
             <div className="absolute inset-0 flex items-center justify-center">
                 <img 
                    src={formData.avatarUrl || DEFAULT_AVATAR} 
                    className="w-20 h-20 rounded-full border-4 border-emerald-500 shadow-lg object-cover bg-gray-800"
                    onError={(e) => e.currentTarget.src = DEFAULT_AVATAR}
                 />
             </div>
          </div>

          <div className="space-y-4">
             <div>
                <label className="block text-sm text-gray-400 mb-1">Nom du Manager</label>
                <div className="relative">
                    <User className="absolute left-3 top-2.5 text-gray-500" size={18} />
                    <input 
                        value={formData.username}
                        onChange={(e) => handleChange('username', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
                        placeholder="Votre Nom"
                    />
                </div>
             </div>
             
             <div>
                <label className="block text-sm text-gray-400 mb-1">Avatar</label>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <ImageIcon className="absolute left-3 top-2.5 text-gray-500" size={18} />
                        <input 
                            value={formData.avatarUrl}
                            onChange={(e) => handleChange('avatarUrl', e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-emerald-500 focus:outline-none text-sm"
                            placeholder="https://... ou Uploader"
                        />
                    </div>
                    
                    {/* Upload Button */}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileUpload} 
                        accept="image/*" 
                        className="hidden" 
                    />
                    <button 
                        onClick={triggerFileInput}
                        className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 px-3 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        title="Uploader depuis l'ordinateur"
                    >
                        <Upload size={18} />
                        <span className="text-xs font-bold uppercase hidden sm:inline">PC</span>
                    </button>
                </div>
                <p className="text-[10px] text-gray-500 mt-1 ml-1">* Max 1Mo pour l'upload local</p>
             </div>

             <div>
                <label className="block text-sm text-gray-400 mb-1">Bannière URL</label>
                <div className="relative">
                    <ImageIcon className="absolute left-3 top-2.5 text-gray-500" size={18} />
                    <input 
                        value={formData.bannerUrl}
                        onChange={(e) => handleChange('bannerUrl', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-emerald-500 focus:outline-none text-sm"
                        placeholder="https://..."
                    />
                </div>
             </div>
          </div>

          <button 
             onClick={() => onSave(formData)}
             className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-lg font-teko text-xl tracking-wide flex items-center justify-center gap-2 transition-colors"
          >
             <Save size={20} /> ENREGISTRER
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;