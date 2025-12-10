export enum PositionType {
  GK = 'GK',
  DEF = 'DEF',
  MID = 'MID',
  FWD = 'FWD'
}

export interface Player {
  id: string;
  name: string;
  position: string; // Specific position e.g., "CDM", "ST"
  type: PositionType; // General type for filtering
  rating: number; // 1-99
  photoUrl: string;
  stats?: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
  };
  details?: {
    age?: number;
    height?: string;
    weight?: string;
    nationality?: string;
    club?: string;
    value?: string;
  };
}

export interface Coach {
  id: string;
  name: string;
  photoUrl: string;
  tacticalStyle: string; // e.g., "Gegenpressing"
  nationality?: string;
}

export interface Coordinates {
  top: number; // Percentage 0-100
  left: number; // Percentage 0-100
}

export interface Formation {
  name: string;
  positions: Coordinates[]; // Array of 11 coordinates
}

export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  primaryColor: string;
  formationName: string;
  pitchId: string; // ID of the selected pitch texture
  coach?: Coach;
  players: (Player | null)[]; // Array of 11 slots
}

export interface Ball {
  id: string;
  name: string;
  imageUrl: string;
}

export interface UserProfile {
  username: string;
  avatarUrl: string;
  bannerUrl: string;
}

export interface MatchResult {
  scoreHome: number;
  scoreAway: number;
  summary: string;
  highlights: string[];
  mvp: string;
}
