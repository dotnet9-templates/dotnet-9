import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react";
import NavBar from "./NavBar";
import ReactivityDashboard from "../../features/reactivities/dashboard/ReactivityDashboard";
import { useReactivities } from "../../lib/hooks/useReactivities";

function App() {
  const [selectedReactivity, setSelectedReactivity] = useState<
    Reactivity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const { reactivities, isPending } = useReactivities(); // using the hook to get the reactivities. this is a custom hook.

  const handleSelectReactivity = (id: string) => {
    setSelectedReactivity(reactivities!.find((x) => x.reactivityId === id));
  };

  const handleCancelSelectReactivity = () => {
    setSelectedReactivity(undefined);
  };

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectReactivity(id);
    else handleCancelSelectReactivity();
    setEditMode(true);
  };

  const handleCloseForm = () => {
    setEditMode(false);
  };

  return (
    // minHeight: "100vh" is to make sure the box is at least the height of the viewport.
    <Box sx={{ bgcolor: "#eeeeee", minHeight: "100vh" }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {!reactivities || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
          <ReactivityDashboard
            reactivities={reactivities}
            selectReactivity={handleSelectReactivity}
            cancelSelectReactivity={handleCancelSelectReactivity}
            selectedReactivity={selectedReactivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleCloseForm}
          />
        )}
      </Container>
    </Box>
  );
}

export default App;
