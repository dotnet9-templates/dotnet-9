import { Box, Container, CssBaseline, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import NavBar from "./NavBar";
import ReactivityDashboard from "../../features/reactivities/dashboard/ReactivityDashboard";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [selectedReactivity, setSelectedReactivity] = useState<
    Reactivity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  // curly braces are destructuring the data from the response.
  const { data: reactivities, isPending } = useQuery({
    queryKey: ["reactivities"],
    queryFn: async () => {
      const response = await axios.get<Reactivity[]>(
        "https://localhost:5001/api/reactivity",
      );
      return response.data;
    },
  });

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

  const handleSubmitForm = (reactivity: Reactivity) => {
    // if (reactivity.reactivityId) {
    //   setReactivities(
    //     reactivities.map((x) =>
    //       x.reactivityId === reactivity.reactivityId ? reactivity : x,
    //     ),
    //   );
    // } else {
    //   const newReactivity = {
    //     ...reactivity,
    //     id: reactivities.length.toString(),
    //   };
    //   setSelectedReactivity(newReactivity); // this is to show the new reactivity in the detail view.
    //   setReactivities([...reactivities, newReactivity]);
    // }
    console.log(reactivity); //to remove the warning about the reactivity being undefined.
    setEditMode(false);
  };

  const handleDeleteReactivity = (id: string) => {
    console.log(id);
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
            submitForm={handleSubmitForm}
            deleteReactivity={handleDeleteReactivity}
          />
        )}
      </Container>
    </Box>
  );
}

export default App;
