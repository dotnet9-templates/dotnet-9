import { Grid } from "@mui/material";
import ReactivityList from "./ReactivityList";
import ReactivityDetail from "../details/ReactivityDetail";
import ReactivityForm from "../form/ReactivityForm";

type Props = {
  reactivities: Reactivity[];
  selectReactivity: (id: string) => void;
  cancelSelectReactivity: () => void;
  selectedReactivity?: Reactivity;
  openForm: (id: string) => void; // need id to open the form for the partcular reactivity.
  closeForm: () => void;
  editMode: boolean;
  deleteReactivity: (id: string) => void;
};

export default function ReactivityDashboard({
  reactivities,
  cancelSelectReactivity,
  selectReactivity,
  selectedReactivity,
  openForm,
  closeForm,
  editMode,
  deleteReactivity,
}: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ReactivityList
          reactivities={reactivities}
          selectReactivity={selectReactivity}
          deleteReactivity={deleteReactivity}
        />
      </Grid>
      <Grid size={5}>
        {selectedReactivity && !editMode && (
          <ReactivityDetail
            selectedReactivity={selectedReactivity}
            cancelSelectReactivity={cancelSelectReactivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ReactivityForm
            closeForm={closeForm}
            reactivity={selectedReactivity}
          />
        )}
      </Grid>
    </Grid>
  );
}
