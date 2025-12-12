import { Player, Coach, PositionType } from '../types';

// Helper stats pour simplifier la saisie et réduire la taille du fichier
const s = (def:number, dri:number, pac:number, pas:number, phy:number, sho:number) => ({
    defending: def, dribbling: dri, pace: pac, passing: pas, physical: phy, shooting: sho
});

// Helper pour les photos Transfermarkt (TM)
const tm = (id: string) => `https://img.a.transfermarkt.technology/portrait/header/${id}.jpg?lm=1`;

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
    // --- GARDIENS (GK) ---
    { id: "gk1", name: "Thibaut Courtois", position: "GK", type: PositionType.GK, rating: 90, photoUrl: tm("108390-1717280733"), stats: s(90, 15, 50, 60, 80, 20), details: { club: "Real Madrid", nationality: "Belgium" } },
    { id: "gk2", name: "Alisson Becker", position: "GK", type: PositionType.GK, rating: 89, photoUrl: tm("105470-1668522221"), stats: s(89, 20, 60, 85, 80, 20), details: { club: "Liverpool", nationality: "Brazil" } },
    { id: "gk3", name: "Ederson", position: "GK", type: PositionType.GK, rating: 88, photoUrl: tm("238223-1713391842"), stats: s(88, 25, 65, 90, 80, 20), details: { club: "Man City", nationality: "Brazil" } },
    { id: "gk4", name: "Jan Oblak", position: "GK", type: PositionType.GK, rating: 88, photoUrl: tm("121483-1719350076"), stats: s(90, 15, 50, 60, 80, 15), details: { club: "Atletico Madrid", nationality: "Slovenia" } },
    { id: "gk5", name: "Mike Maignan", position: "GK", type: PositionType.GK, rating: 87, photoUrl: tm("182906-1681459155"), stats: s(88, 20, 55, 75, 80, 15), details: { club: "AC Milan", nationality: "France" } },
    { id: "gk6", name: "Marc-André ter Stegen", position: "GK", type: PositionType.GK, rating: 89, photoUrl: tm("74857-1709549925"), stats: s(89, 20, 50, 85, 80, 15), details: { club: "Barcelona", nationality: "Germany" } },
    { id: "gk7", name: "Gianluigi Donnarumma", position: "GK", type: PositionType.GK, rating: 87, photoUrl: tm("315858-1709545266"), stats: s(88, 15, 55, 70, 85, 15), details: { club: "PSG", nationality: "Italy" } },
    { id: "gk8", name: "Gregor Kobel", position: "GK", type: PositionType.GK, rating: 87, photoUrl: tm("257814-1709559904"), stats: s(87, 15, 55, 70, 80, 15), details: { club: "Dortmund", nationality: "Switzerland" } },
    { id: "gk9", name: "Emiliano Martínez", position: "GK", type: PositionType.GK, rating: 85, photoUrl: tm("111873-1668180824"), stats: s(86, 15, 50, 70, 82, 15), details: { club: "Aston Villa", nationality: "Argentina" } },
    { id: "gk10", name: "André Onana", position: "GK", type: PositionType.GK, rating: 85, photoUrl: tm("234509-1663678586"), stats: s(85, 20, 55, 80, 80, 15), details: { club: "Man Utd", nationality: "Cameroon" } },
    { id: "gk11", name: "Yassine Bounou", position: "GK", type: PositionType.GK, rating: 86, photoUrl: "https://img.a.transfermarkt.technology/portrait/header/207834-1697055166.png?lm=1", stats: s(87, 20, 50, 70, 80, 15), details: { club: "Al-Hilal", nationality: "Morocco" } },
    { id: "gk12", name: "Munir El Kajoui", position: "GK", type: PositionType.GK, rating: 76, photoUrl: tm("161783-1669629161"), stats: s(76, 15, 50, 60, 75, 15), details: { club: "RS Berkane", nationality: "Morocco" } },
    { id: "gk13", name: "El Mehdi Benabid", position: "GK", type: PositionType.GK, rating: 74, photoUrl: tm("235374-1659353974"), stats: s(74, 15, 50, 60, 70, 15), details: { club: "FAR Rabat", nationality: "Morocco" } },
    { id: "gk14", name: "Salaheddine Chihab", position: "GK", type: PositionType.GK, rating: 72, photoUrl: tm("566818-1704284811"), stats: s(72, 15, 50, 60, 70, 15), details: { club: "MAS Fes", nationality: "Morocco" } },
    
    // GK Legends
    { id: "gkl1", name: "Lev Yashin", position: "GK", type: PositionType.GK, rating: 94, photoUrl: tm("174987-1678283335"), stats: s(95, 20, 60, 70, 85, 20), details: { club: "Legend", nationality: "Russia" } },
    { id: "gkl2", name: "Gianluigi Buffon", position: "GK", type: PositionType.GK, rating: 93, photoUrl: tm("5023-1689679117"), stats: s(94, 20, 50, 75, 85, 20), details: { club: "Legend", nationality: "Italy" } },
    { id: "gkl3", name: "Manuel Neuer", position: "GK", type: PositionType.GK, rating: 92, photoUrl: tm("17259-1709549303"), stats: s(92, 30, 60, 85, 85, 20), details: { club: "Legend", nationality: "Germany" } },
    { id: "gkl4", name: "Iker Casillas", position: "GK", type: PositionType.GK, rating: 92, photoUrl: tm("3979-1582209703"), stats: s(92, 20, 60, 70, 80, 20), details: { club: "Legend", nationality: "Spain" } },

    // --- DÉFENSEURS CENTRAUX (CB) ---
    { id: "cb1", name: "Virgil van Dijk", position: "CB", type: PositionType.DEF, rating: 89, photoUrl: tm("139208-1701353970"), stats: s(91, 72, 78, 71, 86, 60), details: { club: "Liverpool", nationality: "Netherlands" } },
    { id: "cb2", name: "Rúben Dias", position: "CB", type: PositionType.DEF, rating: 89, photoUrl: tm("258004-1684855584"), stats: s(90, 70, 75, 75, 88, 50), details: { club: "Man City", nationality: "Portugal" } },
    { id: "cb3", name: "William Saliba", position: "CB", type: PositionType.DEF, rating: 87, photoUrl: tm("495666-1697640242"), stats: s(88, 75, 82, 75, 84, 55), details: { club: "Arsenal", nationality: "France" } },
    { id: "cb4", name: "Kim Min-jae", position: "CB", type: PositionType.DEF, rating: 86, photoUrl: tm("503482-1698246835"), stats: s(87, 70, 80, 72, 85, 50), details: { club: "Bayern", nationality: "South Korea" } },
    { id: "cb5", name: "Ronald Araújo", position: "CB", type: PositionType.DEF, rating: 86, photoUrl: tm("480267-1694697960"), stats: s(87, 68, 85, 65, 86, 55), details: { club: "Barcelona", nationality: "Uruguay" } },
    { id: "cb6", name: "Éder Militão", position: "CB", type: PositionType.DEF, rating: 86, photoUrl: tm("401530-1697204455"), stats: s(87, 72, 85, 74, 83, 60), details: { club: "Real Madrid", nationality: "Brazil" } },
    { id: "cb7", name: "Matthijs de Ligt", position: "CB", type: PositionType.DEF, rating: 86, photoUrl: tm("326031-1698246714"), stats: s(87, 70, 75, 72, 86, 60), details: { club: "Man Utd", nationality: "Netherlands" } },
    { id: "cb8", name: "Alessandro Bastoni", position: "CB", type: PositionType.DEF, rating: 85, photoUrl: tm("315853-1692278783"), stats: s(86, 75, 75, 78, 82, 55), details: { club: "Inter", nationality: "Italy" } },
    { id: "cb9", name: "Gabriel Magalhães", position: "CB", type: PositionType.DEF, rating: 85, photoUrl: tm("435338-1697639535"), stats: s(86, 65, 74, 70, 86, 55), details: { club: "Arsenal", nationality: "Brazil" } },
    { id: "cb10", name: "Dayot Upamecano", position: "CB", type: PositionType.DEF, rating: 84, photoUrl: tm("344695-1698247065"), stats: s(84, 70, 83, 72, 85, 50), details: { club: "Bayern", nationality: "France" } },
    { id: "cb11", name: "Nayef Aguerd", position: "CB", type: PositionType.DEF, rating: 81, photoUrl: tm("361914-1659355782"), stats: s(83, 68, 75, 72, 80, 55), details: { club: "Real Sociedad", nationality: "Morocco" } },
    { id: "cb12", name: "Romain Saïss", position: "CB", type: PositionType.DEF, rating: 79, photoUrl: tm("204198-1669382215"), stats: s(80, 65, 65, 70, 84, 60), details: { club: "Al-Sadd", nationality: "Morocco" } },
    { id: "cb13", name: "Soufiane Bouftini", position: "CB", type: PositionType.DEF, rating: 74, photoUrl: tm("554622-1672304892"), stats: s(75, 60, 68, 65, 80, 50), details: { club: "Al-Wasl", nationality: "Morocco" } },

    // --- LATERAUX (RB/LB) ---
    { id: "rb1", name: "Kyle Walker", position: "RB", type: PositionType.DEF, rating: 86, photoUrl: tm("95424-1718274198"), stats: s(80, 78, 92, 76, 84, 65), details: { club: "Man City", nationality: "England" } },
    { id: "rb2", name: "Achraf Hakimi", position: "RB", type: PositionType.DEF, rating: 86, photoUrl: tm("398073-1672304327"), stats: s(78, 84, 94, 80, 78, 75), details: { club: "PSG", nationality: "Morocco" } },
    { id: "rb3", name: "Trent A-Arnold", position: "RB", type: PositionType.DEF, rating: 86, photoUrl: tm("314353-1701354026"), stats: s(72, 82, 78, 91, 70, 76), details: { club: "Liverpool", nationality: "England" } },
    { id: "rb4", name: "Reece James", position: "RB", type: PositionType.DEF, rating: 84, photoUrl: tm("472423-1667822941"), stats: s(80, 82, 84, 82, 80, 74), details: { club: "Chelsea", nationality: "England" } },
    { id: "lb1", name: "Theo Hernández", position: "LB", type: PositionType.DEF, rating: 87, photoUrl: tm("339808-1685434674"), stats: s(78, 84, 95, 78, 82, 75), details: { club: "AC Milan", nationality: "France" } },
    { id: "lb2", name: "Alphonso Davies", position: "LB", type: PositionType.DEF, rating: 85, photoUrl: tm("424204-1698246479"), stats: s(76, 84, 96, 76, 76, 70), details: { club: "Bayern", nationality: "Canada" } },
    { id: "lb3", name: "Andrew Robertson", position: "LB", type: PositionType.DEF, rating: 86, photoUrl: tm("234803-1701353880"), stats: s(82, 80, 84, 82, 78, 65), details: { club: "Liverpool", nationality: "Scotland" } },
    { id: "lb4", name: "Alejandro Grimaldo", position: "LB", type: PositionType.DEF, rating: 86, photoUrl: tm("190289-1697193215"), stats: s(76, 86, 85, 88, 70, 80), details: { club: "Leverkusen", nationality: "Spain" } },
    { id: "rb5", name: "Noussair Mazraoui", position: "RB", type: PositionType.DEF, rating: 82, photoUrl: tm("340356-1698246664"), stats: s(78, 83, 82, 78, 75, 70), details: { club: "Man Utd", nationality: "Morocco" } },
    { id: "lb5", name: "Adam Aznou", position: "LB", type: PositionType.DEF, rating: 70, photoUrl: tm("1002939-1698246288"), stats: s(65, 75, 80, 70, 60, 60), details: { club: "Bayern Munich", nationality: "Morocco" } },

    // DEF Legends
    { id: "defl1", name: "Franz Beckenbauer", position: "CB", type: PositionType.DEF, rating: 95, photoUrl: tm("4324-1704702138"), stats: s(95, 88, 85, 90, 86, 75), details: { club: "Legend", nationality: "Germany" } },
    { id: "defl2", name: "Paolo Maldini", position: "LB", type: PositionType.DEF, rating: 94, photoUrl: tm("5803-1662973713"), stats: s(96, 75, 86, 80, 85, 65), details: { club: "Legend", nationality: "Italy" } },
    { id: "defl3", name: "Franco Baresi", position: "CB", type: PositionType.DEF, rating: 93, photoUrl: tm("16035-1681995893"), stats: s(95, 75, 78, 78, 82, 55), details: { club: "Legend", nationality: "Italy" } },
    { id: "defl4", name: "Roberto Carlos", position: "LB", type: PositionType.DEF, rating: 91, photoUrl: tm("5787-1668519504"), stats: s(82, 84, 93, 82, 85, 88), details: { club: "Legend", nationality: "Brazil" } },
    { id: "defl5", name: "Cafu", position: "RB", type: PositionType.DEF, rating: 92, photoUrl: tm("5936-1673860088"), stats: s(88, 85, 90, 84, 84, 65), details: { club: "Legend", nationality: "Brazil" } },
    { id: "defl6", name: "Sergio Ramos", position: "CB", type: PositionType.DEF, rating: 90, photoUrl: tm("25557-1694502812"), stats: s(90, 75, 80, 78, 88, 75), details: { club: "Legend", nationality: "Spain" } },

    // --- MILIEUX DÉFENSIFS/CENTRAUX (CDM/CM) ---
    { id: "cdm1", name: "Rodri", position: "CDM", type: PositionType.MID, rating: 91, photoUrl: tm("357565-1684855465"), stats: s(88, 84, 75, 88, 85, 78), details: { club: "Man City", nationality: "Spain" } },
    { id: "cdm2", name: "Joshua Kimmich", position: "CDM", type: PositionType.MID, rating: 88, photoUrl: tm("161056-1698246581"), stats: s(84, 84, 78, 88, 75, 74), details: { club: "Bayern", nationality: "Germany" } },
    { id: "cdm3", name: "Aurélien Tchouaméni", position: "CDM", type: PositionType.MID, rating: 86, photoUrl: tm("413112-1697204787"), stats: s(85, 80, 78, 82, 85, 75), details: { club: "Real Madrid", nationality: "France" } },
    { id: "cdm4", name: "Declan Rice", position: "CDM", type: PositionType.MID, rating: 87, photoUrl: tm("357662-1697639886"), stats: s(86, 80, 78, 84, 84, 70), details: { club: "Arsenal", nationality: "England" } },
    { id: "cdm5", name: "Casemiro", position: "CDM", type: PositionType.MID, rating: 87, photoUrl: tm("16306-1669894371"), stats: s(88, 75, 70, 78, 88, 75), details: { club: "Man Utd", nationality: "Brazil" } },
    { id: "cdm6", name: "Bruno Guimarães", position: "CDM", type: PositionType.MID, rating: 86, photoUrl: tm("520624-1692795804"), stats: s(80, 85, 75, 86, 82, 75), details: { club: "Newcastle", nationality: "Brazil" } },
    { id: "cdm7", name: "Eduardo Camavinga", position: "CDM", type: PositionType.MID, rating: 85, photoUrl: tm("640428-1697204925"), stats: s(82, 86, 82, 84, 80, 72), details: { club: "Real Madrid", nationality: "France" } },
    { id: "cdm8", name: "Sofyan Amrabat", position: "CDM", type: PositionType.MID, rating: 82, photoUrl: tm("287579-1685434455"), stats: s(82, 80, 75, 80, 85, 70), details: { club: "Fenerbahçe", nationality: "Morocco" } },
    { id: "cm1", name: "Kevin De Bruyne", position: "CM", type: PositionType.MID, rating: 91, photoUrl: tm("88755-1718273617"), stats: s(65, 88, 78, 95, 76, 86), details: { club: "Man City", nationality: "Belgium" } },
    { id: "cm2", name: "Jude Bellingham", position: "CAM", type: PositionType.MID, rating: 90, photoUrl: tm("581678-1693987944"), stats: s(78, 89, 84, 86, 84, 85), details: { club: "Real Madrid", nationality: "England" } },
    { id: "cm3", name: "Bernardo Silva", position: "CM", type: PositionType.MID, rating: 88, photoUrl: tm("241641-1709553051"), stats: s(65, 92, 78, 88, 70, 78), details: { club: "Man City", nationality: "Portugal" } },
    { id: "cm4", name: "Pedri", position: "CM", type: PositionType.MID, rating: 86, photoUrl: tm("683840-1709549557"), stats: s(68, 89, 80, 88, 65, 74), details: { club: "Barcelona", nationality: "Spain" } },
    { id: "cm5", name: "Ilkay Gündoğan", position: "CM", type: PositionType.MID, rating: 86, photoUrl: tm("53622-1701353723"), stats: s(72, 86, 75, 88, 74, 82), details: { club: "Man City", nationality: "Germany" } },
    { id: "cm6", name: "Frenkie de Jong", position: "CM", type: PositionType.MID, rating: 87, photoUrl: tm("326330-1662586884"), stats: s(76, 89, 82, 88, 76, 70), details: { club: "Barcelona", nationality: "Netherlands" } },
    { id: "cm7", name: "Nicolò Barella", position: "CM", type: PositionType.MID, rating: 86, photoUrl: tm("255942-1661352467"), stats: s(78, 85, 80, 84, 80, 76), details: { club: "Inter", nationality: "Italy" } },
    { id: "cm8", name: "Toni Kroos", position: "CM", type: PositionType.MID, rating: 88, photoUrl: tm("31909-1700638741"), stats: s(70, 82, 60, 94, 70, 82), details: { club: "Real Madrid", nationality: "Germany" } },
    { id: "cm9", name: "Luka Modrić", position: "CM", type: PositionType.MID, rating: 87, photoUrl: tm("27992-1687776160"), stats: s(70, 88, 72, 90, 68, 76), details: { club: "Real Madrid", nationality: "Croatia" } },
    { id: "cm10", name: "Federico Valverde", position: "CM", type: PositionType.MID, rating: 88, photoUrl: tm("365008-1697205166"), stats: s(80, 84, 90, 85, 84, 82), details: { club: "Real Madrid", nationality: "Uruguay" } },
    { id: "cm11", name: "Azzedine Ounahi", position: "CM", type: PositionType.MID, rating: 79, photoUrl: tm("599558-1673602528"), stats: s(65, 85, 75, 80, 65, 70), details: { club: "Panathinaikos", nationality: "Morocco" } },

    // --- MILIEUX OFFENSIFS (CAM/RM/LM) ---
    { id: "cam1", name: "Martin Ødegaard", position: "CAM", type: PositionType.MID, rating: 87, photoUrl: tm("316264-1697639800"), stats: s(60, 89, 78, 90, 65, 80), details: { club: "Arsenal", nationality: "Norway" } },
    { id: "cam2", name: "Jamal Musiala", position: "CAM", type: PositionType.MID, rating: 87, photoUrl: tm("580195-1698246875"), stats: s(60, 92, 85, 84, 65, 80), details: { club: "Bayern", nationality: "Germany" } },
    { id: "cam3", name: "Florian Wirtz", position: "CAM", type: PositionType.MID, rating: 87, photoUrl: tm("598577-1697193306"), stats: s(55, 90, 82, 86, 65, 80), details: { club: "Leverkusen", nationality: "Germany" } },
    { id: "cam4", name: "Bruno Fernandes", position: "CAM", type: PositionType.MID, rating: 87, photoUrl: tm("240306-1683017122"), stats: s(68, 85, 75, 90, 74, 84), details: { club: "Man Utd", nationality: "Portugal" } },
    { id: "cam5", name: "Ismaïl Saibari", position: "CAM", type: PositionType.MID, rating: 78, photoUrl: tm("652070-1704284898"), stats: s(60, 82, 78, 76, 78, 74), details: { club: "PSV", nationality: "Morocco" } },
    { id: "cam6", name: "Brahim Díaz", position: "CAM", type: PositionType.MID, rating: 84, photoUrl: tm("314678-1697205315"), stats: s(45, 88, 80, 82, 60, 78), details: { club: "Real Madrid", nationality: "Morocco" } },
    { id: "cam7", name: "Sofiane Diop", position: "CAM", type: PositionType.MID, rating: 77, photoUrl: tm("546897-1691484641"), stats: s(50, 80, 78, 76, 60, 74), details: { club: "Nice", nationality: "Morocco" } },

    // MID Legends
    { id: "midl1", name: "Pelé", position: "CAM", type: PositionType.MID, rating: 98, photoUrl: tm("3565-1672336332"), stats: s(60, 96, 95, 92, 78, 96), details: { club: "Legend", nationality: "Brazil" } },
    { id: "midl2", name: "Diego Maradona", position: "CAM", type: PositionType.MID, rating: 97, photoUrl: tm("8024-1669368556"), stats: s(55, 98, 88, 94, 76, 94), details: { club: "Legend", nationality: "Argentina" } },
    { id: "midl3", name: "Zinedine Zidane", position: "CAM", type: PositionType.MID, rating: 96, photoUrl: tm("3111-1478769687"), stats: s(70, 95, 82, 96, 84, 90), details: { club: "Legend", nationality: "France" } },
    { id: "midl4", name: "Johan Cruyff", position: "CAM", type: PositionType.MID, rating: 95, photoUrl: tm("8636-1678198751"), stats: s(55, 95, 88, 92, 72, 92), details: { club: "Legend", nationality: "Netherlands" } },
    { id: "midl5", name: "Lothar Matthäus", position: "CDM", type: PositionType.MID, rating: 92, photoUrl: tm("25396-1596706059"), stats: s(90, 84, 85, 88, 88, 88), details: { club: "Legend", nationality: "Germany" } },
    { id: "midl6", name: "Andrés Iniesta", position: "CM", type: PositionType.MID, rating: 93, photoUrl: tm("7600-1676632427"), stats: s(68, 96, 76, 95, 65, 78), details: { club: "Legend", nationality: "Spain" } },
    { id: "midl7", name: "Xavi", position: "CM", type: PositionType.MID, rating: 93, photoUrl: tm("7607-1568023773"), stats: s(70, 92, 75, 96, 68, 76), details: { club: "Legend", nationality: "Spain" } },
    { id: "midl8", name: "Andrea Pirlo", position: "CDM", type: PositionType.MID, rating: 92, photoUrl: tm("5817-1509968436"), stats: s(75, 90, 72, 98, 70, 82), details: { club: "Legend", nationality: "Italy" } },
    { id: "midl9", name: "Patrick Vieira", position: "CDM", type: PositionType.MID, rating: 90, photoUrl: tm("3185-1596101438"), stats: s(90, 82, 80, 85, 92, 78), details: { club: "Legend", nationality: "France" } },
    { id: "midl10", name: "N'Golo Kanté", position: "CDM", type: PositionType.MID, rating: 89, photoUrl: tm("225083-1725547608"), stats: s(92, 80, 82, 84, 86, 70), details: { club: "Al-Ittihad", nationality: "France" } },

    // --- ATTAQUANTS (RW/LW/ST) ---
    { id: "rw1", name: "Lionel Messi", position: "RW", type: PositionType.FWD, rating: 90, photoUrl: tm("28003-1710080339"), stats: s(35, 94, 80, 90, 65, 88), details: { club: "Inter Miami", nationality: "Argentina" } },
    { id: "rw2", name: "Mohamed Salah", position: "RW", type: PositionType.FWD, rating: 89, photoUrl: tm("148455-1684948842"), stats: s(45, 88, 90, 84, 76, 88), details: { club: "Liverpool", nationality: "Egypt" } },
    { id: "rw3", name: "Bukayo Saka", position: "RW", type: PositionType.FWD, rating: 88, photoUrl: tm("433177-1697639148"), stats: s(60, 88, 86, 82, 74, 84), details: { club: "Arsenal", nationality: "England" } },
    { id: "rw4", name: "Rodrygo", position: "RW", type: PositionType.FWD, rating: 86, photoUrl: tm("412363-1697205041"), stats: s(40, 88, 88, 80, 68, 82), details: { club: "Real Madrid", nationality: "Brazil" } },
    { id: "rw5", name: "Cole Palmer", position: "RW", type: PositionType.FWD, rating: 85, photoUrl: tm("568177-1698679632"), stats: s(50, 85, 82, 84, 70, 82), details: { club: "Chelsea", nationality: "England" } },
    { id: "lw1", name: "Kylian Mbappé", position: "LW", type: PositionType.FWD, rating: 91, photoUrl: tm("342229-1694698375"), stats: s(40, 92, 97, 82, 78, 90), details: { club: "Real Madrid", nationality: "France" } },
    { id: "lw2", name: "Vinícius Jr.", position: "LW", type: PositionType.FWD, rating: 90, photoUrl: tm("371998-1697204868"), stats: s(35, 94, 95, 82, 74, 84), details: { club: "Real Madrid", nationality: "Brazil" } },
    { id: "lw3", name: "Heung-min Son", position: "LW", type: PositionType.FWD, rating: 87, photoUrl: tm("91845-1697204005"), stats: s(45, 86, 88, 82, 72, 89), details: { club: "Tottenham", nationality: "South Korea" } },
    { id: "lw4", name: "Phil Foden", position: "LW", type: PositionType.FWD, rating: 88, photoUrl: tm("406635-1684855913"), stats: s(60, 90, 86, 86, 65, 84), details: { club: "Man City", nationality: "England" } },
    { id: "lw5", name: "Khvicha Kvaratskhelia", position: "LW", type: PositionType.FWD, rating: 86, photoUrl: tm("502670-1709549117"), stats: s(40, 88, 85, 82, 74, 80), details: { club: "Napoli", nationality: "Georgia" } },
    { id: "lw6", name: "Rafael Leão", position: "LW", type: PositionType.FWD, rating: 86, photoUrl: tm("494273-1685435010"), stats: s(35, 88, 92, 78, 80, 80), details: { club: "AC Milan", nationality: "Portugal" } },
    { id: "st1", name: "Erling Haaland", position: "ST", type: PositionType.FWD, rating: 91, photoUrl: tm("418560-1718273767"), stats: s(45, 82, 90, 70, 88, 94), details: { club: "Man City", nationality: "Norway" } },
    { id: "st2", name: "Harry Kane", position: "ST", type: PositionType.FWD, rating: 90, photoUrl: tm("132098-1709550307"), stats: s(50, 84, 75, 86, 84, 93), details: { club: "Bayern", nationality: "England" } },
    { id: "st3", name: "Robert Lewandowski", position: "ST", type: PositionType.FWD, rating: 88, photoUrl: tm("38253-1709549646"), stats: s(45, 85, 78, 80, 82, 91), details: { club: "Barcelona", nationality: "Poland" } },
    { id: "st4", name: "Victor Osimhen", position: "ST", type: PositionType.FWD, rating: 87, photoUrl: tm("401923-1661413865"), stats: s(40, 80, 90, 70, 85, 88), details: { club: "Galatasaray", nationality: "Nigeria" } },
    { id: "st5", name: "Lautaro Martínez", position: "ST", type: PositionType.FWD, rating: 87, photoUrl: tm("406625-1692278385"), stats: s(50, 86, 82, 78, 84, 86), details: { club: "Inter", nationality: "Argentina" } },
    { id: "st6", name: "Karim Benzema", position: "ST", type: PositionType.FWD, rating: 88, photoUrl: tm("18922-1725546950"), stats: s(45, 88, 76, 84, 78, 90), details: { club: "Al-Ittihad", nationality: "France" } },
    { id: "st7", name: "Cristiano Ronaldo", position: "ST", type: PositionType.FWD, rating: 86, photoUrl: tm("8198-1694609670"), stats: s(35, 82, 80, 78, 80, 92), details: { club: "Al-Nassr", nationality: "Portugal" } },
    { id: "st8", name: "Youssef En-Nesyri", position: "ST", type: PositionType.FWD, rating: 81, photoUrl: tm("435734-1709549830"), stats: s(40, 75, 84, 65, 80, 82), details: { club: "Fenerbahçe", nationality: "Morocco" } },
    { id: "st9", name: "Ayoub El Kaabi", position: "ST", type: PositionType.FWD, rating: 79, photoUrl: tm("363065-1701334659"), stats: s(40, 76, 80, 68, 78, 82), details: { club: "Olympiakos", nationality: "Morocco" } },
    { id: "lw7", name: "Abdessamad Ezzalzouli", position: "LW", type: PositionType.FWD, rating: 77, photoUrl: tm("612450-1698243577"), stats: s(35, 86, 88, 70, 65, 72), details: { club: "Betis", nationality: "Morocco" } },
    { id: "rw6", name: "Hakim Ziyech", position: "RW", type: PositionType.FWD, rating: 82, photoUrl: tm("217111-1694605920"), stats: s(55, 86, 78, 88, 65, 80), details: { club: "Galatasaray", nationality: "Morocco" } },
    { id: "lw8", name: "Sofiane Boufal", position: "LW", type: PositionType.FWD, rating: 78, photoUrl: tm("232271-1632733971"), stats: s(35, 90, 82, 78, 65, 75), details: { club: "Al-Rayyan", nationality: "Morocco" } },
    { id: "rw7", name: "Ilias Akhomach", position: "RW", type: PositionType.FWD, rating: 75, photoUrl: tm("709969-1700645069"), stats: s(40, 84, 82, 74, 60, 72), details: { club: "Villarreal", nationality: "Morocco" } },
    { id: "st10", name: "Walid Azaro", position: "ST", type: PositionType.FWD, rating: 74, photoUrl: tm("452485-1678198751"), stats: s(35, 75, 86, 65, 78, 75), details: { club: "Ajman", nationality: "Morocco" } },
    { id: "st11", name: "Tarik Tissoudali", position: "ST", type: PositionType.FWD, rating: 76, photoUrl: tm("323429-1669383636"), stats: s(40, 82, 80, 72, 74, 76), details: { club: "PAOK", nationality: "Morocco" } },
    { id: "st12", name: "Hamza Igamane", position: "ST", type: PositionType.FWD, rating: 72, photoUrl: tm("837207-1673602528"), stats: s(35, 75, 82, 65, 75, 72), details: { club: "Lille", nationality: "Morocco" } },

    // FWD Legends
    { id: "fwdl1", name: "Ronaldo Nazário", position: "ST", type: PositionType.FWD, rating: 96, photoUrl: tm("3139-1456396497"), stats: s(45, 96, 96, 82, 84, 96), details: { club: "Legend", nationality: "Brazil" } },
    { id: "fwdl2", name: "Gerd Müller", position: "ST", type: PositionType.FWD, rating: 94, photoUrl: tm("35604-1672304951"), stats: s(40, 82, 82, 75, 86, 98), details: { club: "Legend", nationality: "Germany" } },
    { id: "fwdl3", name: "Ferenc Puskás", position: "ST", type: PositionType.FWD, rating: 94, photoUrl: tm("173752-1672336332"), stats: s(40, 92, 86, 88, 75, 96), details: { club: "Legend", nationality: "Hungary" } },
    { id: "fwdl4", name: "Marco van Basten", position: "ST", type: PositionType.FWD, rating: 93, photoUrl: tm("7983-1668519504"), stats: s(40, 88, 84, 80, 82, 95), details: { club: "Legend", nationality: "Netherlands" } },
    { id: "fwdl5", name: "Thierry Henry", position: "ST", type: PositionType.FWD, rating: 93, photoUrl: tm("3207-1669368556"), stats: s(45, 92, 94, 85, 80, 92), details: { club: "Legend", nationality: "France" } },
    { id: "fwdl6", name: "Ronaldinho", position: "LW", type: PositionType.FWD, rating: 95, photoUrl: tm("3373-1669368556"), stats: s(40, 98, 92, 90, 78, 88), details: { club: "Legend", nationality: "Brazil" } },
    { id: "fwdl7", name: "Garrincha", position: "RW", type: PositionType.FWD, rating: 94, photoUrl: tm("229532-1672336332"), stats: s(35, 98, 94, 88, 70, 86), details: { club: "Legend", nationality: "Brazil" } },
    { id: "fwdl8", name: "George Best", position: "RW", type: PositionType.FWD, rating: 93, photoUrl: tm("174986-1678283335"), stats: s(40, 96, 92, 84, 72, 90), details: { club: "Legend", nationality: "N. Ireland" } },
    { id: "fwdl9", name: "Jamie Vardy", position: "ST", type: PositionType.FWD, rating: 76, photoUrl: tm("197838-1683031278"), stats: s(40, 70, 85, 65, 75, 80), details: { club: "Leicester City", nationality: "England" } }
];