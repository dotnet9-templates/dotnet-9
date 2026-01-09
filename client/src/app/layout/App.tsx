import {
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";

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
        <List>
          {reactivities.map((reactivity) => (
            <ListItem key={reactivity.reactivityId}>
              <ListItemText>{reactivity.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}

export default App;
