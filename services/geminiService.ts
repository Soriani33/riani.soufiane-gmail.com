import { GoogleGenAI, Type } from "@google/genai";
import { Team, Player, MatchResult, Coach, PositionType } from '../types';

// Helper pour nettoyer le JSON retourné par l'IA
const cleanJsonString = (text: string): string => {
  if (!text) return "{}";
  let clean = text.trim();
  clean = clean.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
  const firstBrace = clean.indexOf('{');
  const lastBrace = clean.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    clean = clean.substring(firstBrace, lastBrace + 1);
  }
  return clean;
};

// Fonction de récupération du client IA avec nettoyage AVANCÉ de clé
const getAiClient = () => {
  let key = process.env.API_KEY || '';
  
  // 1. Nettoyage des espaces et guillemets
  key = key.trim().replace(/^["']|["']$/g, '');

  // 2. Nettoyage des erreurs de copier-coller fréquentes (ex: "API_KEY=AIza...")
  const commonPrefixes = ['API_KEY=', 'VITE_API_KEY=', 'NEXT_PUBLIC_API_KEY='];
  for (const prefix of commonPrefixes) {
    if (key.toUpperCase().startsWith(prefix)) {
      console.log(`[NANI99] Correction automatique : suppression du préfixe "${prefix}" de la clé.`);
      key = key.substring(prefix.length);
    }
  }

  // 3. Vérification de format basique (Google API keys commencent souvent par AIza)
  if (!key) {
    console.warn("⚠️ NANI99: Clé API vide.");
    return null;
  }
  
  // Log de sécurité (affiche les 4 premiers et 4 derniers caractères)
  const masked = key.length > 8 ? `${key.substring(0,4)}...${key.substring(key.length-4)}` : 'INVALID';
  console.log(`[NANI99] Initialisation Gemini avec clé: ${masked} (Longueur: ${key.length})`);

  if (key.length < 20) {
     console.warn("⚠️ NANI99: La clé semble trop courte pour être valide.");
     return null;
  }
  
  try {
    return new GoogleGenAI({ apiKey: key });
  } catch (error) {
    console.error("⚠️ NANI99: Crash initialisation SDK:", error);
    return null;
  }
};

export const hasApiKey = () => {
  return !!getAiClient();
};

export const geminiService = {
  
  // 1. Generate Player Stats/Info
  generatePlayerInfo: async (name: string): Promise<Partial<Player>> => {
    const ai = getAiClient();
    if (!ai) return { name: name + " (Hors Ligne)", rating: 75, type: PositionType.MID, position: 'CM', stats: { pace:70, shooting:70, passing:70, dribbling:70, defending:70, physical:70 }, details: { club: "Vérifier Clé API", nationality: "N/A" } };

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Génère profil footballeur "${name}". JSON.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              position: { type: Type.STRING },
              type: { type: Type.STRING, enum: [PositionType.GK, PositionType.DEF, PositionType.MID, PositionType.FWD] },
              rating: { type: Type.INTEGER },
              stats: { type: Type.OBJECT, properties: { pace: { type: Type.INTEGER }, shooting: { type: Type.INTEGER }, passing: { type: Type.INTEGER }, dribbling: { type: Type.INTEGER }, defending: { type: Type.INTEGER }, physical: { type: Type.INTEGER } } },
              details: { type: Type.OBJECT, properties: { nationality: { type: Type.STRING }, club: { type: Type.STRING }, age: { type: Type.INTEGER }, height: { type: Type.STRING }, weight: { type: Type.STRING }, value: { type: Type.STRING } } }
            }
          }
        }
      });
      const text = response.text;
      if (!text) throw new Error("Réponse vide");
      return JSON.parse(cleanJsonString(text));
    } catch (error) {
      console.error("Erreur Gen Player:", error);
      return { name: name, rating: 70, type: PositionType.MID, position: '??', stats: { pace:70, shooting:70, passing:70, dribbling:70, defending:70, physical:70 }, details: { club: "Erreur IA", nationality: "N/A" } };
    }
  },

  // 1.5 Generate Coach Info
  generateCoachInfo: async (name: string): Promise<Partial<Coach>> => {
    const ai = getAiClient();
    if (!ai) return { name: name, tacticalStyle: "Inconnu" };
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Profil coach "${name}". JSON strict.`,
        config: { responseMimeType: "application/json", responseSchema: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, tacticalStyle: { type: Type.STRING }, nationality: { type: Type.STRING } } } }
      });
      const text = response.text;
      if(!text) throw new Error("Empty");
      return JSON.parse(cleanJsonString(text));
    } catch (error) { return { name: name, tacticalStyle: "Standard" }; }
  },

  // 2. Analyze Formation
  analyzeFormation: async (team: Team): Promise<{ score: number, analysis: string }> => {
    const ai = getAiClient();
    if (!ai) return { score: 0, analysis: "ERR_NO_KEY" };

    try {
      const playersList = team.players.map((p, i) => p ? `${p.position}: ${p.name} (${p.rating})` : `Pos ${i+1}: Vide`).join(', ');
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyse tactique football. Formation: ${team.formationName}. Coach: ${team.coach?.name} (${team.coach?.tacticalStyle}). Joueurs: ${playersList}. Note /10 et analyse courte français.`,
        config: { responseMimeType: "application/json", responseSchema: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, analysis: { type: Type.STRING } } } }
      });
      const text = response.text;
      if (!text) throw new Error("Réponse vide IA");
      return JSON.parse(cleanJsonString(text));
    } catch (error: any) {
      console.error("Erreur Analyse:", error);
      // Retourner l'erreur brute pour affichage
      return { score: 0, analysis: JSON.stringify(error) };
    }
  },

  // 3. Simulate Match
  simulateMatch: async (home: Team, away: Team): Promise<MatchResult> => {
    const ai = getAiClient();
    if (!ai) return { scoreHome: 0, scoreAway: 0, summary: "Clé API invalide ou manquante.", highlights: [], mvp: "N/A" };

    try {
      const formatTeam = (t: Team) => ({ name: t.name, formation: t.formationName, players: t.players.map(p => p ? `${p.name} (${p.rating})` : "Inconnu") });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Simule match foot. Home: ${JSON.stringify(formatTeam(home))}. Away: ${JSON.stringify(formatTeam(away))}. JSON: scoreHome, scoreAway, summary, highlights, mvp.`,
        config: { responseMimeType: "application/json", responseSchema: { type: Type.OBJECT, properties: { scoreHome: { type: Type.INTEGER }, scoreAway: { type: Type.INTEGER }, summary: { type: Type.STRING }, highlights: { type: Type.ARRAY, items: { type: Type.STRING } }, mvp: { type: Type.STRING } } } }
      });
      const text = response.text;
      if (!text) throw new Error("Empty response");
      return JSON.parse(cleanJsonString(text));
    } catch (error: any) {
      console.error("Erreur Sim:", error);
      return { scoreHome: 0, scoreAway: 0, summary: `Erreur IA: ${error.message}`, highlights: [], mvp: "Erreur" };
    }
  }
};