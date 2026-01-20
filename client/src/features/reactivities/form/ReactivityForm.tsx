import { Box, Button, Paper, TextField, Typography } from "@mui/material";

type Props = {
  reactivity?: Reactivity;
  closeForm: () => void;
};

export default function ReactivityForm({ reactivity, closeForm }: Props) {
  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create Reactivity
      </Typography>
      <Box component="form" display="flex" flexDirection="column" gap={3}>
        {/* using reactivity.title just to use it. */}
        <TextField label="Title" value={reactivity?.title} />
        <TextField label="Description" multiline rows={3} />
        <TextField label="Category" />
        <TextField label="Date" type="date" />
        <TextField label="City " />
        <TextField label="Venue" />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button onClick={closeForm} color="inherit">
            Cancel
          </Button>
          <Button color="success" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
