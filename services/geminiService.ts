import { GoogleGenAI, Type } from "@google/genai";
import { Team, Player, MatchResult, Coach, PositionType } from '../types';

// Helper pour l'UI
export const hasApiKey = () => {
  const key = process.env.API_KEY;
  return !!key && typeof key === 'string' && key.length > 10 && !key.includes('dummy');
};

// Helper pour nettoyer le JSON retourné par l'IA
const cleanJsonString = (text: string): string => {
  if (!text) return "{}";
  let clean = text.trim();
  
  // Enlever les blocs markdown ```json ... ```
  clean = clean.replace(/^```json/g, '').replace(/^```/g, '').replace(/```$/g, '');
  
  // Chercher le début et la fin du JSON
  const firstBrace = clean.indexOf('{');
  const lastBrace = clean.lastIndexOf('}');
  
  if (firstBrace !== -1 && lastBrace !== -1) {
    clean = clean.substring(firstBrace, lastBrace + 1);
  }
  
  return clean;
};

// Fonction de récupération du client IA
const getAiClient = () => {
  // Accès direct à la variable injectée par Vite
  const key = process.env.API_KEY;
  
  if (!key || key.includes('your_api_key_here')) {
    console.warn("⚠️ NANI99: Clé API manquante ou par défaut.");
    return null;
  }
  
  try {
    return new GoogleGenAI({ apiKey: key });
  } catch (error) {
    console.error("⚠️ NANI99: Erreur d'initialisation du client Gemini:", error);
    return null;
  }
};

export const geminiService = {
  
  // 1. Generate Player Stats/Info
  generatePlayerInfo: async (name: string): Promise<Partial<Player>> => {
    const ai = getAiClient();

    if (!ai) {
      return {
        name: name + " (Mode Hors Ligne)",
        rating: 75,
        type: PositionType.MID,
        position: 'CM',
        stats: { pace: 70, shooting: 70, passing: 70, dribbling: 70, defending: 70, physical: 70 },
        details: { club: "Clé API Requise", nationality: "N/A" }
      };
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Génère un profil de joueur de football réaliste pour "${name}".
        Si c'est un joueur connu, utilise des vraies stats FC24/FIFA (1-99).
        Réponds UNIQUEMENT en JSON valide.`,
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
      if (!text) throw new Error("Réponse vide de l'IA");
      
      return JSON.parse(cleanJsonString(text));

    } catch (error) {
      console.error("Erreur génération joueur:", error);
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
        contents: `Génère un profil d'entraîneur pour "${name}". JSON uniquement.`,
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
            analysis: "⚠️ Clé API non détectée. Vérifiez vos variables d'environnement Vercel (API_KEY)." 
        };
    }

    try {
      const playersList = team.players.map((p, i) => p ? `${p.position} (${p.rating}): ${p.name}` : `Pos ${i+1}: Vide`).join(', ');
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyse cette formation de football : ${team.formationName}. Coach: ${team.coach?.tacticalStyle || 'Inconnu'}. Joueurs: ${playersList}.
        Donne une note sur 10 (score) et une analyse tactique courte en Français.`,
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
      if (!text) throw new Error("L'IA a renvoyé une réponse vide.");
      
      return JSON.parse(cleanJsonString(text));

    } catch (error: any) {
      console.error("Erreur analyse:", error);
      // Retourner le message d'erreur réel pour le débogage UI
      const msg = error.message || JSON.stringify(error);
      return { 
        score: 0, 
        analysis: `Erreur Technique IA : ${msg}. Vérifiez que l'API "Gemini API" est bien activée sur votre projet Google Cloud et que la clé est valide.` 
      };
    }
  },

  // 3. Simulate Match
  simulateMatch: async (home: Team, away: Team): Promise<MatchResult> => {
    const ai = getAiClient();
    
    if (!ai) {
        return {
            scoreHome: 0,
            scoreAway: 0,
            summary: "API Manquante. Impossible de simuler.",
            highlights: [],
            mvp: "N/A"
        };
    }

    try {
      const homeData = JSON.stringify(home.players.map(p => p ? `${p.name} (${p.rating})` : 'Inconnu'));
      const awayData = JSON.stringify(away.players.map(p => p ? `${p.name} (${p.rating})` : 'Inconnu'));

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Simule un match de foot: ${home.name} vs ${away.name}.
        Home Players: ${homeData}. Away Players: ${awayData}.
        Renvoie un JSON avec: scoreHome, scoreAway, summary (résumé en français), highlights (liste actions), mvp.`,
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
      console.error("Erreur simulation:", error);
      return {
          scoreHome: 0,
          scoreAway: 0,
          summary: `Erreur de simulation : ${error.message || 'Inconnue'}.`,
          highlights: [],
          mvp: "Erreur"
      };
    }
  }
};