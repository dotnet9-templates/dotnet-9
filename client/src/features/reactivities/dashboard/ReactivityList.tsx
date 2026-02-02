import { Box, Typography } from "@mui/material";
import ReactivityCard from "./ReactivityCard";
import { useReactivities } from "../../../lib/hooks/useReactivities";

export default function ReactivityList() {
  const { reactivities, isPending } = useReactivities(); // using the hook to get the reactivities. this is a custom hook.

  if (!reactivities || isPending) return <Typography>Loading...</Typography>;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {reactivities.map((reactivity) => (
        <ReactivityCard key={reactivity.reactivityId} reactivity={reactivity} />
      ))}
    </Box>
  );
}
