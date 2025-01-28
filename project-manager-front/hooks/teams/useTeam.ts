import { TeamService } from "@/services/teams/teams.service";
import { useTeamStore } from "@/stores/team.store";
import { ApiErrorResponse } from "@/types/api-response";
import { CreateTeamDto } from "@/types/teams/create-team.dto";
import { useState } from "react";
import { toast } from "sonner";

export const useTeam = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiErrorResponse | null>(null);
  const teamService = new TeamService();
  const { setTeams, addTeam } = useTeamStore();

  const getAllTeams = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await teamService.getAll();
      if (data) {
        setTeams(data.teams);
        return true;
      }
    } catch (error: any) {
      setError(error);
      toast.error(error.error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const storeTeam = async (createTeamDto: CreateTeamDto) => {
    setLoading(true);
    setError(null);
    try {
      const data = await teamService.store(createTeamDto);
      if (data) {
        addTeam(data.team);
        return true;
      }
    } catch (error: any) {
      setError(error);
      toast.error(error.error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllTeams,
    loading,
    error,
    storeTeam,
  };
};
