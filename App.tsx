import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Trophy, Settings, LogOut, Import, Download, User as UserIcon, Edit, RefreshCw } from 'lucide-react';
import { storageService } from './services/storageService';
import { UserProfile, Team, Player } from './types';
import { DEFAULT_BANNER, DEFAULT_AVATAR } from './constants';

// Views
import Dashboard from './components/Dashboard';
import TeamBuilder from './components/TeamBuilder';
import MatchSim from './components/MatchSim';
import ProfileModal from './components/ProfileModal';

type ViewState = 'dashboard' | 'builder' | 'match' | 'profile';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [profile, setProfile] = useState<UserProfile>(storageService.getProfile());
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [preselectedHomeTeamId, setPreselectedHomeTeamId] = useState<string | null>(null);
  
  // Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    // Initial Load check
    const saved = storageService.getProfile();
    setProfile(saved);
  }, []);

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    storageService.saveProfile(updatedProfile);
    setIsProfileModalOpen(false);
  };

  const handleSwitchProfile = () => {
    if(confirm("Voulez-vous changer de profil ? Cela réinitialisera les infos du manager actuel (mais gardera vos équipes).")) {
        const newProfile = storageService.resetProfile();
        setProfile(newProfile);
        setIsProfileModalOpen(true); // Open modal immediately for new entry
    }
  };

  const handleImport = () => {
    const json = prompt("Coller le JSON ici:");
    if (json) {
      if (storageService.importAll(json)) {
        alert("Données importées ! Rechargement...");
        window.location.reload();
      } else {
        alert("JSON Invalide.");
      }
    }
  };

  const handleExport = () => {
    const data = storageService.exportAll();
    navigator.clipboard.writeText(data).then(() => alert("Données copiées dans le presse-papier !"));
  };

  const startBuilder = (teamId?: string) => {
    setEditingTeamId(teamId || null);
    setView('builder');
  };

  const startMatch = (homeTeamId?: string) => {
    setPreselectedHomeTeamId(homeTeamId || null);
    setView('match');
  };

  const renderView = () => {
    switch(view) {
      case 'dashboard':
        return <Dashboard onStartBuilder={startBuilder} onStartMatch={() => startMatch()} />;
      case 'builder':
        return (
          <TeamBuilder 
            teamId={editingTeamId} 
            onBack={() => setView('dashboard')} 
            onGoToMatch={(id) => startMatch(id)}
          />
        );
      case 'match':
        return (
          <MatchSim 
            onBack={() => setView('dashboard')} 
            preselectedHomeId={preselectedHomeTeamId}
          />
        );
      default:
        return <Dashboard onStartBuilder={startBuilder} onStartMatch={() => startMatch()} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans pb-20">
      {/* Dynamic Banner - Added bg-gradient backup for visual safety */}
      <div className="relative h-80 w-full overflow-hidden group bg-gradient-to-r from-emerald-900 to-gray-900">
        <img 
          src={profile.bannerUrl || DEFAULT_BANNER} 
          alt="Banner" 
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-80"
          onError={(e) => e.currentTarget.src = DEFAULT_BANNER}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        
        {/* Profile Overlay */}
        <div className="absolute bottom-4 left-4 md:left-10 flex items-end gap-4 z-20">
          <div className="relative group cursor-pointer" onClick={() => setIsProfileModalOpen(true)}>
            <img 
              src={profile.avatarUrl} 
              alt="Profile" 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-emerald-500 shadow-lg object-cover bg-gray-800 transition-transform group-hover:scale-105"
              onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
            />
            <div 
              className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full border border-gray-600 hover:bg-emerald-600 transition-colors z-30 shadow-lg"
              title="Modifier Profil"
            >
              <Settings size={18} className="text-white" />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-3">
                <h1 className="text-4xl md:text-5xl font-teko font-bold text-white tracking-wide uppercase drop-shadow-md">
                {profile.username}
                </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-1">
                <p className="text-emerald-400 font-teko text-xl tracking-wider mr-2">Manager NANI99</p>
                
                {/* Modifier Button */}
                <button 
                    onClick={() => setIsProfileModalOpen(true)}
                    className="flex items-center gap-1 bg-gray-800/80 hover:bg-emerald-600 text-white text-xs uppercase font-bold tracking-wider px-3 py-1.5 rounded border border-gray-600 transition-all shadow-lg backdrop-blur-sm"
                >
                    <Edit size={12} /> Modifier
                </button>

                {/* Switch User Button */}
                <button 
                    onClick={handleSwitchProfile}
                    className="flex items-center gap-1 bg-gray-800/80 hover:bg-red-500 text-gray-300 hover:text-white text-xs uppercase font-bold tracking-wider px-3 py-1.5 rounded border border-gray-600 transition-all shadow-lg backdrop-blur-sm"
                >
                    <RefreshCw size={12} /> Changer Profil
                </button>
            </div>
          </div>
        </div>

        {/* Global Actions */}
        <div className="absolute top-4 right-4 flex gap-2 z-30">
          <button onClick={handleImport} className="p-2 bg-black/50 hover:bg-emerald-600 rounded text-white flex gap-2 items-center text-sm backdrop-blur-md transition-all border border-white/10">
            <Import size={16} /> Import
          </button>
          <button onClick={handleExport} className="p-2 bg-black/50 hover:bg-indigo-600 rounded text-white flex gap-2 items-center text-sm backdrop-blur-md transition-all border border-white/10">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-8">
        {renderView()}
      </main>

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default App;