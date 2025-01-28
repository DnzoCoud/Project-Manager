import { TeamDto } from "@/types/teams/team.dto";
import { create } from "zustand";

interface TeamState {
  teams: TeamDto[];
  setTeams: (teams: TeamDto[]) => void;
  addTeam: (team: TeamDto) => void;
}

export const useTeamStore = create<TeamState>()((set) => ({
  teams: [],
  setTeams: (teams) => set({ teams }),
  addTeam: (team) =>
    set((state) => ({
      teams: [...state.teams, team],
    })),
}));
