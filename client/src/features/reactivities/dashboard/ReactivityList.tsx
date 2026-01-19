import { Box } from "@mui/material";
import ReactivityCard from "./ReactivityCard";

type Props = {
  reactivities: Reactivity[];
  selectReactivity: (id: string) => void;
};

export default function ReactivityList({
  reactivities,
  selectReactivity,
}: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {reactivities.map((reactivity) => (
        <ReactivityCard
          key={reactivity.reactivityId}
          reactivity={reactivity}
          selectReactivity={selectReactivity}
        />
      ))}
    </Box>
  );
}
