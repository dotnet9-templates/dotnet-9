// Custom hook for fetching and mutating reactivities using React Query.

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";

export const useReactivities = (reactivityId?: string) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const currentUser = queryClient.getQueryData(["user"]);

  const { data: reactivities, isPending } = useQuery({
    queryKey: ["reactivities"],
    queryFn: async () => {
      const response = await agent.get<Reactivity[]>("/reactivity");
      return response.data;
    },
    enabled:
      !reactivityId && location.pathname === "/reactivities" && !!currentUser,
  });

  const { data: reactivity, isLoading: isLoadingReactivity } = useQuery({
    queryKey: ["reactivity", reactivityId],
    queryFn: async () => {
      const response = await agent.get<Reactivity>(
        `/reactivity/${reactivityId}`,
      );
      return response.data;
    },
    enabled: !!reactivityId && !!currentUser,
  });

  const updateReactivity = useMutation({
    mutationFn: async (reactivity: Reactivity) => {
      await agent.put("/reactivity", reactivity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reactivities"] });
    },
  });

  const createReactivity = useMutation({
    mutationFn: async (reactivity: Reactivity) => {
      const response = await agent.post("/reactivity", reactivity);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reactivities"] });
    },
  });

  const deleteReactivity = useMutation({
    mutationFn: async (reactivityId: string) => {
      await agent.delete(`/reactivity/${reactivityId}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reactivities"] });
    },
  });

  return {
    reactivities,
    isPending,
    updateReactivity,
    createReactivity,
    deleteReactivity,
    reactivity,
    isLoadingReactivity,
  };
};
