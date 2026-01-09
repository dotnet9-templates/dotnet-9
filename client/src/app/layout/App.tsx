import {
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Typography,
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
      <Typography variant="h3">Dotnet-9</Typography>
      <List>
        {reactivities.map((reactivity) => (
          <ListItem key={reactivity.reactivityId}>
            <ListItemText>{reactivity.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
