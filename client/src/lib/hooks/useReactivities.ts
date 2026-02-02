import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";

export const useReactivities = () => {
  // curly braces are destructuring the data from the response.
  // this is an array of reactivities.
  const { data: reactivities, isPending } = useQuery({
    queryKey: ["reactivities"],
    queryFn: async () => {
      const response = await agent.get<Reactivity[]>("reactivity");
      return response.data;
    },
  });

  return { reactivities, isPending };
};
