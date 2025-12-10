import { Player, Team, Coach, Ball, UserProfile } from '../types';
import { DEFAULT_BANNER, DEFAULT_AVATAR } from '../constants';

const KEYS = {
  PLAYERS: 'nani99_players',
  TEAMS: 'nani99_teams',
  COACHES: 'nani99_coaches',
  BALLS: 'nani99_balls',
  PROFILE: 'nani99_profile',
  MATCHES: 'nani99_matches'
};

const safeGet = <T>(key: string, defaultVal: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    console.error(`Error reading ${key} from storage`, e);
    return defaultVal;
  }
};

const safeSet = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to storage`, e);
  }
};

export const storageService = {
  // Profile
  getProfile: (): UserProfile => safeGet(KEYS.PROFILE, { username: 'Manager', avatarUrl: DEFAULT_AVATAR, bannerUrl: DEFAULT_BANNER }),
  saveProfile: (p: UserProfile) => safeSet(KEYS.PROFILE, p),
  resetProfile: () => {
      localStorage.removeItem(KEYS.PROFILE);
      return { username: 'Nouveau Manager', avatarUrl: DEFAULT_AVATAR, bannerUrl: DEFAULT_BANNER };
  },

  // Players
  getPlayers: (): Player[] => safeGet(KEYS.PLAYERS, []),
  savePlayer: (player: Player) => {
    const players = storageService.getPlayers();
    const existing = players.findIndex(p => p.id === player.id);
    if (existing >= 0) {
      players[existing] = player;
    } else {
      players.push(player);
    }
    safeSet(KEYS.PLAYERS, players);
  },
  deletePlayer: (id: string) => {
    const players = storageService.getPlayers().filter(p => p.id !== id);
    safeSet(KEYS.PLAYERS, players);
  },

  // Coaches
  getCoaches: (): Coach[] => safeGet(KEYS.COACHES, []),
  saveCoach: (coach: Coach) => {
    const list = storageService.getCoaches();
    const idx = list.findIndex(c => c.id === coach.id);
    if (idx >= 0) list[idx] = coach; else list.push(coach);
    safeSet(KEYS.COACHES, list);
  },
  deleteCoach: (id: string) => {
      safeSet(KEYS.COACHES, storageService.getCoaches().filter(c => c.id !== id));
  },

  // Teams
  getTeams: (): Team[] => safeGet(KEYS.TEAMS, []),
  saveTeam: (team: Team) => {
    const teams = storageService.getTeams();
    const idx = teams.findIndex(t => t.id === team.id);
    if (idx >= 0) teams[idx] = team; else teams.push(team);
    safeSet(KEYS.TEAMS, teams);
  },
  deleteTeam: (id: string) => {
    safeSet(KEYS.TEAMS, storageService.getTeams().filter(t => t.id !== id));
  },

  // Balls
  getBalls: (): Ball[] => safeGet(KEYS.BALLS, []),
  saveBall: (ball: Ball) => {
    const list = storageService.getBalls();
    list.push(ball);
    safeSet(KEYS.BALLS, list);
  },

  // Export/Import
  exportAll: (): string => {
    return JSON.stringify({
      profile: storageService.getProfile(),
      players: storageService.getPlayers(),
      teams: storageService.getTeams(),
      coaches: storageService.getCoaches(),
      balls: storageService.getBalls()
    });
  },
  importAll: (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.profile) safeSet(KEYS.PROFILE, data.profile);
      if (data.players) safeSet(KEYS.PLAYERS, data.players);
      if (data.teams) safeSet(KEYS.TEAMS, data.teams);
      if (data.coaches) safeSet(KEYS.COACHES, data.coaches);
      if (data.balls) safeSet(KEYS.BALLS, data.balls);
      return true;
    } catch (e) {
      console.error("Import failed", e);
      return false;
    }
  }
};