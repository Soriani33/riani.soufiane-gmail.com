import { GoogleGenAI, Type } from "@google/genai";
import { Team, Player, MatchResult, Coach, PositionType } from '../types';

// Helper pour l'UI
export const hasApiKey = () => {
  const key = process.env.API_KEY;
  return !!key && typeof key === 'string' && key.length > 20 && !key.includes('dummy');
};

// Fonction de récupération du client IA
const getAiClient = () => {
  const key = process.env.API_KEY;
  
  if (!hasApiKey()) {
    console.warn("⚠️ NANI99: Clé API manquante ou invalide.");
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
        name: name + " (Clé API Requise)",
        rating: 0,
        type: PositionType.MID,
        position: 'ERR',
        stats: { pace: 0, shooting: 0, passing: 0, dribbling: 0, defending: 0, physical: 0 },
        details: { club: "Configuration Manquante", nationality: "N/A" }
      };
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Génère un profil de joueur de football réaliste pour "${name}".
        Si c'est un joueur connu, utilise des vraies stats (1-99). Sinon, invente des stats réalistes.
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
      if (!text) throw new Error("Réponse vide de l'IA");
      return JSON.parse(text);

    } catch (error) {
      console.error("Erreur génération joueur:", error);
      return {
        name: name,
        rating: 0,
        stats: { pace: 0, shooting: 0, passing: 0, dribbling: 0, defending: 0, physical: 0 },
        details: { club: "Erreur API", nationality: "N/A" }
      };
    }
  },

  // 1.5 Generate Coach Info
  generateCoachInfo: async (name: string): Promise<Partial<Coach>> => {
    const ai = getAiClient();
    
    if (!ai) {
        return {
            name: name + " (Hors-ligne)",
            tacticalStyle: "Inconnu (Clé API manquante)",
            nationality: "N/A"
        };
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Génère un profil d'entraîneur de football pour "${name}". Style tactique et nationalité. JSON uniquement.`,
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
      return text ? JSON.parse(text) : {};

    } catch (error) {
      return { name: name, tacticalStyle: "Erreur" };
    }
  },

  // 2. Analyze Formation
  analyzeFormation: async (team: Team): Promise<{ score: number, analysis: string }> => {
    const ai = getAiClient();
    
    if (!ai) {
        return { 
            score: 0, 
            analysis: "⚠️ CONNEXION IMPOSSIBLE : Aucune Clé API Google Gemini détectée. L'application ne peut pas analyser votre équipe." 
        };
    }

    try {
      const playersList = team.players.map((p, i) => p ? `${p.position} (${p.rating}): ${p.name}` : `Pos ${i+1}: Vide`).join(', ');
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyse cette formation de football : ${team.formationName}.
        Style du Coach : ${team.coach?.tacticalStyle || 'Inconnu'}.
        Joueurs : ${playersList}.
        
        Donne une note tactique sur 10 et une courte analyse stratégique.
        Réponds en Français.`,
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
      return text ? JSON.parse(text) : { score: 0, analysis: "Erreur de réponse API." };

    } catch (error) {
      console.error("Erreur analyse:", error);
      return { 
          score: 0, 
          analysis: "Erreur lors de l'appel à l'IA. Vérifiez vos quotas ou votre clé API." 
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
            summary: "⚠️ MATCH ANNULÉ : Clé API manquante. Impossible de simuler le match sans l'intelligence artificielle.",
            highlights: ["Configurez votre clé API"],
            mvp: "N/A"
        };
    }

    try {
      const homeData = JSON.stringify(home.players.map(p => p ? p.name : 'Inconnu'));
      const awayData = JSON.stringify(away.players.map(p => p ? p.name : 'Inconnu'));

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Simule un match entre ${home.name} et ${away.name}.
        Effectifs : ${homeData} vs ${awayData}.
        
        Génère score, résumé, temps forts, MVP. JSON.`,
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
      return JSON.parse(text);

    } catch (error) {
      console.error("Erreur simulation:", error);
      return {
          scoreHome: 0,
          scoreAway: 0,
          summary: "Erreur technique lors de la simulation.",
          highlights: [],
          mvp: "N/A"
      };
    }
  }
};