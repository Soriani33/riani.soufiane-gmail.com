import { Player, Coach, PositionType } from '../types';

// Placeholder par défaut
const P = ""; 

// Helper stats
const s = (p:number, sh:number, pa:number, dr:number, de:number, ph:number) => ({
    pace: p, shooting: sh, passing: pa, dribbling: dr, defending: de, physical: ph
});
const gk = (div:number, han:number, kic:number, ref:number, spd:number, pos:number) => ({
    pace: div, shooting: han, passing: kic, dribbling: ref, defending: spd, physical: pos
});

export const INITIAL_COACHES: Coach[] = [
    { id: 'c1', name: 'Pep Guardiola', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Pep_Guardiola_2015.jpg/440px-Pep_Guardiola_2015.jpg', tacticalStyle: 'Jeu de Position', nationality: 'Spain' },
    { id: 'c2', name: 'Carlo Ancelotti', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Real_Madrid_vs_Juventus_24_July_2022_at_Rose_Bowl_Stadium_Carlo_Ancelotti.jpg/440px-Real_Madrid_vs_Juventus_24_July_2022_at_Rose_Bowl_Stadium_Carlo_Ancelotti.jpg', tacticalStyle: 'Relationnel', nationality: 'Italy' },
    { id: 'c3', name: 'Mikel Arteta', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Mikel_Arteta_2020.jpg/440px-Mikel_Arteta_2020.jpg', tacticalStyle: 'Contrôle & Domination', nationality: 'Spain' },
    { id: 'c4', name: 'Luis Enrique', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Luis_Enrique_2015.jpg/440px-Luis_Enrique_2015.jpg', tacticalStyle: 'Verticalité', nationality: 'Spain' },
    { id: 'c5', name: 'Didier Deschamps', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Didier_Deschamps_2018.jpg/440px-Didier_Deschamps_2018.jpg', tacticalStyle: 'Pragmatique', nationality: 'France' },
    { id: 'c6', name: 'José Mourinho', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Jose_Mourinho_2013.jpg/440px-Jose_Mourinho_2013.jpg', tacticalStyle: 'Bloc Bas', nationality: 'Portugal' },
    { id: 'c7', name: 'Xabi Alonso', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Xabi_Alonso_2016.jpg/440px-Xabi_Alonso_2016.jpg', tacticalStyle: 'Pistons & Jeu court', nationality: 'Spain' },
    { id: 'c8', name: 'Simone Inzaghi', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Simone_Inzaghi_2019.jpg/440px-Simone_Inzaghi_2019.jpg', tacticalStyle: '3-5-2 Fluide', nationality: 'Italy' },
    { id: 'c9', name: 'Xavi', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Xavi_Hernandez_2022.jpg/440px-Xavi_Hernandez_2022.jpg', tacticalStyle: 'Tiki-Taka', nationality: 'Spain' },
    { id: 'c10', name: 'Unai Emery', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Unai_Emery_2018.jpg/440px-Unai_Emery_2018.jpg', tacticalStyle: 'Tactique', nationality: 'Spain' },
    { id: 'c11', name: 'Walid Regragui', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Walid_Regragui_2022.jpg/440px-Walid_Regragui_2022.jpg', tacticalStyle: 'Esprit d\'Équipe', nationality: 'Morocco' },
];

export const INITIAL_PLAYERS: Player[] = [
    // GARDIENS
    { id: 'gk_1', name: 'Thibaut Courtois', position: 'GK', type: PositionType.GK, rating: 90, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/898.png', stats: gk(85, 89, 76, 93, 46, 90), details: { club: 'Real Madrid', nationality: 'Belgium' } },
    { id: 'gk_2', name: 'Alisson Becker', position: 'GK', type: PositionType.GK, rating: 89, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/2065.png', stats: gk(86, 85, 85, 89, 54, 90), details: { club: 'Liverpool', nationality: 'Brazil' } },
    { id: 'gk_3', name: 'Ederson', position: 'GK', type: PositionType.GK, rating: 88, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/3282.png', stats: gk(84, 82, 91, 87, 64, 86), details: { club: 'Man City', nationality: 'Brazil' } },
    { id: 'gk_7', name: 'Gianluigi Donnarumma', position: 'GK', type: PositionType.GK, rating: 87, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/4044.png', stats: gk(88, 83, 75, 90, 52, 84), details: { club: 'PSG', nationality: 'Italy' } },
    { id: 'gk_mor_1', name: 'Yassine Bounou', position: 'GK', type: PositionType.GK, rating: 86, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/2989.png', stats: gk(84, 82, 78, 88, 50, 86), details: { club: 'Al-Hilal', nationality: 'Morocco' } },

    // DÉFENSEURS
    { id: 'cb_1', name: 'Virgil van Dijk', position: 'CB', type: PositionType.DEF, rating: 89, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/2107.png', stats: s(78, 60, 71, 72, 89, 86), details: { club: 'Liverpool', nationality: 'Netherlands' } },
    { id: 'cb_2', name: 'Rúben Dias', position: 'CB', type: PositionType.DEF, rating: 89, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/37996.png', stats: s(62, 39, 66, 68, 89, 87), details: { club: 'Man City', nationality: 'Portugal' } },
    { id: 'rb_1', name: 'Kyle Walker', position: 'RB', type: PositionType.DEF, rating: 86, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/1435.png', stats: s(90, 63, 76, 77, 80, 82), details: { club: 'Man City', nationality: 'England' } },
    { id: 'rb_2', name: 'Achraf Hakimi', position: 'RB', type: PositionType.DEF, rating: 86, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/4034.png', stats: s(94, 74, 78, 82, 76, 76), details: { club: 'PSG', nationality: 'Morocco' } },
    { id: 'rb_3', name: 'Trent A-Arnold', position: 'RB', type: PositionType.DEF, rating: 86, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/33580.png', stats: s(76, 72, 91, 80, 76, 70), details: { club: 'Liverpool', nationality: 'England' } },
    { id: 'lb_1', name: 'Theo Hernández', position: 'LB', type: PositionType.DEF, rating: 87, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/39066.png', stats: s(95, 72, 77, 83, 78, 82), details: { club: 'AC Milan', nationality: 'France' } },
    { id: 'lb_2', name: 'Alphonso Davies', position: 'LB', type: PositionType.DEF, rating: 85, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/42823.png', stats: s(95, 68, 76, 84, 75, 76), details: { club: 'Bayern', nationality: 'Canada' } },
    
    // MILIEUX
    { id: 'cdm_1', name: 'Rodri', position: 'CDM', type: PositionType.MID, rating: 91, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/39433.png', stats: s(60, 75, 88, 80, 87, 85), details: { club: 'Man City', nationality: 'Spain' } },
    { id: 'cdm_4', name: 'Declan Rice', position: 'CDM', type: PositionType.MID, rating: 87, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/34193.png', stats: s(75, 68, 82, 78, 86, 84), details: { club: 'Arsenal', nationality: 'England' } },
    { id: 'cm_1', name: 'Kevin De Bruyne', position: 'CM', type: PositionType.MID, rating: 91, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/2342.png', stats: s(72, 85, 94, 86, 65, 78), details: { club: 'Man City', nationality: 'Belgium' } },
    { id: 'cm_2', name: 'Jude Bellingham', position: 'CAM', type: PositionType.MID, rating: 90, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/60906.png', stats: s(82, 84, 86, 89, 78, 83), details: { club: 'Real Madrid', nationality: 'England' } },
    { id: 'cm_3', name: 'Bernardo Silva', position: 'CM', type: PositionType.MID, rating: 88, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/33587.png', stats: s(75, 78, 88, 92, 65, 68), details: { club: 'Man City', nationality: 'Portugal' } },
    { id: 'cm_9', name: 'Luka Modrić', position: 'CM', type: PositionType.MID, rating: 87, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/713.png', stats: s(72, 76, 90, 86, 70, 65), details: { club: 'Real Madrid', nationality: 'Croatia' } },
    { id: 'cam_4', name: 'Bruno Fernandes', position: 'CAM', type: PositionType.MID, rating: 87, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/33568.png', stats: s(75, 86, 89, 83, 65, 74), details: { club: 'Man Utd', nationality: 'Portugal' } },
    { id: 'mid_mor_4', name: 'Brahim Díaz', position: 'CAM', type: PositionType.MID, rating: 84, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/34212.png', stats: s(85, 78, 80, 87, 45, 65), details: { club: 'Real Madrid', nationality: 'Morocco' } },

    // ATTAQUANTS
    { id: 'rw_1', name: 'Lionel Messi', position: 'RW', type: PositionType.FWD, rating: 90, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/711.png', stats: s(78, 88, 90, 93, 35, 62), details: { club: 'Inter Miami', nationality: 'Argentina' } },
    { id: 'rw_2', name: 'Mohamed Salah', position: 'RW', type: PositionType.FWD, rating: 89, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/2085.png', stats: s(89, 87, 81, 88, 45, 76), details: { club: 'Liverpool', nationality: 'Egypt' } },
    { id: 'rw_3', name: 'Bukayo Saka', position: 'RW', type: PositionType.FWD, rating: 88, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/50346.png', stats: s(86, 83, 84, 88, 55, 72), details: { club: 'Arsenal', nationality: 'England' } },
    { id: 'lw_1', name: 'Kylian Mbappé', position: 'LW', type: PositionType.FWD, rating: 91, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/40696.png', stats: s(97, 90, 80, 92, 36, 78), details: { club: 'Real Madrid', nationality: 'France' } },
    { id: 'lw_2', name: 'Vinícius Jr.', position: 'LW', type: PositionType.FWD, rating: 90, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/39832.png', stats: s(95, 84, 82, 91, 35, 70), details: { club: 'Real Madrid', nationality: 'Brazil' } },
    { id: 'lw_3', name: 'Heung-min Son', position: 'LW', type: PositionType.FWD, rating: 87, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/2356.png', stats: s(87, 89, 81, 85, 42, 70), details: { club: 'Tottenham', nationality: 'South Korea' } },
    { id: 'st_1', name: 'Erling Haaland', position: 'ST', type: PositionType.FWD, rating: 91, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/40776.png', stats: s(89, 93, 66, 80, 45, 88), details: { club: 'Man City', nationality: 'Norway' } },
    { id: 'st_2', name: 'Harry Kane', position: 'ST', type: PositionType.FWD, rating: 90, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/2265.png', stats: s(69, 93, 85, 83, 49, 83), details: { club: 'Bayern', nationality: 'England' } },
    { id: 'st_3', name: 'Robert Lewandowski', position: 'ST', type: PositionType.FWD, rating: 88, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/2100.png', stats: s(75, 90, 80, 85, 42, 82), details: { club: 'Barcelona', nationality: 'Poland' } },
    { id: 'st_7', name: 'Cristiano Ronaldo', position: 'ST', type: PositionType.FWD, rating: 86, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/885.png', stats: s(77, 90, 75, 79, 35, 74), details: { club: 'Al-Nassr', nationality: 'Portugal' } },
    
    // Autres stars
    { id: 'fwd_mor_3', name: 'Abdessamad Ezzalzouli', position: 'LW', type: PositionType.FWD, rating: 77, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/103983.png', stats: s(86, 72, 70, 85, 35, 65), details: { club: 'Betis', nationality: 'Morocco' } },
    { id: 'fwd_mor_4', name: 'Hakim Ziyech', position: 'RW', type: PositionType.FWD, rating: 82, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/2990.png', stats: s(74, 82, 88, 84, 50, 62), details: { club: 'Galatasaray', nationality: 'Morocco' } },
    { id: 'fwd_mor_1', name: 'Youssef En-Nesyri', position: 'ST', type: PositionType.FWD, rating: 81, photoUrl: 'https://b.fssta.com/uploads/application/soccer/headshots/42825.png', stats: s(82, 80, 65, 75, 45, 84), details: { club: 'Fenerbahçe', nationality: 'Morocco' } },
];