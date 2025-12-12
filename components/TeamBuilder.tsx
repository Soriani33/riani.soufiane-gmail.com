import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Save, Sparkles, User, RefreshCw, Shirt, Image as ImageIcon, Plus, Wand2, Swords, Camera, Download, Users, X, AlertOctagon } from 'lucide-react';
// @ts-ignore
import html2canvas from 'html2canvas';
import { Team, Player, Formation, Coach } from '../types';
import { FORMATIONS_LIST, PITCHES, DEFAULT_AVATAR } from '../constants';
import { storageService } from '../services/storageService';
import { geminiService } from '../services/geminiService';
import Pitch from './Pitch';
import PlayerModal from './PlayerModal';
import PlayerDetailModal from './PlayerDetailModal';
import CoachSelectionModal from './CoachSelectionModal';

interface TeamBuilderProps {
  teamId: string | null;
  onBack: () => void;
  onGoToMatch: (teamId: string) => void;
}

const TeamBuilder: React.FC<TeamBuilderProps> = ({ teamId, onBack, onGoToMatch }) => {
  // State
  const [teamName, setTeamName] = useState('Nouvelle Équipe');
  const [formation, setFormation] = useState<Formation>(FORMATIONS_LIST[0]);
  const [pitch, setPitch] = useState(PITCHES[0]);
  const [players, setPlayers] = useState<(Player | null)[]>(Array(11).fill(null));
  const [coach, setCoach] = useState<Coach | undefined>(undefined);
  const [logoUrl, setLogoUrl] = useState('');
  
  // Modals Management
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCoachSelectionOpen, setIsCoachSelectionOpen] = useState(false);
  
  const [aiAnalysis, setAiAnalysis] = useState<{score: number, analysis: string} | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Ref for image export
  const exportAreaRef = useRef<HTMLDivElement>(null);

  // Load Team if ID exists
  useEffect(() => {
    if (teamId) {
      const allTeams = storageService.getTeams();
      const t = allTeams.find(x => x.id === teamId);
      if (t) {
        setTeamName(t.name);
        setLogoUrl(t.logoUrl);
        const f = FORMATIONS_LIST.find(f => f.name === t.formationName) || FORMATIONS_LIST[0];
        setFormation(f);
        setPitch(PITCHES.find(p => p.id === t.pitchId) || PITCHES[0]);
        setPlayers(t.players);
        setCoach(t.coach);
      }
    }
  }, [teamId]);

  const handleSave = () => {
    if (!teamName) {
        alert("Veuillez entrer un nom d'équipe");
        return null;
    }
    
    const newTeam: Team = {
      id: teamId || Date.now().toString(),
      name: teamName,
      logoUrl,
      primaryColor: '#ffffff', // Default for now
      formationName: formation.name,
      pitchId: pitch.id,
      coach,
      players
    };
    
    storageService.saveTeam(newTeam);
    return newTeam.id;
  };

  const handleCreateMatch = () => {
      const savedId = handleSave();
      if (savedId) {
          onGoToMatch(savedId);
      }
  };

  const handleExportImage = async () => {
      if (!exportAreaRef.current) return;
      setIsExporting(true);
      
      try {
          await new Promise(resolve => setTimeout(resolve, 100));
          const canvas = await html2canvas(exportAreaRef.current, {
              backgroundColor: '#111827',
              useCORS: true,
              allowTaint: false,
              scale: 2,
          });
          const image = canvas.toDataURL("image/jpeg", 0.9);
          const link = document.createElement('a');
          link.download = `NANI99-${teamName.replace(/\s+/g, '-')}.jpg`;
          link.href = image;
          link.click();
      } catch (err) {
          console.error("Export failed", err);
          alert("Erreur export image. Vérifiez les droits CORS des images.");
      } finally {
          setIsExporting(false);
      }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const tempTeam: Team = {
        id: 'temp', name: teamName, logoUrl, primaryColor: '', formationName: formation.name, pitchId: pitch.id, coach, players
    };
    const res = await geminiService.analyzeFormation(tempTeam);
    setAiAnalysis(res);
    setIsAnalyzing(false);
  };

  const handleSlotClick = (index: number) => {
    setSelectedSlot(index);
    if (players[index]) {
      setIsDetailModalOpen(true);
    } else {
      setIsSelectionModalOpen(true);
    }
  };

  const handlePlayerSelect = (p: Player) => {
    if (selectedSlot === null) return;
    const newPlayers = [...players];
    newPlayers[selectedSlot] = p;
    setPlayers(newPlayers);
  };

  const handleRemovePlayer = () => {
    if (selectedSlot === null) return;
    const newPlayers = [...players];
    newPlayers[selectedSlot] = null;
    setPlayers(newPlayers);
    setIsDetailModalOpen(false);
  };

  const handleUpdatePlayer = (updatedPlayer: Player) => {
    if (selectedSlot === null) return;
    const newPlayers = [...players];
    newPlayers[selectedSlot] = updatedPlayer;
    setPlayers(newPlayers);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-wrap justify-between items-center mb-6 bg-gray-800/50 p-4 rounded-xl border border-gray-700 gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ChevronLeft /> Retour
        </button>
        <div className="flex items-center gap-4 flex-1 justify-center">
            <input 
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="bg-transparent border-b border-gray-600 text-3xl font-teko text-center focus:outline-none focus:border-emerald-500 w-full max-w-md"
                placeholder="NOM ÉQUIPE"
            />
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
             <button onClick={handleExportImage} disabled={isExporting} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg font-teko text-xl transition-all">
                {isExporting ? <span className="animate-spin">...</span> : <Camera size={20} />}
                <span className="hidden md:inline">EXPORTER IMG</span>
             </button>
             <button onClick={() => handleSave() && alert('Sauvegardé !')} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-teko text-xl">
              <Save size={20} /> <span className="hidden md:inline">SAUVEGARDER</span>
            </button>
            <button onClick={handleCreateMatch} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-teko text-xl">
              <Swords size={20} /> <span className="hidden md:inline">MATCH</span>
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
        
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-panel p-6 rounded-xl">
            <h3 className="text-xl font-teko text-emerald-400 mb-4 flex items-center gap-2"><Shirt size={20} /> Tactiques</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Formation</label>
                <select 
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2"
                  value={formation.name}
                  onChange={(e) => {
                    const f = FORMATIONS_LIST.find(x => x.name === e.target.value);
                    if (f) setFormation(f);
                  }}
                >
                  {FORMATIONS_LIST.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Style de Pelouse</label>
                <div className="grid grid-cols-3 gap-2">
                  {PITCHES.map(p => (
                    <div 
                      key={p.id} 
                      onClick={() => setPitch(p)}
                      className={`h-12 rounded cursor-pointer border-2 overflow-hidden ${pitch.id === p.id ? 'border-emerald-500' : 'border-transparent'}`}
                    >
                      <img src={p.url} className="w-full h-full object-cover" alt="" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Logo Équipe (URL)</label>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={logoUrl} 
                        onChange={(e) => setLogoUrl(e.target.value)} 
                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm"
                        placeholder="https://..."
                    />
                    <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center overflow-hidden shrink-0">
                         {logoUrl ? <img src={logoUrl} className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display='none'} /> : <ImageIcon size={16} />}
                    </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl">
            <h3 className="text-xl font-teko text-yellow-400 mb-4 flex items-center gap-2"><User size={20} /> Coach</h3>
            {coach ? (
               <div className="flex items-center gap-3 animate-fade-in bg-gray-800/50 p-2 rounded-lg border border-gray-700">
                 <div className="w-14 h-14 flex-shrink-0 rounded-full bg-gray-700 overflow-hidden border-2 border-yellow-500">
                    <img src={coach.photoUrl} className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = DEFAULT_AVATAR} />
                 </div>
                 <div className="flex-1 min-w-0">
                   <p className="font-bold leading-none truncate text-lg text-white">{coach.name}</p>
                   <p className="text-xs text-yellow-500 truncate">{coach.tacticalStyle}</p>
                 </div>
                 <div className="flex flex-col gap-1">
                     <button onClick={() => setIsCoachSelectionOpen(true)} className="text-gray-400 hover:text-white"><RefreshCw size={14}/></button>
                     <button onClick={() => setCoach(undefined)} className="text-red-400 hover:text-red-300"><X size={14}/></button>
                 </div>
               </div>
            ) : (
               <button 
                onClick={() => setIsCoachSelectionOpen(true)}
                className="w-full border border-dashed border-gray-600 rounded py-6 text-gray-400 hover:border-yellow-500 hover:text-yellow-500 transition-colors flex flex-col items-center justify-center gap-2 group bg-gray-800/20"
               >
                 <Users className="group-hover:scale-110 transition-transform" /> 
                 <span className="font-teko text-xl">CHOISIR COACH</span>
               </button>
            )}
          </div>
        </div>

        {/* Center Column: Pitch */}
        <div className="lg:col-span-6 flex flex-col items-center">
            <div ref={exportAreaRef} className="w-full max-w-xl flex flex-col items-center p-4 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 rounded-2xl">
                <div className="relative mb-6 group animate-fade-in-down">
                    <div className="w-40 h-48 bg-gradient-to-b from-gray-800 to-gray-950 rounded-b-[4rem] shadow-2xl relative z-10 overflow-hidden flex items-center justify-center border-[3px] border-yellow-500/60">
                        {logoUrl ? (
                            <img src={logoUrl} className="w-full h-full object-cover scale-105" onError={(e) => e.currentTarget.style.display='none'} />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-gray-600">
                                <Swords size={48} className="mb-2 opacity-30" />
                                <span className="font-teko text-5xl font-bold opacity-30 tracking-widest">FC</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
                    </div>
                    <div className="absolute top-4 left-4 w-32 h-36 bg-yellow-500/20 blur-[40px] -z-10 rounded-full"></div>
                </div>

                <h2 className="font-teko text-4xl text-white mb-4 uppercase tracking-wider drop-shadow-lg">{teamName}</h2>

                <div className="w-full">
                    <Pitch 
                        bgUrl={pitch.url} 
                        formation={formation} 
                        players={players} 
                        onSlotClick={handleSlotClick}
                    />
                </div>
                <div className="mt-4 text-center">
                     <p className="text-gray-500 text-xs font-teko uppercase tracking-widest">Généré avec NANI99</p>
                </div>
            </div>
        </div>

        {/* Right Column: AI Analysis */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-panel p-6 rounded-xl min-h-[300px]">
            <h3 className="text-2xl font-teko text-indigo-400 mb-4 flex items-center gap-2">
              <Sparkles /> Analyse Gemini AI
            </h3>
            
            {!aiAnalysis ? (
               <div className="text-center py-10">
                 <p className="text-gray-400 mb-6">Complétez votre équipe et demandez un rapport tactique.</p>
                 <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-teko text-xl shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                 >
                   {isAnalyzing ? 'Analyse en cours...' : 'ANALYSER FORMATION'}
                 </button>
               </div>
            ) : aiAnalysis.score > 0 ? (
               <div className="animate-fade-in">
                 <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-4">
                   <span className="text-gray-300">Note Tactique</span>
                   <div className="text-4xl font-teko font-bold text-emerald-400">{aiAnalysis.score}<span className="text-lg text-gray-500">/10</span></div>
                 </div>
                 <p className="text-gray-300 leading-relaxed text-sm">
                   {aiAnalysis.analysis}
                 </p>
                 <button onClick={handleAnalyze} className="mt-6 flex items-center gap-2 text-indigo-400 text-sm hover:text-white">
                    <RefreshCw size={14} /> Re-analyser
                 </button>
               </div>
            ) : (
                // MODE ERREUR SPÉCIFIQUE
                <div className="bg-red-900/40 border border-red-500/50 rounded-lg p-4 animate-fade-in">
                    <div className="flex items-start gap-3 mb-3">
                        <AlertOctagon className="text-red-400 shrink-0" size={24} />
                        <h4 className="font-bold text-red-100">Erreur Configuration IA</h4>
                    </div>
                    
                    {aiAnalysis.analysis.includes("API key not valid") || aiAnalysis.analysis.includes("400") ? (
                         <div className="text-sm text-red-200 space-y-2">
                             <p><strong>Clé API Invalide.</strong></p>
                             <p>Il semble que la clé dans Vercel soit incorrecte.</p>
                             <ul className="list-disc pl-4 space-y-1 text-xs text-gray-300">
                                 <li>Allez sur Vercel &gt; Settings &gt; Environment Variables.</li>
                                 <li>Vérifiez que <code>API_KEY</code> ne contient <strong>pas</strong> de guillemets autour (ex: juste <code>AIza...</code>).</li>
                                 <li>Vérifiez que vous n'avez pas collé <code>API_KEY=...</code> dans la valeur.</li>
                                 <li>Redéployez le projet.</li>
                             </ul>
                         </div>
                    ) : aiAnalysis.analysis === "ERR_NO_KEY" ? (
                        <p className="text-sm text-red-200">Aucune clé API détectée. Ajoutez <code>API_KEY</code> dans Vercel.</p>
                    ) : (
                        <p className="text-sm text-red-200 break-words">{aiAnalysis.analysis}</p>
                    )}
                    
                    <button onClick={handleAnalyze} className="mt-4 w-full bg-red-800 hover:bg-red-700 text-white text-sm py-2 rounded">
                        Réessayer
                    </button>
                </div>
            )}
          </div>
        </div>
      </div>

      <PlayerModal 
        isOpen={isSelectionModalOpen}
        onClose={() => setIsSelectionModalOpen(false)}
        onSelect={handlePlayerSelect}
        positionIndex={selectedSlot || 0}
        requiredType={selectedSlot === 0 ? 'GK' as any : undefined} 
      />

      <PlayerDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        player={selectedSlot !== null ? players[selectedSlot] : null}
        onRemove={handleRemovePlayer}
        onUpdate={handleUpdatePlayer}
      />

      <CoachSelectionModal 
        isOpen={isCoachSelectionOpen}
        onClose={() => setIsCoachSelectionOpen(false)}
        onSelect={(c) => setCoach(c)}
      />
    </div>
  );
};

export default TeamBuilder;