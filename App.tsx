import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Users, Trophy, Settings, LogOut, Import, Download, User as UserIcon, Edit, RefreshCw, Database, Github } from 'lucide-react';
import { storageService } from './services/storageService';
import { UserProfile, Team, Player } from './types';
import { DEFAULT_BANNER, DEFAULT_AVATAR } from './constants';
import { INITIAL_PLAYERS } from './constants/initialData';

// Views
import Dashboard from './components/Dashboard';
import TeamBuilder from './components/TeamBuilder';
import MatchSim from './components/MatchSim';
import DatabaseView from './components/DatabaseView';
import ProfileModal from './components/ProfileModal';

type ViewState = 'dashboard' | 'builder' | 'match' | 'profile' | 'database';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [profile, setProfile] = useState<UserProfile>(storageService.getProfile());
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [preselectedHomeTeamId, setPreselectedHomeTeamId] = useState<string | null>(null);
  
  // Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Ref pour l'input file caché
  const fileImportRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initial Load check
    const saved = storageService.getProfile();
    setProfile(saved);
    
    // AUTO-RESTAURATION INTELLIGENTE
    const currentPlayers = storageService.getPlayers();
    if (currentPlayers.length < 50) {
        console.log("Base de données incomplète détectée. Restauration automatique...");
        localStorage.removeItem('nani99_players');
        storageService.getPlayers(); 
        window.location.reload();
    }
    
    console.log("NANI99 v1.7 Loaded"); 
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
        setIsProfileModalOpen(true); 
    }
  };

  // Force Reload DB (Emergency Button)
  const handleForceRestoreDB = () => {
      if(confirm("ATTENTION : Cela va réinitialiser la base de données des joueurs par défaut. Continuer ?")) {
          localStorage.removeItem('nani99_players');
          storageService.getPlayers(); 
          alert("Base de données restaurée avec succès !");
          window.location.reload();
      }
  };

  const handleImportClick = () => {
    fileImportRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content && storageService.importAll(content)) {
        alert("Succès ! Vos données ont été restaurées.");
        window.location.reload();
      } else {
        alert("Erreur : Le fichier JSON semble invalide ou corrompu.");
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleExport = () => {
    const data = storageService.exportAll();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const dateStr = new Date().toISOString().split('T')[0];
    link.download = `NANI99_Backup_${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
        return <Dashboard onStartBuilder={startBuilder} onStartMatch={() => startMatch()} onOpenDatabase={() => setView('database')} />;
      case 'builder':
        return <TeamBuilder teamId={editingTeamId} onBack={() => setView('dashboard')} onGoToMatch={(id) => startMatch(id)} />;
      case 'match':
        return <MatchSim onBack={() => setView('dashboard')} preselectedHomeId={preselectedHomeTeamId} />;
      case 'database':
        return <DatabaseView onBack={() => setView('dashboard')} />;
      default:
        return <Dashboard onStartBuilder={startBuilder} onStartMatch={() => startMatch()} onOpenDatabase={() => setView('database')} />;
    }
  };

  return (
    <div id="nani99-app-container" className="min-h-screen bg-gray-900 text-gray-100 font-sans pb-20">
      {/* Banner */}
      <div className="relative h-80 w-full overflow-hidden group bg-gradient-to-r from-emerald-900 to-gray-900">
        <img 
          src={profile.bannerUrl || DEFAULT_BANNER} 
          alt="Banner" 
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-80"
          onError={(e) => e.currentTarget.src = DEFAULT_BANNER}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        
        {/* Profile Info */}
        <div className="absolute bottom-4 left-4 md:left-10 flex items-end gap-4 z-20">
          <div className="relative group cursor-pointer" onClick={() => setIsProfileModalOpen(true)}>
            <img 
              src={profile.avatarUrl} 
              alt="Profile" 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-emerald-500 shadow-lg object-cover bg-gray-800 transition-transform group-hover:scale-105"
              onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
            />
            <div className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full border border-gray-600 hover:bg-emerald-600 transition-colors z-30 shadow-lg">
              <Settings size={18} className="text-white" />
            </div>
          </div>
          <div className="mb-4">
            <h1 className="text-4xl md:text-5xl font-teko font-bold text-white tracking-wide uppercase drop-shadow-md">
              {profile.username}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-1">
                <p className="text-emerald-400 font-teko text-xl tracking-wider mr-2">Manager NANI99</p>
                <button onClick={() => setIsProfileModalOpen(true)} className="flex items-center gap-1 bg-gray-800/80 hover:bg-emerald-600 text-white text-xs uppercase font-bold tracking-wider px-3 py-1.5 rounded border border-gray-600 transition-all backdrop-blur-sm">
                    <Edit size={12} /> Modifier
                </button>
                <button onClick={handleSwitchProfile} className="flex items-center gap-1 bg-gray-800/80 hover:bg-red-500 text-gray-300 hover:text-white text-xs uppercase font-bold tracking-wider px-3 py-1.5 rounded border border-gray-600 transition-all backdrop-blur-sm">
                    <RefreshCw size={12} /> Changer Profil
                </button>
            </div>
          </div>
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-4 right-4 flex gap-2 z-30">
          <a 
            href="https://github.com/nani99/football-tactics" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-black/60 hover:bg-gray-800 rounded-full text-white transition-all border border-white/10"
            title="Voir sur GitHub"
          >
            <Github size={20} />
          </a>
          
          <div className="h-6 w-px bg-white/20 mx-1 self-center"></div>

          <input type="file" ref={fileImportRef} onChange={handleFileChange} className="hidden" accept=".json" />
          <button onClick={handleImportClick} className="p-2 bg-black/50 hover:bg-emerald-600 rounded text-white flex gap-2 items-center text-sm backdrop-blur-md transition-all border border-white/10">
            <Import size={16} /> <span className="hidden sm:inline">Import</span>
          </button>
          <button onClick={handleExport} className="p-2 bg-black/50 hover:bg-indigo-600 rounded text-white flex gap-2 items-center text-sm backdrop-blur-md transition-all border border-white/10">
            <Download size={16} /> <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-8">
        {renderView()}
      </main>

      {/* Footer */}
      <div className="text-center py-6 text-gray-600 text-xs font-mono uppercase tracking-widest border-t border-gray-800 mt-12 flex justify-center gap-4 items-center">
          <span>NANI99 v1.7</span>
          <span>•</span>
          <button onClick={handleForceRestoreDB} className="text-red-800 hover:text-red-500 underline flex items-center gap-1">
             <Database size={10} /> Reset DB
          </button>
      </div>

      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} profile={profile} onSave={handleSaveProfile} />
    </div>
  );
};

export default App;