import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useReactivities } from "../../../lib/hooks/useReactivities";

type Props = {
  selectedReactivity: Reactivity;
  cancelSelectReactivity: () => void;
  openForm: (id: string) => void; // need id to open the form for the partcular reactivity.
};

export default function ReactivityDetail({
  selectedReactivity,
  cancelSelectReactivity,
  openForm,
}: Props) {
  const { reactivities } = useReactivities();
  const reactivity = reactivities?.find(
    (x) => x.reactivityId === selectedReactivity.reactivityId,
  );

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
          onClick={() => openForm(reactivity.reactivityId)}
          color="primary"
        >
          Edit
        </Button>
        <Button onClick={cancelSelectReactivity} color="inherit">
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
