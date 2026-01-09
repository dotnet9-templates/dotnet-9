import { Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ReactivityDashboard from "../../features/reactivities/ReactivityDashboard";

function App() {
  const [reactivities, setReactivities] = useState<Reactivity[]>([]);

  useEffect(() => {
    axios
      .get<Reactivity[]>("https://localhost:5001/api/reactivity")
      .then((response) => setReactivities(response.data));
    // cleanup function
    return () => {};
  }, []);

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ReactivityDashboard reactivities={reactivities} />
      </Container>
    </>
  );
}

export default App;
