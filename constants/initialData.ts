import { Player, Coach, PositionType } from '../types';

// Placeholder pour les images
const P = ""; 

// Helper pour générer des stats rapidement sans écrire 50 lignes par joueur
// p=Pace, sh=Shooting, pa=Passing, dr=Dribbling, de=Defending, ph=Physical
const s = (p:number, sh:number, pa:number, dr:number, de:number, ph:number) => ({
    pace: p, shooting: sh, passing: pa, dribbling: dr, defending: de, physical: ph
});

// Pour les gardiens : Pace=Diving, Sho=Handling, Pas=Kicking, Dri=Reflexes, Def=Speed, Phy=Positioning
const gk = (div:number, han:number, kic:number, ref:number, spd:number, pos:number) => ({
    pace: div, shooting: han, passing: kic, dribbling: ref, defending: spd, physical: pos
});

export const INITIAL_COACHES: Coach[] = [
    { id: 'c1', name: 'Pep Guardiola', photoUrl: P, tacticalStyle: 'Jeu de Position', nationality: 'Spain' },
    { id: 'c2', name: 'Carlo Ancelotti', photoUrl: P, tacticalStyle: 'Relationnel', nationality: 'Italy' },
    { id: 'c3', name: 'Mikel Arteta', photoUrl: P, tacticalStyle: 'Contrôle & Domination', nationality: 'Spain' },
    { id: 'c4', name: 'Luis Enrique', photoUrl: P, tacticalStyle: 'Verticalité', nationality: 'Spain' },
    { id: 'c5', name: 'Didier Deschamps', photoUrl: P, tacticalStyle: 'Pragmatique', nationality: 'France' },
    { id: 'c6', name: 'José Mourinho', photoUrl: P, tacticalStyle: 'Bloc Bas', nationality: 'Portugal' },
    { id: 'c7', name: 'Xabi Alonso', photoUrl: P, tacticalStyle: 'Pistons & Jeu court', nationality: 'Spain' },
    { id: 'c8', name: 'Simone Inzaghi', photoUrl: P, tacticalStyle: '3-5-2 Fluide', nationality: 'Italy' },
    { id: 'c9', name: 'Xavi', photoUrl: P, tacticalStyle: 'Tiki-Taka', nationality: 'Spain' },
    { id: 'c10', name: 'Unai Emery', photoUrl: P, tacticalStyle: 'Tactique', nationality: 'Spain' },
];

