import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { useReactivities } from "../../../lib/hooks/useReactivities";

export default function ReactivityDetail() {
  const navigate = useNavigate();
  const { reactivityId } = useParams(); // reactivityId is on the url from the route to get from the API. must match the reactivityId in the route.
  const { reactivity, isLoadingReactivity } = useReactivities(reactivityId);

  // Shows a loading state while fetching. React Query caches the result, so revisiting the same detail page loads faster.
  if (isLoadingReactivity) return <Typography>Loading . . . </Typography>;
  if (!reactivity) return <Typography>Reactivity not found . . . </Typography>;
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia
        component="img"
        src={`/images/categoryImages/${reactivity.category}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{reactivity.title}</Typography>
        <Typography variant="subtitle1" fontWeight="light">
          {reactivity.date}
        </Typography>
        <Typography variant="body1">{reactivity.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          to={`/manage/${reactivity.reactivityId}`}
          color="primary"
        >
          Edit
        </Button>
        <Button onClick={() => navigate("/reactivities")} color="inherit">
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
