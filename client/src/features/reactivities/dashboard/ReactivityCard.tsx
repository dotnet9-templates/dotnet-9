import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

type Props = {
  reactivity: Reactivity;
  selectReactivity: (id: string) => void;
};

export default function ReactivityCard({
  reactivity,
  selectReactivity,
}: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5">{reactivity.title}</Typography>
        <Typography
          sx={{ color: "text.secondary", mb: 1 }}
          color="text.secondary"
        >
          {reactivity.date}
        </Typography>
        <Typography variant="body2">{reactivity.description}</Typography>
        <Typography variant="subtitle1">
          {reactivity.city} / {reactivity.venue}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
      >
        <Chip label={reactivity.category} variant="outlined" />
        <Button
          onClick={() => selectReactivity(reactivity.reactivityId)}
          size="medium"
          variant="contained"
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
