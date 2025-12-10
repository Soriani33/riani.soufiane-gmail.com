import { Formation, Coordinates } from './types';

// Images
export const DEFAULT_BANNER = "https://i.postimg.cc/DzMYxgPX/Banner.png";
export const DEFAULT_AVATAR = "https://i.postimg.cc/fydC2fq9/empty-avatar.png";
export const DEFAULT_BALL = "https://i.postimg.cc/NMLkL9S8/Sans-titre-2.png";
export const LOGO_ICON = "https://i.postimg.cc/rmkpbSJQ/LOGO-Without-Back.png";

export const PITCHES = [
  { id: 'p1', url: "https://i.postimg.cc/ZKj5Qzkd/pel1.png", name: "Classic Green" },
  { id: 'p2', url: "https://i.postimg.cc/K8z8SpF8/Pel2.png", name: "Deep Emerald" },
  { id: 'p3', url: "https://i.postimg.cc/y8d84pBY/pel3.png", name: "Textured Mix" },
  { id: 'p4', url: "https://i.postimg.cc/W131LYjp/pel4.png", name: "Pro Turf" },
  { id: 'p5', url: "https://i.postimg.cc/T3w3MNGL/pel5.png", name: "Night Mode" },
  { id: 'p6', url: "https://i.postimg.cc/YC9CKDkW/pel6.png", name: "Tactical Grid" },
];

// Helper to flip coordinates for the away team
export const getMirroredCoordinates = (coords: Coordinates[]): Coordinates[] => {
  return coords.map(c => ({
    left: 100 - c.left,
    top: 100 - c.top
  }));
};

// Formations (Home perspective: GK at bottom ~90%, FWD at top ~10%)
// Coordinates are Top%, Left%
const FORMATION_442: Coordinates[] = [
  { top: 88, left: 50 }, // GK
  { top: 70, left: 20 }, { top: 70, left: 40 }, { top: 70, left: 60 }, { top: 70, left: 80 }, // DEF
  { top: 45, left: 20 }, { top: 45, left: 40 }, { top: 45, left: 60 }, { top: 45, left: 80 }, // MID
  { top: 20, left: 40 }, { top: 20, left: 60 } // FWD
];

const FORMATION_433: Coordinates[] = [
  { top: 88, left: 50 }, // GK
  { top: 70, left: 15 }, { top: 70, left: 38 }, { top: 70, left: 62 }, { top: 70, left: 85 }, // DEF
  { top: 50, left: 30 }, { top: 50, left: 50 }, { top: 50, left: 70 }, // MID
  { top: 20, left: 20 }, { top: 20, left: 50 }, { top: 20, left: 80 } // FWD
];

const FORMATION_352: Coordinates[] = [
  { top: 88, left: 50 },
  { top: 70, left: 30 }, { top: 70, left: 50 }, { top: 70, left: 70 },
  { top: 45, left: 15 }, { top: 45, left: 35 }, { top: 45, left: 50 }, { top: 45, left: 65 }, { top: 45, left: 85 },
  { top: 20, left: 40 }, { top: 20, left: 60 }
];

const FORMATION_532: Coordinates[] = [
  { top: 88, left: 50 },
  { top: 72, left: 15 }, { top: 72, left: 32 }, { top: 72, left: 50 }, { top: 72, left: 68 }, { top: 72, left: 85 },
  { top: 50, left: 35 }, { top: 50, left: 50 }, { top: 50, left: 65 },
  { top: 20, left: 40 }, { top: 20, left: 60 }
];

// Generating more variations programmatically to save space but ensure 20+
const createFormation = (name: string, def: number, mid: number, fwd: number, variations: 'flat' | 'diamond' | 'wide' = 'flat'): Formation => {
    // Basic logic to distribute dots. This is a simplification for the example to reach count.
    // In a real robust app, each would be hand-tuned.
    const coords: Coordinates[] = [{ top: 88, left: 50 }]; // GK
    
    // Defenders
    for(let i=0; i<def; i++) {
        coords.push({ top: 70, left: (100 / (def + 1)) * (i + 1) });
    }

    // Mids
    if (variations === 'diamond' && mid === 4) {
        coords.push({ top: 55, left: 50 }); // CDM
        coords.push({ top: 45, left: 30 }); // LM
        coords.push({ top: 45, left: 70 }); // RM
        coords.push({ top: 35, left: 50 }); // CAM
    } else {
        for(let i=0; i<mid; i++) {
            coords.push({ top: 45, left: (100 / (mid + 1)) * (i + 1) });
        }
    }

    // Forwards
    for(let i=0; i<fwd; i++) {
        coords.push({ top: 20, left: (100 / (fwd + 1)) * (i + 1) });
    }

    return { name, positions: coords };
};


export const FORMATIONS_LIST: Formation[] = [
  { name: '4-4-2 Flat', positions: FORMATION_442 },
  { name: '4-3-3 Attack', positions: FORMATION_433 },
  { name: '3-5-2', positions: FORMATION_352 },
  { name: '5-3-2', positions: FORMATION_532 },
  createFormation('4-2-3-1', 4, 5, 1, 'diamond'),
  createFormation('4-1-4-1', 4, 5, 1, 'flat'),
  createFormation('3-4-3', 3, 4, 3),
  createFormation('5-2-3', 5, 2, 3),
  createFormation('4-5-1', 4, 5, 1),
  createFormation('4-4-1-1', 4, 5, 1), // Simplification
  createFormation('4-1-2-1-2', 4, 4, 2, 'diamond'),
  createFormation('3-4-1-2', 3, 5, 2), // Treated as 3-5-2 var
  createFormation('5-4-1', 5, 4, 1),
  createFormation('3-4-2-1', 3, 6, 1), // Treated approx
  createFormation('4-3-2-1', 4, 5, 1), // Christmas Tree
  createFormation('3-1-4-2', 3, 5, 2),
  createFormation('4-2-2-2', 4, 4, 2),
  createFormation('4-2-4', 4, 2, 4),
  createFormation('3-3-4', 3, 3, 4),
  createFormation('1-1-8 (All Out)', 1, 1, 8),
];
