import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useReactivities } from "../../../lib/hooks/useReactivities";
import ReactivityDetailsHeader from "./ReactivityDetailsHeader";
import ReactivityDetailsInfo from "./ReactivityDetailsInfo";
import ReactivityDetailsSidebar from "./ReactivityDetailsSidebar";
import ReactivityDetailsChat from "./ReactivityDetailsChat";

export default function ReactivityDetailPage() {
  const { reactivityId } = useParams(); // reactivityId is on the url from the route to get from the API. must match the reactivityId in the route.
  const { reactivity, isLoadingReactivity } = useReactivities(reactivityId);

  // Shows a loading state while fetching. React Query caches the result, so revisiting the same detail page loads faster.
  if (isLoadingReactivity) return <Typography>Loading . . . </Typography>;
  if (!reactivity) return <Typography>Reactivity not found . . . </Typography>;
  return (
    <Grid container spacing={3}>
      <Grid size={8}>
        <ReactivityDetailsHeader reactivity={reactivity} />
        <ReactivityDetailsInfo reactivity={reactivity} />
        <ReactivityDetailsChat />
      </Grid>
      <Grid size={4}>
        <ReactivityDetailsSidebar />
      </Grid>
    </Grid>
  );
}
