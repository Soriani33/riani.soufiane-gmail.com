import { GoogleGenAI, Type } from "@google/genai";
import { Team, Player, MatchResult, Coach, PositionType } from '../types';

// Helper pour nettoyer le JSON retourné par l'IA
const cleanJsonString = (text: string): string => {
  if (!text) return "{}";
  let clean = text.trim();
  
  // Enlever les blocs markdown ```json ... ``` ou juste ``` ... ```
  clean = clean.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
  
  // Chercher le début et la fin du JSON pour ignorer le texte avant/après
  const firstBrace = clean.indexOf('{');
  const lastBrace = clean.lastIndexOf('}');
  
  if (firstBrace !== -1 && lastBrace !== -1) {
    clean = clean.substring(firstBrace, lastBrace + 1);
  }
  
  return clean;
};

// Fonction de récupération du client IA avec nettoyage de clé
const getAiClient = () => {
  // 1. Récupération
  let key = process.env.API_KEY;
  
  // 2. Vérification basique
  if (!key) {
    console.warn("⚠️ NANI99: Clé API non trouvée dans process.env.API_KEY");
    return null;
  }

  // 3. Nettoyage agressif (enlève les guillemets doubles/simples accidentels au début/fin)
  // Ex: '"AIza..."' devient 'AIza...'
  key = key.trim().replace(/^["']|["']$/g, '');

  if (key.length < 10 || key.includes('your_api_key')) {
     console.warn("⚠️ NANI99: Clé API invalide ou par défaut détectée.");
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
  const client = getAiClient();
  return !!client;
};

export const geminiService = {
  
  // 1. Generate Player Stats/Info
  generatePlayerInfo: async (name: string): Promise<Partial<Player>> => {
    const ai = getAiClient();

    if (!ai) {
      return {
        name: name + " (Offline)",
        rating: 75,
        type: PositionType.MID,
        position: 'CM',
        stats: { pace: 70, shooting: 70, passing: 70, dribbling: 70, defending: 70, physical: 70 },
        details: { club: "Clé API Manquante", nationality: "N/A" }
      };
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Génère un profil de joueur de football pour "${name}".
        Si joueur connu, vraies stats. Sinon, invente réaliste.
        Réponds UNIQUEMENT en JSON.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              position: { type: Type.STRING },
              type: { type: Type.STRING, enum: [PositionType.GK, PositionType.DEF, PositionType.MID, PositionType.FWD] },
              rating: { type: Type.INTEGER },
              stats: {
                type: Type.OBJECT,
                properties: {
                  pace: { type: Type.INTEGER },
                  shooting: { type: Type.INTEGER },
                  passing: { type: Type.INTEGER },
                  dribbling: { type: Type.INTEGER },
                  defending: { type: Type.INTEGER },
                  physical: { type: Type.INTEGER },
                }
              },
              details: {
                  type: Type.OBJECT,
                  properties: {
                      nationality: { type: Type.STRING },
                      club: { type: Type.STRING },
                      age: { type: Type.INTEGER },
                      height: { type: Type.STRING },
                      weight: { type: Type.STRING },
                      value: { type: Type.STRING },
                  }
              }
            }
          }
        }
      });
      
      const text = response.text;
      if (!text) throw new Error("Réponse vide");
      return JSON.parse(cleanJsonString(text));

    } catch (error) {
      console.error("Erreur Gen Player:", error);
      return {
        name: name,
        rating: 70,
        type: PositionType.MID,
        position: '??',
        stats: { pace: 70, shooting: 70, passing: 70, dribbling: 70, defending: 70, physical: 70 },
        details: { club: "Erreur IA", nationality: "N/A" }
      };
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
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              tacticalStyle: { type: Type.STRING },
              nationality: { type: Type.STRING }
            }
          }
        }
      });
      
      const text = response.text;
      if(!text) throw new Error("Empty");
      return JSON.parse(cleanJsonString(text));
    } catch (error) {
      return { name: name, tacticalStyle: "Standard" };
    }
  },

  // 2. Analyze Formation
  analyzeFormation: async (team: Team): Promise<{ score: number, analysis: string }> => {
    const ai = getAiClient();
    
    if (!ai) {
        return { 
            score: 0, 
            analysis: "⚠️ ERREUR: Clé API non détectée ou invalide. Vérifiez vos variables d'environnement (API_KEY)." 
        };
    }

    try {
      const playersList = team.players.map((p, i) => p ? `${p.position}: ${p.name} (${p.rating})` : `Pos ${i+1}: Vide`).join(', ');
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyse tactique football. Formation: ${team.formationName}. Coach: ${team.coach?.name} (${team.coach?.tacticalStyle}). Joueurs: ${playersList}.
        Note /10 et analyse courte en français.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER },
              analysis: { type: Type.STRING }
            }
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error("Réponse vide de l'IA");
      
      return JSON.parse(cleanJsonString(text));

    } catch (error: any) {
      console.error("Erreur Analyse:", error);
      // Extraction du message d'erreur réel pour l'utilisateur
      let msg = "Erreur inconnue";
      if (error instanceof Error) msg = error.message;
      else if (typeof error === 'string') msg = error;
      else msg = JSON.stringify(error);

      return { 
        score: 0, 
        analysis: `❌ ÉCHEC IA: ${msg}. (Vérifiez la console F12 pour plus de détails)` 
      };
    }
  },

  // 3. Simulate Match
  simulateMatch: async (home: Team, away: Team): Promise<MatchResult> => {
    const ai = getAiClient();
    
    if (!ai) {
        return {
            scoreHome: 0, scoreAway: 0,
            summary: "Clé API manquante. Simulation impossible.",
            highlights: [], mvp: "N/A"
        };
    }

    try {
      // Simplification des données envoyées pour économiser des tokens et éviter les erreurs de parsing
      const formatTeam = (t: Team) => ({
          name: t.name,
          formation: t.formationName,
          players: t.players.map(p => p ? `${p.name} (${p.rating})` : "Inconnu")
      });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Simule match foot.
        Home: ${JSON.stringify(formatTeam(home))}.
        Away: ${JSON.stringify(formatTeam(away))}.
        JSON uniquement: scoreHome, scoreAway, summary (français), highlights (array string), mvp.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              scoreHome: { type: Type.INTEGER },
              scoreAway: { type: Type.INTEGER },
              summary: { type: Type.STRING },
              highlights: { type: Type.ARRAY, items: { type: Type.STRING } },
              mvp: { type: Type.STRING }
            }
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error("Empty response");
      return JSON.parse(cleanJsonString(text));

    } catch (error: any) {
      console.error("Erreur Sim:", error);
      return {
          scoreHome: 0,
          scoreAway: 0,
          summary: `Erreur Technique: ${error.message || JSON.stringify(error)}`,
          highlights: [],
          mvp: "Erreur"
      };
    }
  }
};