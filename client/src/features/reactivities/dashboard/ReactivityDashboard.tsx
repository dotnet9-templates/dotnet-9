import { Grid } from "@mui/material";
import ReactivityList from "./ReactivityList";
import ReactivityDetail from "../details/ReactivityDetail";

type Props = {
  reactivities: Reactivity[];
};

export default function ReactivityDashboard({ reactivities }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ReactivityList reactivities={reactivities} />
      </Grid>
      <Grid size={5}>
        {reactivities[0] && <ReactivityDetail reactivity={reactivities[0]} />}
      </Grid>
    </Grid>
  );
}
