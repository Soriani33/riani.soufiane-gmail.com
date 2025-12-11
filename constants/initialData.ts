import { Player, Coach, PositionType } from '../types';

// Images placeholders (à remplacer par l'utilisateur)
const P = ""; 

export const INITIAL_COACHES: Coach[] = [
    { id: 'c1', name: 'Carlo Ancelotti', photoUrl: P, tacticalStyle: 'Pragmatique & Relationnel', nationality: 'Italy' },
    { id: 'c2', name: 'Pep Guardiola', photoUrl: P, tacticalStyle: 'Jeu de Position & Possession', nationality: 'Spain' },
    { id: 'c3', name: 'Jurgen Klopp', photoUrl: P, tacticalStyle: 'Gegenpressing', nationality: 'Germany' },
    { id: 'c4', name: 'Mikel Arteta', photoUrl: P, tacticalStyle: 'Contrôle & Domination', nationality: 'Spain' },
    { id: 'c5', name: 'Xabi Alonso', photoUrl: P, tacticalStyle: 'Fluidité & Largeur', nationality: 'Spain' },
];

export const INITIAL_PLAYERS: Player[] = [
    // --- GARDIENS (GK) ---
    { id: 'gk1', name: 'Thibaut Courtois', position: 'GK', type: PositionType.GK, rating: 90, photoUrl: P, stats: { defending: 90, diving: 85, handling: 89, kicking: 76, reflexes: 93, positioning: 90 } as any, details: { club: 'Real Madrid', nationality: 'Belgium' } },
    { id: 'gk2', name: 'Alisson Becker', position: 'GK', type: PositionType.GK, rating: 89, photoUrl: P, stats: { defending: 89, diving: 86, handling: 85, kicking: 85, reflexes: 89, positioning: 90 } as any, details: { club: 'Liverpool', nationality: 'Brazil' } },
    { id: 'gk3', name: 'Ederson', position: 'GK', type: PositionType.GK, rating: 88, photoUrl: P, stats: { defending: 88, diving: 84, handling: 82, kicking: 91, reflexes: 87, positioning: 86 } as any, details: { club: 'Man City', nationality: 'Brazil' } },
    { id: 'gk4', name: 'Jan Oblak', position: 'GK', type: PositionType.GK, rating: 88, photoUrl: P, stats: { defending: 89, diving: 86, handling: 90, kicking: 78, reflexes: 89, positioning: 88 } as any, details: { club: 'Atletico Madrid', nationality: 'Slovenia' } },
    { id: 'gk5', name: 'Mike Maignan', position: 'GK', type: PositionType.GK, rating: 87, photoUrl: P, stats: { defending: 87, diving: 86, handling: 84, kicking: 82, reflexes: 89, positioning: 85 } as any, details: { club: 'AC Milan', nationality: 'France' } },

    // --- DÉFENSEURS CENTRAUX (CB) ---
    { id: 'cb1', name: 'Virgil van Dijk', position: 'CB', type: PositionType.DEF, rating: 89, photoUrl: P, stats: { pace: 78, shooting: 60, passing: 71, dribbling: 72, defending: 89, physical: 86 }, details: { club: 'Liverpool', nationality: 'Netherlands' } },
    { id: 'cb2', name: 'Rúben Dias', position: 'CB', type: PositionType.DEF, rating: 89, photoUrl: P, stats: { pace: 62, shooting: 39, passing: 66, dribbling: 68, defending: 89, physical: 87 }, details: { club: 'Man City', nationality: 'Portugal' } },
    { id: 'cb3', name: 'William Saliba', position: 'CB', type: PositionType.DEF, rating: 87, photoUrl: P, stats: { pace: 82, shooting: 35, passing: 72, dribbling: 74, defending: 87, physical: 84 }, details: { club: 'Arsenal', nationality: 'France' } },
    { id: 'cb4', name: 'Kim Min-jae', position: 'CB', type: PositionType.DEF, rating: 86, photoUrl: P, stats: { pace: 80, shooting: 40, passing: 70, dribbling: 68, defending: 87, physical: 85 }, details: { club: 'Bayern Munich', nationality: 'South Korea' } },
    { id: 'cb5', name: 'Ronald Araújo', position: 'CB', type: PositionType.DEF, rating: 86, photoUrl: P, stats: { pace: 84, shooting: 50, passing: 65, dribbling: 64, defending: 85, physical: 86 }, details: { club: 'Barcelona', nationality: 'Uruguay' } },

    // --- LATÉRAUX (RB/LB) ---
    { id: 'rb1', name: 'Kyle Walker', position: 'RB', type: PositionType.DEF, rating: 86, photoUrl: P, stats: { pace: 90, shooting: 63, passing: 76, dribbling: 77, defending: 80, physical: 82 }, details: { club: 'Man City', nationality: 'England' } },
    { id: 'rb2', name: 'Achraf Hakimi', position: 'RB', type: PositionType.DEF, rating: 86, photoUrl: P, stats: { pace: 94, shooting: 74, passing: 78, dribbling: 82, defending: 76, physical: 76 }, details: { club: 'PSG', nationality: 'Morocco' } },
    { id: 'lb1', name: 'Theo Hernández', position: 'LB', type: PositionType.DEF, rating: 87, photoUrl: P, stats: { pace: 95, shooting: 72, passing: 77, dribbling: 83, defending: 78, physical: 82 }, details: { club: 'AC Milan', nationality: 'France' } },
    { id: 'lb2', name: 'Alphonso Davies', position: 'LB', type: PositionType.DEF, rating: 85, photoUrl: P, stats: { pace: 95, shooting: 68, passing: 76, dribbling: 84, defending: 75, physical: 76 }, details: { club: 'Bayern Munich', nationality: 'Canada' } },
    { id: 'rb3', name: 'Trent A-Arnold', position: 'RB', type: PositionType.DEF, rating: 86, photoUrl: P, stats: { pace: 76, shooting: 72, passing: 91, dribbling: 80, defending: 76, physical: 70 }, details: { club: 'Liverpool', nationality: 'England' } },

    // --- MILIEUX DÉFENSIFS (CDM) ---
    { id: 'cdm1', name: 'Rodri', position: 'CDM', type: PositionType.MID, rating: 91, photoUrl: P, stats: { pace: 60, shooting: 75, passing: 88, dribbling: 80, defending: 87, physical: 85 }, details: { club: 'Man City', nationality: 'Spain' } },
    { id: 'cdm2', name: 'Joshua Kimmich', position: 'CDM', type: PositionType.MID, rating: 88, photoUrl: P, stats: { pace: 70, shooting: 72, passing: 87, dribbling: 84, defending: 82, physical: 74 }, details: { club: 'Bayern Munich', nationality: 'Germany' } },
    { id: 'cdm3', name: 'Declan Rice', position: 'CDM', type: PositionType.MID, rating: 87, photoUrl: P, stats: { pace: 75, shooting: 68, passing: 82, dribbling: 78, defending: 86, physical: 84 }, details: { club: 'Arsenal', nationality: 'England' } },
    { id: 'cdm4', name: 'Aurélien Tchouaméni', position: 'CDM', type: PositionType.MID, rating: 86, photoUrl: P, stats: { pace: 76, shooting: 72, passing: 80, dribbling: 79, defending: 84, physical: 83 }, details: { club: 'Real Madrid', nationality: 'France' } },
    
    // --- MILIEUX CENTRAUX (CM/CAM) ---
    { id: 'cm1', name: 'Kevin De Bruyne', position: 'CM', type: PositionType.MID, rating: 91, photoUrl: P, stats: { pace: 72, shooting: 85, passing: 94, dribbling: 86, defending: 65, physical: 78 }, details: { club: 'Man City', nationality: 'Belgium' } },
    { id: 'cm2', name: 'Jude Bellingham', position: 'CAM', type: PositionType.MID, rating: 90, photoUrl: P, stats: { pace: 82, shooting: 84, passing: 86, dribbling: 89, defending: 78, physical: 83 }, details: { club: 'Real Madrid', nationality: 'England' } },
    { id: 'cm3', name: 'Bernardo Silva', position: 'CM', type: PositionType.MID, rating: 88, photoUrl: P, stats: { pace: 75, shooting: 78, passing: 88, dribbling: 92, defending: 65, physical: 68 }, details: { club: 'Man City', nationality: 'Portugal' } },
    { id: 'cam1', name: 'Martin Ødegaard', position: 'CAM', type: PositionType.MID, rating: 87, photoUrl: P, stats: { pace: 78, shooting: 80, passing: 89, dribbling: 88, defending: 62, physical: 65 }, details: { club: 'Arsenal', nationality: 'Norway' } },
    { id: 'cam2', name: 'Jamal Musiala', position: 'CAM', type: PositionType.MID, rating: 87, photoUrl: P, stats: { pace: 85, shooting: 78, passing: 82, dribbling: 93, defending: 55, physical: 60 }, details: { club: 'Bayern Munich', nationality: 'Germany' } },

    // --- AILIERS (RW/LW) ---
    { id: 'rw1', name: 'Lionel Messi', position: 'RW', type: PositionType.FWD, rating: 90, photoUrl: P, stats: { pace: 78, shooting: 88, passing: 90, dribbling: 93, defending: 35, physical: 62 }, details: { club: 'Inter Miami', nationality: 'Argentina' } },
    { id: 'lw1', name: 'Kylian Mbappé', position: 'LW', type: PositionType.FWD, rating: 91, photoUrl: P, stats: { pace: 97, shooting: 90, passing: 80, dribbling: 92, defending: 36, physical: 78 }, details: { club: 'Real Madrid', nationality: 'France' } },
    { id: 'lw2', name: 'Vinícius Jr.', position: 'LW', type: PositionType.FWD, rating: 90, photoUrl: P, stats: { pace: 95, shooting: 84, passing: 82, dribbling: 91, defending: 35, physical: 70 }, details: { club: 'Real Madrid', nationality: 'Brazil' } },
    { id: 'rw2', name: 'Mohamed Salah', position: 'RW', type: PositionType.FWD, rating: 89, photoUrl: P, stats: { pace: 89, shooting: 87, passing: 81, dribbling: 88, defending: 45, physical: 76 }, details: { club: 'Liverpool', nationality: 'Egypt' } },
    { id: 'rw3', name: 'Bukayo Saka', position: 'RW', type: PositionType.FWD, rating: 87, photoUrl: P, stats: { pace: 86, shooting: 83, passing: 84, dribbling: 88, defending: 55, physical: 72 }, details: { club: 'Arsenal', nationality: 'England' } },

    // --- BUTEURS (ST) ---
    { id: 'st1', name: 'Erling Haaland', position: 'ST', type: PositionType.FWD, rating: 91, photoUrl: P, stats: { pace: 89, shooting: 93, passing: 66, dribbling: 80, defending: 45, physical: 88 }, details: { club: 'Man City', nationality: 'Norway' } },
    { id: 'st2', name: 'Harry Kane', position: 'ST', type: PositionType.FWD, rating: 90, photoUrl: P, stats: { pace: 69, shooting: 93, passing: 85, dribbling: 83, defending: 49, physical: 83 }, details: { club: 'Bayern Munich', nationality: 'England' } },
    { id: 'st3', name: 'Robert Lewandowski', position: 'ST', type: PositionType.FWD, rating: 88, photoUrl: P, stats: { pace: 75, shooting: 90, passing: 80, dribbling: 85, defending: 42, physical: 82 }, details: { club: 'Barcelona', nationality: 'Poland' } },
    { id: 'st4', name: 'Victor Osimhen', position: 'ST', type: PositionType.FWD, rating: 87, photoUrl: P, stats: { pace: 90, shooting: 85, passing: 68, dribbling: 80, defending: 40, physical: 84 }, details: { club: 'Napoli', nationality: 'Nigeria' } },
    { id: 'st5', name: 'Lautaro Martínez', position: 'ST', type: PositionType.FWD, rating: 87, photoUrl: P, stats: { pace: 80, shooting: 86, passing: 75, dribbling: 85, defending: 50, physical: 84 }, details: { club: 'Inter Milan', nationality: 'Argentina' } }
];