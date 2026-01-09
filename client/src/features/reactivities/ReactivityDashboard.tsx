import { Grid, List, ListItem, ListItemText } from "@mui/material";

type Props = {
  reactivities: Reactivity[];
};

export default function ReactivityDashboard(props: Props) {
  return (
    <Grid container>
      <Grid size={9}>
        <List>
          {props.reactivities.map((reactivity) => (
            <ListItem key={reactivity.reactivityId}>
              <ListItemText>{reactivity.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