export const INITIAL_PLAYERS: Player[] = [
    // ==========================================
    // GARDIENS (GK)
    // ==========================================
    { id: 'gk_1', name: 'Thibaut Courtois', position: 'GK', type: PositionType.GK, rating: 90, photoUrl: P, stats: gk(85, 89, 76, 93, 46, 90), details: { club: 'Real Madrid', nationality: 'Belgium' } },
    { id: 'gk_2', name: 'Alisson Becker', position: 'GK', type: PositionType.GK, rating: 89, photoUrl: P, stats: gk(86, 85, 85, 89, 54, 90), details: { club: 'Liverpool', nationality: 'Brazil' } },
    { id: 'gk_3', name: 'Ederson', position: 'GK', type: PositionType.GK, rating: 88, photoUrl: P, stats: gk(84, 82, 91, 87, 64, 86), details: { club: 'Man City', nationality: 'Brazil' } },
    { id: 'gk_4', name: 'Jan Oblak', position: 'GK', type: PositionType.GK, rating: 88, photoUrl: P, stats: gk(86, 90, 78, 89, 50, 88), details: { club: 'Atletico Madrid', nationality: 'Slovenia' } },
    { id: 'gk_5', name: 'Mike Maignan', position: 'GK', type: PositionType.GK, rating: 87, photoUrl: P, stats: gk(86, 84, 82, 89, 55, 85), details: { club: 'AC Milan', nationality: 'France' } },
    { id: 'gk_6', name: 'Marc-André ter Stegen', position: 'GK', type: PositionType.GK, rating: 89, photoUrl: P, stats: gk(85, 86, 88, 90, 48, 86), details: { club: 'Barcelona', nationality: 'Germany' } },
    { id: 'gk_7', name: 'Gianluigi Donnarumma', position: 'GK', type: PositionType.GK, rating: 87, photoUrl: P, stats: gk(88, 83, 75, 90, 52, 84), details: { club: 'PSG', nationality: 'Italy' } },
    { id: 'gk_8', name: 'Gregor Kobel', position: 'GK', type: PositionType.GK, rating: 87, photoUrl: P, stats: gk(86, 84, 76, 88, 50, 85), details: { club: 'Dortmund', nationality: 'Switzerland' } },
    { id: 'gk_9', name: 'Emiliano Martínez', position: 'GK', type: PositionType.GK, rating: 85, photoUrl: P, stats: gk(83, 82, 78, 85, 50, 84), details: { club: 'Aston Villa', nationality: 'Argentina' } },
    { id: 'gk_10', name: 'André Onana', position: 'GK', type: PositionType.GK, rating: 85, photoUrl: P, stats: gk(82, 80, 88, 86, 55, 83), details: { club: 'Man Utd', nationality: 'Cameroon' } },
    // MAROC GK
    { id: 'gk_mor_1', name: 'Yassine Bounou', position: 'GK', type: PositionType.GK, rating: 86, photoUrl: P, stats: gk(84, 82, 78, 88, 50, 86), details: { club: 'Al-Hilal', nationality: 'Morocco' } },
    { id: 'gk_mor_2', name: 'Munir El Kajoui', position: 'GK', type: PositionType.GK, rating: 76, photoUrl: P, stats: gk(76, 74, 68, 77, 45, 75), details: { club: 'RS Berkane', nationality: 'Morocco' } },
    { id: 'gk_mor_3', name: 'El Mehdi Benabid', position: 'GK', type: PositionType.GK, rating: 74, photoUrl: P, stats: gk(74, 72, 65, 75, 48, 73), details: { club: 'FAR Rabat', nationality: 'Morocco' } },
    { id: 'gk_mor_4', name: 'Salaheddine Chihab', position: 'GK', type: PositionType.GK, rating: 72, photoUrl: P, stats: gk(72, 70, 64, 73, 46, 71), details: { club: 'MAS Fes', nationality: 'Morocco' } },
    // LEGENDS GK
    { id: 'gk_leg_1', name: 'Lev Yashin', position: 'GK', type: PositionType.GK, rating: 94, photoUrl: P, stats: gk(95, 90, 75, 96, 60, 95), details: { club: 'Legend', nationality: 'Russia' } },
    { id: 'gk_leg_2', name: 'Gianluigi Buffon', position: 'GK', type: PositionType.GK, rating: 93, photoUrl: P, stats: gk(90, 92, 78, 92, 50, 94), details: { club: 'Legend', nationality: 'Italy' } },
    { id: 'gk_leg_3', name: 'Manuel Neuer', position: 'GK', type: PositionType.GK, rating: 92, photoUrl: P, stats: gk(90, 88, 91, 92, 65, 90), details: { club: 'Legend', nationality: 'Germany' } },
    { id: 'gk_leg_4', name: 'Iker Casillas', position: 'GK', type: PositionType.GK, rating: 92, photoUrl: P, stats: gk(93, 86, 75, 94, 60, 88), details: { club: 'Legend', nationality: 'Spain' } },

    // ==========================================
    // DÉFENSEURS (CB, RB, LB)
    // ==========================================
    // CB
    { id: 'cb_1', name: 'Virgil van Dijk', position: 'CB', type: PositionType.DEF, rating: 89, photoUrl: P, stats: s(78, 60, 71, 72, 89, 86), details: { club: 'Liverpool', nationality: 'Netherlands' } },
    { id: 'cb_2', name: 'Rúben Dias', position: 'CB', type: PositionType.DEF, rating: 89, photoUrl: P, stats: s(62, 39, 66, 68, 89, 87), details: { club: 'Man City', nationality: 'Portugal' } },
    { id: 'cb_3', name: 'William Saliba', position: 'CB', type: PositionType.DEF, rating: 87, photoUrl: P, stats: s(82, 35, 72, 74, 87, 84), details: { club: 'Arsenal', nationality: 'France' } },
    { id: 'cb_4', name: 'Kim Min-jae', position: 'CB', type: PositionType.DEF, rating: 86, photoUrl: P, stats: s(80, 40, 70, 68, 87, 85), details: { club: 'Bayern', nationality: 'South Korea' } },
    { id: 'cb_5', name: 'Ronald Araújo', position: 'CB', type: PositionType.DEF, rating: 86, photoUrl: P, stats: s(84, 50, 65, 64, 85, 86), details: { club: 'Barcelona', nationality: 'Uruguay' } },
    { id: 'cb_6', name: 'Éder Militão', position: 'CB', type: PositionType.DEF, rating: 86, photoUrl: P, stats: s(85, 50, 72, 70, 85, 83), details: { club: 'Real Madrid', nationality: 'Brazil' } },
    { id: 'cb_7', name: 'Matthijs de Ligt', position: 'CB', type: PositionType.DEF, rating: 86, photoUrl: P, stats: s(68, 58, 68, 68, 85, 86), details: { club: 'Man Utd', nationality: 'Netherlands' } },
    { id: 'cb_8', name: 'Alessandro Bastoni', position: 'CB', type: PositionType.DEF, rating: 85, photoUrl: P, stats: s(74, 45, 76, 75, 86, 82), details: { club: 'Inter', nationality: 'Italy' } },
    { id: 'cb_9', name: 'Gabriel Magalhães', position: 'CB', type: PositionType.DEF, rating: 85, photoUrl: P, stats: s(70, 40, 68, 65, 86, 85), details: { club: 'Arsenal', nationality: 'Brazil' } },
    { id: 'cb_10', name: 'Dayot Upamecano', position: 'CB', type: PositionType.DEF, rating: 84, photoUrl: P, stats: s(83, 42, 70, 72, 84, 85), details: { club: 'Bayern', nationality: 'France' } },
    // RB/LB
    { id: 'rb_1', name: 'Kyle Walker', position: 'RB', type: PositionType.DEF, rating: 86, photoUrl: P, stats: s(90, 63, 76, 77, 80, 82), details: { club: 'Man City', nationality: 'England' } },
    { id: 'rb_2', name: 'Achraf Hakimi', position: 'RB', type: PositionType.DEF, rating: 86, photoUrl: P, stats: s(94, 74, 78, 82, 76, 76), details: { club: 'PSG', nationality: 'Morocco' } },
    { id: 'rb_3', name: 'Trent A-Arnold', position: 'RB', type: PositionType.DEF, rating: 86, photoUrl: P, stats: s(76, 72, 91, 80, 76, 70), details: { club: 'Liverpool', nationality: 'England' } },
    { id: 'rb_4', name: 'Reece James', position: 'RB', type: PositionType.DEF, rating: 84, photoUrl: P, stats: s(82, 70, 82, 81, 80, 80), details: { club: 'Chelsea', nationality: 'England' } },
    { id: 'lb_1', name: 'Theo Hernández', position: 'LB', type: PositionType.DEF, rating: 87, photoUrl: P, stats: s(95, 72, 77, 83, 78, 82), details: { club: 'AC Milan', nationality: 'France' } },
    { id: 'lb_2', name: 'Alphonso Davies', position: 'LB', type: PositionType.DEF, rating: 85, photoUrl: P, stats: s(95, 68, 76, 84, 75, 76), details: { club: 'Bayern', nationality: 'Canada' } },
    { id: 'lb_3', name: 'Andrew Robertson', position: 'LB', type: PositionType.DEF, rating: 86, photoUrl: P, stats: s(80, 62, 82, 80, 81, 76), details: { club: 'Liverpool', nationality: 'Scotland' } },
    { id: 'lb_4', name: 'Alejandro Grimaldo', position: 'LB', type: PositionType.DEF, rating: 86, photoUrl: P, stats: s(84, 78, 87, 85, 75, 68), details: { club: 'Leverkusen', nationality: 'Spain' } },
    
    // MAROC DEF
    { id: 'def_mor_1', name: 'Nayef Aguerd', position: 'CB', type: PositionType.DEF, rating: 81, photoUrl: P, stats: s(72, 45, 70, 65, 82, 78), details: { club: 'Real Sociedad', nationality: 'Morocco' } },
    { id: 'def_mor_2', name: 'Romain Saïss', position: 'CB', type: PositionType.DEF, rating: 79, photoUrl: P, stats: s(60, 50, 65, 62, 80, 82), details: { club: 'Al-Sadd', nationality: 'Morocco' } },
    { id: 'def_mor_3', name: 'Noussair Mazraoui', position: 'RB', type: PositionType.DEF, rating: 82, photoUrl: P, stats: s(81, 68, 78, 83, 76, 72), details: { club: 'Man Utd', nationality: 'Morocco' } },
    { id: 'def_mor_4', name: 'Adam Aznou', position: 'LB', type: PositionType.DEF, rating: 70, photoUrl: P, stats: s(82, 55, 68, 72, 65, 60), details: { club: 'Bayern Munich', nationality: 'Morocco' } },
    { id: 'def_mor_5', name: 'Soufiane Bouftini', position: 'CB', type: PositionType.DEF, rating: 74, photoUrl: P, stats: s(65, 40, 60, 55, 75, 78), details: { club: 'Al-Wasl', nationality: 'Morocco' } },

    // LEGENDS DEF
    { id: 'def_leg_1', name: 'Franz Beckenbauer', position: 'CB', type: PositionType.DEF, rating: 95, photoUrl: P, stats: s(85, 75, 90, 88, 96, 88), details: { club: 'Legend', nationality: 'Germany' } },
    { id: 'def_leg_2', name: 'Paolo Maldini', position: 'LB', type: PositionType.DEF, rating: 94, photoUrl: P, stats: s(88, 65, 80, 75, 96, 85), details: { club: 'Legend', nationality: 'Italy' } },
    { id: 'def_leg_3', name: 'Franco Baresi', position: 'CB', type: PositionType.DEF, rating: 93, photoUrl: P, stats: s(80, 50, 78, 75, 95, 85), details: { club: 'Legend', nationality: 'Italy' } },
    { id: 'def_leg_4', name: 'Roberto Carlos', position: 'LB', type: PositionType.DEF, rating: 91, photoUrl: P, stats: s(95, 85, 82, 84, 86, 84), details: { club: 'Legend', nationality: 'Brazil' } },
    { id: 'def_leg_5', name: 'Cafu', position: 'RB', type: PositionType.DEF, rating: 92, photoUrl: P, stats: s(90, 70, 86, 88, 88, 85), details: { club: 'Legend', nationality: 'Brazil' } },
    { id: 'def_leg_6', name: 'Sergio Ramos', position: 'CB', type: PositionType.DEF, rating: 90, photoUrl: P, stats: s(80, 70, 75, 72, 90, 90), details: { club: 'Legend', nationality: 'Spain' } },

    // ==========================================
    // MILIEUX (CDM, CM, CAM)
    // ==========================================
    // CDM
    { id: 'cdm_1', name: 'Rodri', position: 'CDM', type: PositionType.MID, rating: 91, photoUrl: P, stats: s(60, 75, 88, 80, 87, 85), details: { club: 'Man City', nationality: 'Spain' } },
    { id: 'cdm_2', name: 'Joshua Kimmich', position: 'CDM', type: PositionType.MID, rating: 88, photoUrl: P, stats: s(70, 72, 87, 84, 82, 74), details: { club: 'Bayern', nationality: 'Germany' } },
    { id: 'cdm_3', name: 'Aurélien Tchouaméni', position: 'CDM', type: PositionType.MID, rating: 86, photoUrl: P, stats: s(76, 72, 80, 79, 84, 83), details: { club: 'Real Madrid', nationality: 'France' } },
    { id: 'cdm_4', name: 'Declan Rice', position: 'CDM', type: PositionType.MID, rating: 87, photoUrl: P, stats: s(75, 68, 82, 78, 86, 84), details: { club: 'Arsenal', nationality: 'England' } },
    { id: 'cdm_5', name: 'Casemiro', position: 'CDM', type: PositionType.MID, rating: 87, photoUrl: P, stats: s(63, 73, 75, 72, 87, 88), details: { club: 'Man Utd', nationality: 'Brazil' } },
    { id: 'cdm_6', name: 'Bruno Guimarães', position: 'CDM', type: PositionType.MID, rating: 86, photoUrl: P, stats: s(74, 75, 84, 85, 80, 82), details: { club: 'Newcastle', nationality: 'Brazil' } },
    { id: 'cdm_7', name: 'Eduardo Camavinga', position: 'CDM', type: PositionType.MID, rating: 85, photoUrl: P, stats: s(82, 70, 83, 85, 80, 78), details: { club: 'Real Madrid', nationality: 'France' } },
    // CM/CAM
    { id: 'cm_1', name: 'Kevin De Bruyne', position: 'CM', type: PositionType.MID, rating: 91, photoUrl: P, stats: s(72, 85, 94, 86, 65, 78), details: { club: 'Man City', nationality: 'Belgium' } },
    { id: 'cm_2', name: 'Jude Bellingham', position: 'CAM', type: PositionType.MID, rating: 90, photoUrl: P, stats: s(82, 84, 86, 89, 78, 83), details: { club: 'Real Madrid', nationality: 'England' } },
    { id: 'cm_3', name: 'Bernardo Silva', position: 'CM', type: PositionType.MID, rating: 88, photoUrl: P, stats: s(75, 78, 88, 92, 65, 68), details: { club: 'Man City', nationality: 'Portugal' } },
    { id: 'cm_4', name: 'Pedri', position: 'CM', type: PositionType.MID, rating: 86, photoUrl: P, stats: s(78, 70, 86, 89, 68, 65), details: { club: 'Barcelona', nationality: 'Spain' } },
    { id: 'cm_5', name: 'İlkay Gündoğan', position: 'CM', type: PositionType.MID, rating: 86, photoUrl: P, stats: s(70, 80, 88, 85, 72, 70), details: { club: 'Man City', nationality: 'Germany' } },
    { id: 'cm_6', name: 'Frenkie de Jong', position: 'CM', type: PositionType.MID, rating: 87, photoUrl: P, stats: s(82, 70, 87, 88, 76, 74), details: { club: 'Barcelona', nationality: 'Netherlands' } },
    { id: 'cm_7', name: 'Nicolò Barella', position: 'CM', type: PositionType.MID, rating: 86, photoUrl: P, stats: s(80, 75, 84, 85, 78, 78), details: { club: 'Inter', nationality: 'Italy' } },
    { id: 'cm_8', name: 'Toni Kroos', position: 'CM', type: PositionType.MID, rating: 88, photoUrl: P, stats: s(55, 81, 93, 75, 72, 70), details: { club: 'Real Madrid', nationality: 'Germany' } },
    { id: 'cm_9', name: 'Luka Modrić', position: 'CM', type: PositionType.MID, rating: 87, photoUrl: P, stats: s(72, 76, 90, 86, 70, 65), details: { club: 'Real Madrid', nationality: 'Croatia' } },
    { id: 'cm_10', name: 'Federico Valverde', position: 'CM', type: PositionType.MID, rating: 88, photoUrl: P, stats: s(91, 82, 84, 83, 80, 85), details: { club: 'Real Madrid', nationality: 'Uruguay' } },
    { id: 'cam_1', name: 'Martin Ødegaard', position: 'CAM', type: PositionType.MID, rating: 87, photoUrl: P, stats: s(78, 80, 89, 88, 62, 65), details: { club: 'Arsenal', nationality: 'Norway' } },
    { id: 'cam_2', name: 'Jamal Musiala', position: 'CAM', type: PositionType.MID, rating: 87, photoUrl: P, stats: s(85, 78, 82, 93, 55, 60), details: { club: 'Bayern', nationality: 'Germany' } },
    { id: 'cam_3', name: 'Florian Wirtz', position: 'CAM', type: PositionType.MID, rating: 87, photoUrl: P, stats: s(82, 80, 86, 89, 50, 65), details: { club: 'Leverkusen', nationality: 'Germany' } },
    { id: 'cam_4', name: 'Bruno Fernandes', position: 'CAM', type: PositionType.MID, rating: 87, photoUrl: P, stats: s(75, 86, 89, 83, 65, 74), details: { club: 'Man Utd', nationality: 'Portugal' } },
    
    // MAROC MID
    { id: 'mid_mor_1', name: 'Sofyan Amrabat', position: 'CDM', type: PositionType.MID, rating: 82, photoUrl: P, stats: s(68, 65, 78, 76, 82, 86), details: { club: 'Fenerbahçe', nationality: 'Morocco' } },
    { id: 'mid_mor_2', name: 'Azzedine Ounahi', position: 'CM', type: PositionType.MID, rating: 79, photoUrl: P, stats: s(75, 70, 78, 84, 60, 65), details: { club: 'Panathinaikos', nationality: 'Morocco' } },
    { id: 'mid_mor_3', name: 'Ismaïl Saibari', position: 'CAM', type: PositionType.MID, rating: 78, photoUrl: P, stats: s(80, 75, 76, 82, 55, 78), details: { club: 'PSV', nationality: 'Morocco' } },
    { id: 'mid_mor_4', name: 'Brahim Díaz', position: 'CAM', type: PositionType.MID, rating: 84, photoUrl: P, stats: s(85, 78, 80, 87, 45, 65), details: { club: 'Real Madrid', nationality: 'Morocco' } },
    { id: 'mid_mor_5', name: 'Sofiane Diop', position: 'CAM', type: PositionType.MID, rating: 77, photoUrl: P, stats: s(78, 74, 76, 80, 40, 60), details: { club: 'Nice', nationality: 'Morocco' } },

    // LEGENDS MID
    { id: 'mid_leg_1', name: 'Pelé', position: 'CAM', type: PositionType.MID, rating: 98, photoUrl: P, stats: s(95, 96, 93, 96, 60, 76), details: { club: 'Legend', nationality: 'Brazil' } },
    { id: 'mid_leg_2', name: 'Diego Maradona', position: 'CAM', type: PositionType.MID, rating: 97, photoUrl: P, stats: s(92, 94, 95, 98, 40, 75), details: { club: 'Legend', nationality: 'Argentina' } },
    { id: 'mid_leg_3', name: 'Zinedine Zidane', position: 'CAM', type: PositionType.MID, rating: 96, photoUrl: P, stats: s(85, 92, 96, 95, 75, 86), details: { club: 'Legend', nationality: 'France' } },
    { id: 'mid_leg_4', name: 'Johan Cruyff', position: 'CAM', type: PositionType.MID, rating: 95, photoUrl: P, stats: s(91, 92, 93, 94, 50, 75), details: { club: 'Legend', nationality: 'Netherlands' } },
    { id: 'mid_leg_5', name: 'Lothar Matthäus', position: 'CDM', type: PositionType.MID, rating: 92, photoUrl: P, stats: s(88, 90, 88, 84, 90, 88), details: { club: 'Legend', nationality: 'Germany' } },
    { id: 'mid_leg_6', name: 'Andrés Iniesta', position: 'CM', type: PositionType.MID, rating: 93, photoUrl: P, stats: s(80, 75, 94, 95, 65, 65), details: { club: 'Legend', nationality: 'Spain' } },
    { id: 'mid_leg_7', name: 'Xavi', position: 'CM', type: PositionType.MID, rating: 93, photoUrl: P, stats: s(78, 74, 96, 92, 70, 68), details: { club: 'Legend', nationality: 'Spain' } },
    { id: 'mid_leg_8', name: 'Andrea Pirlo', position: 'CDM', type: PositionType.MID, rating: 92, photoUrl: P, stats: s(70, 80, 96, 88, 70, 65), details: { club: 'Legend', nationality: 'Italy' } },
    { id: 'mid_leg_9', name: 'Patrick Vieira', position: 'CDM', type: PositionType.MID, rating: 90, photoUrl: P, stats: s(82, 75, 84, 82, 90, 92), details: { club: 'Legend', nationality: 'France' } },
    { id: 'mid_leg_10', name: 'N\'Golo Kanté', position: 'CDM', type: PositionType.MID, rating: 89, photoUrl: P, stats: s(82, 65, 78, 80, 90, 85), details: { club: 'Al-Ittihad', nationality: 'France' } },

    // ==========================================
    // ATTAQUANTS (RW, LW, ST)
    // ==========================================
    // WINGERS
    { id: 'rw_1', name: 'Lionel Messi', position: 'RW', type: PositionType.FWD, rating: 90, photoUrl: P, stats: s(78, 88, 90, 93, 35, 62), details: { club: 'Inter Miami', nationality: 'Argentina' } },
    { id: 'rw_2', name: 'Mohamed Salah', position: 'RW', type: PositionType.FWD, rating: 89, photoUrl: P, stats: s(89, 87, 81, 88, 45, 76), details: { club: 'Liverpool', nationality: 'Egypt' } },
    { id: 'rw_3', name: 'Bukayo Saka', position: 'RW', type: PositionType.FWD, rating: 88, photoUrl: P, stats: s(86, 83, 84, 88, 55, 72), details: { club: 'Arsenal', nationality: 'England' } },
    { id: 'rw_4', name: 'Rodrygo', position: 'RW', type: PositionType.FWD, rating: 86, photoUrl: P, stats: s(88, 82, 80, 87, 40, 65), details: { club: 'Real Madrid', nationality: 'Brazil' } },
    { id: 'rw_5', name: 'Cole Palmer', position: 'RW', type: PositionType.FWD, rating: 85, photoUrl: P, stats: s(82, 84, 85, 86, 45, 68), details: { club: 'Chelsea', nationality: 'England' } },
    { id: 'lw_1', name: 'Kylian Mbappé', position: 'LW', type: PositionType.FWD, rating: 91, photoUrl: P, stats: s(97, 90, 80, 92, 36, 78), details: { club: 'Real Madrid', nationality: 'France' } },
    { id: 'lw_2', name: 'Vinícius Jr.', position: 'LW', type: PositionType.FWD, rating: 90, photoUrl: P, stats: s(95, 84, 82, 91, 35, 70), details: { club: 'Real Madrid', nationality: 'Brazil' } },
    { id: 'lw_3', name: 'Heung-min Son', position: 'LW', type: PositionType.FWD, rating: 87, photoUrl: P, stats: s(87, 89, 81, 85, 42, 70), details: { club: 'Tottenham', nationality: 'South Korea' } },
    { id: 'lw_4', name: 'Phil Foden', position: 'LW', type: PositionType.FWD, rating: 88, photoUrl: P, stats: s(84, 85, 86, 89, 56, 68), details: { club: 'Man City', nationality: 'England' } },
    { id: 'lw_5', name: 'Khvicha Kvaratskhelia', position: 'LW', type: PositionType.FWD, rating: 86, photoUrl: P, stats: s(85, 82, 81, 88, 40, 72), details: { club: 'Napoli', nationality: 'Georgia' } },
    { id: 'lw_6', name: 'Rafael Leão', position: 'LW', type: PositionType.FWD, rating: 86, photoUrl: P, stats: s(91, 80, 75, 87, 35, 80), details: { club: 'AC Milan', nationality: 'Portugal' } },
    
    // ST
    { id: 'st_1', name: 'Erling Haaland', position: 'ST', type: PositionType.FWD, rating: 91, photoUrl: P, stats: s(89, 93, 66, 80, 45, 88), details: { club: 'Man City', nationality: 'Norway' } },
    { id: 'st_2', name: 'Harry Kane', position: 'ST', type: PositionType.FWD, rating: 90, photoUrl: P, stats: s(69, 93, 85, 83, 49, 83), details: { club: 'Bayern', nationality: 'England' } },
    { id: 'st_3', name: 'Robert Lewandowski', position: 'ST', type: PositionType.FWD, rating: 88, photoUrl: P, stats: s(75, 90, 80, 85, 42, 82), details: { club: 'Barcelona', nationality: 'Poland' } },
    { id: 'st_4', name: 'Victor Osimhen', position: 'ST', type: PositionType.FWD, rating: 87, photoUrl: P, stats: s(90, 85, 68, 80, 40, 84), details: { club: 'Galatasaray', nationality: 'Nigeria' } },
    { id: 'st_5', name: 'Lautaro Martínez', position: 'ST', type: PositionType.FWD, rating: 87, photoUrl: P, stats: s(80, 86, 75, 85, 50, 84), details: { club: 'Inter', nationality: 'Argentina' } },
    { id: 'st_6', name: 'Karim Benzema', position: 'ST', type: PositionType.FWD, rating: 88, photoUrl: P, stats: s(78, 89, 84, 87, 45, 78), details: { club: 'Al-Ittihad', nationality: 'France' } },
    { id: 'st_7', name: 'Cristiano Ronaldo', position: 'ST', type: PositionType.FWD, rating: 86, photoUrl: P, stats: s(77, 90, 75, 79, 35, 74), details: { club: 'Al-Nassr', nationality: 'Portugal' } },
    
    // MAROC FWD
    { id: 'fwd_mor_1', name: 'Youssef En-Nesyri', position: 'ST', type: PositionType.FWD, rating: 81, photoUrl: P, stats: s(82, 80, 65, 75, 45, 84), details: { club: 'Fenerbahçe', nationality: 'Morocco' } },
    { id: 'fwd_mor_2', name: 'Ayoub El Kaabi', position: 'ST', type: PositionType.FWD, rating: 79, photoUrl: P, stats: s(78, 80, 68, 76, 40, 75), details: { club: 'Olympiakos', nationality: 'Morocco' } },
    { id: 'fwd_mor_3', name: 'Abdessamad Ezzalzouli', position: 'LW', type: PositionType.FWD, rating: 77, photoUrl: P, stats: s(86, 72, 70, 85, 35, 65), details: { club: 'Betis', nationality: 'Morocco' } },
    { id: 'fwd_mor_4', name: 'Hakim Ziyech', position: 'RW', type: PositionType.FWD, rating: 82, photoUrl: P, stats: s(74, 82, 88, 84, 50, 62), details: { club: 'Galatasaray', nationality: 'Morocco' } },
    { id: 'fwd_mor_5', name: 'Sofiane Boufal', position: 'LW', type: PositionType.FWD, rating: 78, photoUrl: P, stats: s(76, 74, 78, 88, 35, 60), details: { club: 'Al-Rayyan', nationality: 'Morocco' } },
    { id: 'fwd_mor_6', name: 'Ilias Akhomach', position: 'RW', type: PositionType.FWD, rating: 75, photoUrl: P, stats: s(78, 72, 74, 80, 40, 62), details: { club: 'Villarreal', nationality: 'Morocco' } },
    { id: 'fwd_mor_7', name: 'Walid Azaro', position: 'ST', type: PositionType.FWD, rating: 74, photoUrl: P, stats: s(85, 74, 60, 72, 35, 75), details: { club: 'Ajman', nationality: 'Morocco' } },
    { id: 'fwd_mor_8', name: 'Tarik Tissoudali', position: 'ST', type: PositionType.FWD, rating: 76, photoUrl: P, stats: s(78, 76, 72, 80, 40, 70), details: { club: 'PAOK', nationality: 'Morocco' } },
    { id: 'fwd_mor_9', name: 'Hamza Igamane', position: 'ST', type: PositionType.FWD, rating: 72, photoUrl: P, stats: s(76, 72, 65, 74, 35, 70), details: { club: 'Lille', nationality: 'Morocco' } },

    // LEGENDS FWD
    { id: 'fwd_leg_1', name: 'Ronaldo Nazário', position: 'ST', type: PositionType.FWD, rating: 96, photoUrl: P, stats: s(97, 95, 81, 95, 45, 85), details: { club: 'Legend', nationality: 'Brazil' } },
    { id: 'fwd_leg_2', name: 'Gerd Müller', position: 'ST', type: PositionType.FWD, rating: 94, photoUrl: P, stats: s(85, 98, 75, 88, 48, 80), details: { club: 'Legend', nationality: 'Germany' } },
    { id: 'fwd_leg_3', name: 'Ferenc Puskás', position: 'ST', type: PositionType.FWD, rating: 94, photoUrl: P, stats: s(87, 96, 91, 92, 45, 75), details: { club: 'Legend', nationality: 'Hungary' } },
    { id: 'fwd_leg_4', name: 'Marco van Basten', position: 'ST', type: PositionType.FWD, rating: 93, photoUrl: P, stats: s(86, 94, 78, 89, 45, 80), details: { club: 'Legend', nationality: 'Netherlands' } },
    { id: 'fwd_leg_5', name: 'Thierry Henry', position: 'ST', type: PositionType.FWD, rating: 93, photoUrl: P, stats: s(94, 91, 83, 90, 50, 80), details: { club: 'Legend', nationality: 'France' } },
    { id: 'fwd_leg_6', name: 'Ronaldinho', position: 'LW', type: PositionType.FWD, rating: 95, photoUrl: P, stats: s(91, 89, 90, 96, 40, 78), details: { club: 'Legend', nationality: 'Brazil' } },
    { id: 'fwd_leg_7', name: 'Garrincha', position: 'RW', type: PositionType.FWD, rating: 94, photoUrl: P, stats: s(90, 86, 88, 97, 35, 70), details: { club: 'Legend', nationality: 'Brazil' } },
    { id: 'fwd_leg_8', name: 'George Best', position: 'RW', type: PositionType.FWD, rating: 93, photoUrl: P, stats: s(92, 90, 85, 94, 50, 75), details: { club: 'Legend', nationality: 'Northern Ireland' } },
];