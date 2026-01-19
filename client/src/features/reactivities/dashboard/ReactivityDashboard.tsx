import { Grid } from "@mui/material";
import ReactivityList from "./ReactivityList";

type Props = {
  reactivities: Reactivity[];
};

export default function ReactivityDashboard({ reactivities }: Props) {
  return (
    <Grid container>
      <Grid size={9}>
        <ReactivityList reactivities={reactivities} />
      </Grid>
    </Grid>
  );
}
