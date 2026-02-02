import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useReactivities = () => {
  const queryClient = useQueryClient();
  // curly braces are destructuring the data from the response.
  // this is an array of reactivities.
  const { data: reactivities, isPending } = useQuery({
    queryKey: ["reactivities"],
    queryFn: async () => {
      const response = await agent.get<Reactivity[]>("/reactivity");
      return response.data;
    },
  });

  const updateReactivity = useMutation({
    mutationFn: async (reactivity: Reactivity) => {
      await agent.put("/reactivity", reactivity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reactivities"] }); // query key is declared in the useQuery hook.
    },
  });

  const createReactivity = useMutation({
    mutationFn: async (reactivity: Reactivity) => {
      await agent.post("/reactivity", reactivity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reactivities"] });
    },
  });

  return { reactivities, isPending, updateReactivity, createReactivity };
};
