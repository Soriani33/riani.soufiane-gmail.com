import { GoogleGenAI, Type } from "@google/genai";
import { Team, Player, MatchResult, Coach, PositionType } from '../types';

// Initialisation stricte utilisant la variable injectée par vite.config.ts
// Si la clé est absente, cela ne plantera qu'au moment de l'appel API
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helpers pour le fallback aléatoire si l'IA échoue
const randomStat = (min = 60, max = 90) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomRating = () => Math.floor(Math.random() * (92 - 75 + 1)) + 75;

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
      console.warn("AI Player Generation Failed (Using Random Fallback):", error);
      // Fallback plus réaliste et aléatoire
      return {
        name: name,
        rating: randomRating(),
        type: PositionType.MID,
        position: 'CM',
        stats: { 
            pace: randomStat(), 
            shooting: randomStat(), 
            passing: randomStat(), 
            dribbling: randomStat(), 
            defending: randomStat(), 
            physical: randomStat() 
        }
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
        tacticalStyle: ['Offensif', 'Défensif', 'Possession', 'Contre-Attaque'][Math.floor(Math.random()*4)],
        nationality: 'Internationale'
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
      return { 
          score: Math.floor(Math.random() * 3) + 5, // Score aléatoire entre 5 et 8
          analysis: "Impossible de connecter à l'IA pour une analyse détaillée. Vérifiez que votre clé API est bien configurée dans Vercel (Variable: API_KEY). En attendant, assurez-vous que vos joueurs sont bien positionnés." 
      };
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
      const sH = Math.floor(Math.random() * 4);
      const sA = Math.floor(Math.random() * 4);
      return {
        scoreHome: sH,
        scoreAway: sA,
        summary: "Mode Simulation Hors-Ligne (Clé API manquante). Le match s'est joué sur un rythme intense.",
        highlights: [`${Math.floor(Math.random()*20)+10}' Occasion dangereuse`, `${Math.floor(Math.random()*30)+50}' Arrêt décisif du gardien`],
        mvp: home.players[0]?.name || "Le Gardien"
      };
    }
  }
};