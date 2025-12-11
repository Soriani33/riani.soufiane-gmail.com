import { GoogleGenAI, Type } from "@google/genai";
import { Team, Player, MatchResult, Coach, PositionType } from '../types';

// Helpers pour le fallback aléatoire (Mode Hors-Ligne)
const randomStat = (min = 60, max = 90) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomRating = () => Math.floor(Math.random() * (92 - 75 + 1)) + 75;

// Fonction de récupération sécurisée du client IA
// On ne l'instancie que si nécessaire et si la clé existe
const getAiClient = () => {
  const key = process.env.API_KEY;
  // Vérification stricte
  if (!key || typeof key !== 'string' || key.length < 10 || key.includes("dummy")) {
    // Silent fail ou log léger pour ne pas spammer la console
    return null;
  }
  try {
    return new GoogleGenAI({ apiKey: key });
  } catch (error) {
    console.warn("NANI99 - Erreur d'initialisation SDK:", error);
    return null;
  }
};

console.log("NANI99 - Gemini Service Ready (Lazy Mode)");

export const geminiService = {
  
  // 1. Generate Player Stats/Info
  generatePlayerInfo: async (name: string): Promise<Partial<Player>> => {
    const ai = getAiClient();

    // Si pas d'IA dispo, on passe direct au fallback sans erreur
    if (!ai) {
      console.log("Mode Hors-Ligne: Génération aléatoire pour", name);
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
      if (!text) throw new Error("Empty response from AI");
      return JSON.parse(text);

    } catch (error) {
      console.warn("AI Request Failed (Using Fallback):", error);
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
    const ai = getAiClient();
    
    // Fallback par défaut
    const fallbackCoach = {
        name: name,
        tacticalStyle: ['Offensif', 'Défensif', 'Possession', 'Contre-Attaque'][Math.floor(Math.random()*4)],
        nationality: 'Internationale'
    };

    if (!ai) return fallbackCoach;

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
      if (!text) throw new Error("Empty response from AI");
      return JSON.parse(text);

    } catch (error) {
      return fallbackCoach;
    }
  },

  // 2. Analyze Formation
  analyzeFormation: async (team: Team): Promise<{ score: number, analysis: string }> => {
    const ai = getAiClient();
    
    if (!ai) {
        return { 
            score: Math.floor(Math.random() * 3) + 6, 
            analysis: "Mode Hors-Ligne : Votre formation semble équilibrée. Pour une analyse détaillée par l'IA, veuillez configurer une Clé API valide." 
        };
    }

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
      return text ? JSON.parse(text) : { score: 5, analysis: "Erreur d'analyse." };

    } catch (error) {
      console.error("AI Analysis Failed", error);
      return { 
          score: Math.floor(Math.random() * 3) + 5, 
          analysis: "L'IA n'a pas pu analyser l'équipe. Vérifiez votre connexion." 
      };
    }
  },

  // 3. Simulate Match
  simulateMatch: async (home: Team, away: Team): Promise<MatchResult> => {
    const ai = getAiClient();
    
    // Fallback Simulation
    const fallbackSim = {
        scoreHome: Math.floor(Math.random() * 4),
        scoreAway: Math.floor(Math.random() * 3),
        summary: "Match simulé en mode hors-ligne. Les deux équipes se sont bien battues.",
        highlights: [`${Math.floor(Math.random()*20)+10}' Tir dangereux`, `${Math.floor(Math.random()*30)+50}' Contre-attaque rapide`],
        mvp: home.players[0]?.name || "Le Gardien"
    };

    if (!ai) return fallbackSim;

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
      if (!text) throw new Error("Empty response from AI");
      return JSON.parse(text);

    } catch (error) {
      console.error("AI Match Sim Failed", error);
      return fallbackSim;
    }
  }
};