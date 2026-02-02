import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useReactivities = () => {
  // curly braces are destructuring the data from the response.
  // this is an array of reactivities.
  const { data: reactivities, isPending } = useQuery({
    queryKey: ["reactivities"],
    queryFn: async () => {
      const response = await axios.get<Reactivity[]>(
        "https://localhost:5001/api/reactivity",
      );
      return response.data;
    },
  });

  return { reactivities, isPending };
};
