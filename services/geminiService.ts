import { GoogleGenAI, Type } from "@google/genai";
import { Team, Player, MatchResult, Coach, PositionType } from '../types';

// Fonction sécurisée pour récupérer la clé API quel que soit l'environnement (Vite, CRA, Node)
const getApiKey = (): string => {
  // 1. Essai Vite (import.meta.env)
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY;
    }
  } catch (e) {
    // Ignore les erreurs si import.meta n'existe pas
  }

  // 2. Essai Standard (process.env pour CRA/Webpack)
  try {
    if (typeof process !== 'undefined' && process.env) {
      if (process.env.API_KEY) return process.env.API_KEY;
      if (process.env.REACT_APP_API_KEY) return process.env.REACT_APP_API_KEY;
    }
  } catch (e) {
    // Ignore
  }

  console.warn("Aucune clé API trouvée. L'IA utilisera des réponses simulées.");
  return 'dummy-key-for-ui-dev-mode';
};

const apiKey = getApiKey();

const ai = new GoogleGenAI({ apiKey });

export const geminiService = {
  
  // 1. Generate Player Stats/Info
  generatePlayerInfo: async (name: string): Promise<Partial<Player>> => {
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
      if (!text) throw new Error("No response from AI");
      return JSON.parse(text);

    } catch (error) {
      console.error("AI Player Generation Failed:", error);
      // Fallback for dev mode without key
      return {
        name: name,
        rating: 75,
        type: PositionType.MID,
        position: 'CM',
        stats: { pace: 70, shooting: 70, passing: 70, dribbling: 70, defending: 70, physical: 70 }
      };
    }
  },

  // 1.5 Generate Coach Info
  generateCoachInfo: async (name: string): Promise<Partial<Coach>> => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Génère un profil d'entraîneur de football réaliste pour "${name}".
        Détermine son style tactique probable (ex: Gegenpressing, Tiki-Taka, Park the Bus, Équilibré) et sa nationalité.
        Réponds UNIQUEMENT en JSON.`,
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
      if (!text) throw new Error("No response from AI");
      return JSON.parse(text);

    } catch (error) {
      console.error("AI Coach Generation Failed:", error);
      return {
        name: name,
        tacticalStyle: 'Équilibré',
        nationality: 'Inconnue'
      };
    }
  },

  // 2. Analyze Formation
  analyzeFormation: async (team: Team): Promise<{ score: number, analysis: string }> => {
    try {
      const playersList = team.players.map((p, i) => p ? `${p.position} (${p.rating}): ${p.name}` : `Pos ${i+1}: Vide`).join(', ');
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyse cette formation de football : ${team.formationName}.
        Style du Coach : ${team.coach?.tacticalStyle || 'Inconnu'}.
        Joueurs : ${playersList}.
        
        Donne une note tactique sur 10 et une courte analyse stratégique (points forts, points faibles, conseils).
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
      return text ? JSON.parse(text) : { score: 0, analysis: "Analyse IA indisponible." };

    } catch (error) {
      console.error("AI Analysis Failed", error);
      return { score: 5, analysis: "Impossible de connecter à l'IA. Vérifiez la clé API (VITE_API_KEY sur Vercel)." };
    }
  },

  // 3. Simulate Match
  simulateMatch: async (home: Team, away: Team): Promise<MatchResult> => {
    try {
      const homeData = JSON.stringify(home.players.map(p => p ? p.name : 'Inconnu'));
      const awayData = JSON.stringify(away.players.map(p => p ? p.name : 'Inconnu'));

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Simule un match de football entre ${home.name} (Domicile) et ${away.name} (Extérieur).
        Effectif Domicile : ${homeData}. Tactique : ${home.formationName}.
        Effectif Extérieur : ${awayData}. Tactique : ${away.formationName}.
        
        Génère un score réaliste, un résumé vivant du match en Français, 3-5 temps forts avec minutes, et choisis un MVP.
        Réponds UNIQUEMENT en JSON.`,
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
      if (!text) throw new Error("No response from AI");
      return JSON.parse(text);

    } catch (error) {
      console.error("AI Match Sim Failed", error);
      // Fallback
      return {
        scoreHome: Math.floor(Math.random() * 3),
        scoreAway: Math.floor(Math.random() * 3),
        summary: "Simulation IA indisponible. Match nul par défaut.",
        highlights: ["Pas de connexion IA"],
        mvp: "Inconnu"
      };
    }
  }
};