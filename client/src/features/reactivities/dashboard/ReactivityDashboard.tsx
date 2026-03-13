import { Grid } from "@mui/material";
import ReactivityList from "./ReactivityList";
import ReactivityFilters from "./ReactivityFilters";

export default function ReactivityDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid size={8}>
        <ReactivityList />
      </Grid>
      <Grid size={4}>
        <ReactivityFilters />
      </Grid>
    </Grid>
  );
}
