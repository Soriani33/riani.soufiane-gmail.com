import React, { useEffect, useState } from 'react';
import { Plus, Play, Users, Trash2, AlertTriangle, Database, Briefcase } from 'lucide-react';
import { storageService } from '../services/storageService';
import { hasApiKey } from '../services/geminiService';
import { Team } from '../types';

interface DashboardProps {
  onStartBuilder: (teamId?: string) => void;
  onStartMatch: () => void;
  onOpenDatabase: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartBuilder, onStartMatch, onOpenDatabase }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [apiKeyValid, setApiKeyValid] = useState(true);

  useEffect(() => {
    setTeams(storageService.getTeams());
    setApiKeyValid(hasApiKey());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Supprimer cette équipe ?")) {
      storageService.deleteTeam(id);
      setTeams(storageService.getTeams());
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {!apiKeyValid && (
        <div className="bg-red-900/50 border border-red-500 rounded-xl p-4 flex items-start gap-4">
           <div className="bg-red-900 p-2 rounded-full">
              <AlertTriangle className="text-red-200" size={24} />
           </div>
           <div>
              <h3 className="text-xl font-teko text-white uppercase">Clé API Manquante</h3>
              <p className="text-gray-300 text-sm">
                L'intelligence artificielle (Génération de joueurs, Analyse, Matchs) est désactivée. 
                Veuillez ajouter votre clé Google Gemini dans les réglages de votre déploiement.
              </p>
           </div>
        </div>
      )}

      {/* Hero Actions - 3 Columns Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Builder */}
        <div 
          onClick={() => onStartBuilder()}
          className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer border border-gray-700 hover:border-emerald-500 transition-all shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80&w=600" 
            alt="Tactics"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <h2 className="text-4xl font-teko font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">NOUVELLE ÉQUIPE</h2>
            <p className="text-gray-300 text-sm">Créez votre 11 de rêve.</p>
          </div>
          <div className="absolute top-4 right-4 bg-emerald-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
            <Plus size={24} className="text-white" />
          </div>
        </div>

        {/* Card 2: Match */}
        <div 
          onClick={onStartMatch}
          className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer border border-gray-700 hover:border-indigo-500 transition-all shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=600" 
            alt="Match"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <h2 className="text-4xl font-teko font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">SIMULER MATCH</h2>
            <p className="text-gray-300 text-sm">IA vs IA ou vos équipes.</p>
          </div>
           <div className="absolute top-4 right-4 bg-indigo-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
            <Play size={24} className="text-white" />
          </div>
        </div>

        {/* Card 3: Database (FORCED UPDATE) */}
        <div 
          onClick={onOpenDatabase}
          className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer border border-gray-700 hover:border-blue-500 transition-all shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&q=80&w=600" 
            alt="Database"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <h2 className="text-4xl font-teko font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">BASE DE DONNÉES</h2>
            <p className="text-gray-300 text-sm">Gérez Joueurs & <span className="text-yellow-400 font-bold">Coachs</span>.</p>
          </div>
          {/* Nouveau Badge Visible */}
          <div className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg group-hover:bg-blue-500 transition-colors">
             <Database size={24} />
          </div>
        </div>

      </div>

      {/* Saved Teams */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-3xl font-teko text-emerald-400 uppercase tracking-wide flex items-center gap-2">
            <Users size={28} /> Mes Équipes
          </h3>
        </div>

        {teams.length === 0 ? (
          <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-dashed border-gray-700">
            <p className="text-gray-400 text-lg">Aucune équipe créée. Commencez maintenant !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teams.map((team) => (
              <div key={team.id} onClick={() => onStartBuilder(team.id)} className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-emerald-500/50 hover:bg-gray-800/80 transition-all cursor-pointer group relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gray-900 border-2 border-gray-600 flex items-center justify-center overflow-hidden">
                    {team.logoUrl ? (
                         <img src={team.logoUrl} alt={team.name} className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                    ) : (
                        <span className="font-teko text-xl text-gray-500">{team.name.substring(0, 2)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-teko text-2xl text-white leading-none truncate">{team.name}</h4>
                    <span className="text-xs text-emerald-400 uppercase tracking-wider">{team.formationName}</span>
                    {team.coach && (
                         <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                            <Briefcase size={10} />
                            <span className="truncate">{team.coach.name}</span>
                         </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-400 mt-2 border-t border-gray-700 pt-3">
                  <span>{team.players.filter(p => p).length}/11 Joueurs</span>
                </div>

                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => handleDelete(team.id, e)} className="p-1.5 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded">
                        <Trash2 size={14} />
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;