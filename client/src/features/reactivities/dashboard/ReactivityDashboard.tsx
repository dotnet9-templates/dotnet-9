import { Grid } from "@mui/material";
import ReactivityList from "./ReactivityList";
import ReactivityDetail from "../details/ReactivityDetail";

type Props = {
  reactivities: Reactivity[];
  selectReactivity: (id: string) => void;
  cancelSelectReactivity: () => void;
  selectedReactivity?: Reactivity;
};

export default function ReactivityDashboard({
  reactivities,
  cancelSelectReactivity,
  selectReactivity,
  selectedReactivity,
}: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ReactivityList
          reactivities={reactivities}
          selectReactivity={selectReactivity}
        />
      </Grid>
      <Grid size={5}>
        {selectedReactivity && (
          <ReactivityDetail
            reactivity={selectedReactivity}
            cancelSelectReactivity={cancelSelectReactivity}
          />
        )}
      </Grid>
    </Grid>
  );
}
