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
};

export default function ReactivityDetail({ reactivity }: Props) {
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
        <Button color="primary">Edit</Button>
        <Button color="inherit">Cancel</Button>
      </CardActions>
    </Card>
  );
}
