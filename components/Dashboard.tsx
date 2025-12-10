import React, { useEffect, useState } from 'react';
import { Plus, Play, Users, Trash2, Edit } from 'lucide-react';
import { storageService } from '../services/storageService';
import { Team } from '../types';

interface DashboardProps {
  onStartBuilder: (teamId?: string) => void;
  onStartMatch: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartBuilder, onStartMatch }) => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    setTeams(storageService.getTeams());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this team?")) {
      storageService.deleteTeam(id);
      setTeams(storageService.getTeams());
    }
  };

  return (
    <div className="space-y-12 animate-fade-in">
      
      {/* Hero Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Builder Card */}
        <div 
          onClick={() => onStartBuilder()}
          className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-gray-700 hover:border-emerald-500 transition-all shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80&w=1000" 
            alt="Tactics"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <h2 className="text-5xl font-teko font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">CREATE FORMATION</h2>
            <p className="text-gray-300">Build your ultimate XI. Analyze with AI.</p>
          </div>
          <div className="absolute top-6 right-6 bg-emerald-500 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
            <Plus size={32} className="text-white" />
          </div>
        </div>

        {/* Match Card */}
        <div 
          onClick={onStartMatch}
          className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-gray-700 hover:border-indigo-500 transition-all shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=1000" 
            alt="Match"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <h2 className="text-5xl font-teko font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">START MATCH</h2>
            <p className="text-gray-300">Simulate games against AI or saved teams.</p>
          </div>
           <div className="absolute top-6 right-6 bg-indigo-500 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
            <Play size={32} className="text-white" />
          </div>
        </div>
      </div>

      {/* Saved Teams */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-3xl font-teko text-emerald-400 uppercase tracking-wide flex items-center gap-2">
            <Users size={28} /> My Teams
          </h3>
        </div>

        {teams.length === 0 ? (
          <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-dashed border-gray-700">
            <p className="text-gray-400 text-lg">No teams created yet. Start building!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teams.map((team) => (
              <div key={team.id} onClick={() => onStartBuilder(team.id)} className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-emerald-500/50 hover:bg-gray-800/80 transition-all cursor-pointer group relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-900 border-2 border-gray-600 flex items-center justify-center overflow-hidden">
                    {team.logoUrl ? (
                         <img src={team.logoUrl} alt={team.name} className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                    ) : (
                        <span className="font-teko text-xl text-gray-500">{team.name.substring(0, 2)}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-teko text-2xl text-white leading-none">{team.name}</h4>
                    <span className="text-xs text-emerald-400 uppercase tracking-wider">{team.formationName}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-400 mt-2 border-t border-gray-700 pt-3">
                  <span>{team.players.filter(p => p).length}/11 Players</span>
                  <span>{team.coach ? 'Coach Ready' : 'No Coach'}</span>
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