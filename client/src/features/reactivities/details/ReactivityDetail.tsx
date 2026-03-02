import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router";

export default function ReactivityDetail() {
  const navigate = useNavigate();
  const reactivity = {} as Reactivity;

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
          to={`/reactivities/${reactivity.reactivityId}`}
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
