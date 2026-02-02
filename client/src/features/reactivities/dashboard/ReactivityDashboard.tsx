import { Grid } from "@mui/material";
import ReactivityList from "./ReactivityList";

export default function ReactivityDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ReactivityList />
      </Grid>
      <Grid size={5}> Reactivity Filters Go Here</Grid>
    </Grid>
  );
}
