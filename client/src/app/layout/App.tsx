import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ReactivityDashboard from "../../features/reactivities/dashboard/ReactivityDashboard";

function App() {
  const [reactivities, setReactivities] = useState<Reactivity[]>([]);
  const [selectedReactivity, setSelectedReactivity] = useState<
    Reactivity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Reactivity[]>("https://localhost:5001/api/reactivity")
      .then((response) => setReactivities(response.data));
    // cleanup function
    return () => {};
  }, []);

  const handleSelectReactivity = (id: string) => {
    setSelectedReactivity(reactivities.find((x) => x.reactivityId === id));
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
    <Box sx={{ bgcolor: "#eeeeee" }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ReactivityDashboard
          reactivities={reactivities}
          selectReactivity={handleSelectReactivity}
          cancelSelectReactivity={handleCancelSelectReactivity}
          selectedReactivity={selectedReactivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}
        />
      </Container>
    </Box>
  );
}

export default App;
