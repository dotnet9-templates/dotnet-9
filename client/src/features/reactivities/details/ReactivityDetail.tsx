import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type Props = {
  reactivity: Reactivity;
  cancelSelectReactivity: () => void;
  openForm: (id: string) => void; // need id to open the form for the partcular reactivity.
};

export default function ReactivityDetail({
  reactivity,
  cancelSelectReactivity,
  openForm,
}: Props) {
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
