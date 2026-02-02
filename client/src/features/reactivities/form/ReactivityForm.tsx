import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import { useReactivities } from "../../../lib/hooks/useReactivities";

type Props = {
  reactivity?: Reactivity;
  closeForm: () => void;
};

export default function ReactivityForm({ reactivity, closeForm }: Props) {
  const { updateReactivity } = useReactivities();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent the default form submission behavior in the browser.
    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    if (reactivity) {
      data.reactivityId = reactivity.reactivityId;
      await updateReactivity.mutateAsync(data as unknown as Reactivity);
      closeForm();
    }
  };

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create Reactivity
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        {/* using reactivity.title just to use it. uncontrolled input. */}
        <TextField
          name="title"
          label="Title"
          defaultValue={reactivity?.title}
        />
        <TextField
          name="description"
          label="Description"
          defaultValue={reactivity?.description}
          multiline
          rows={3}
        />
        <TextField
          name="category"
          label="Category"
          defaultValue={reactivity?.category}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          defaultValue={
            reactivity?.date
              ? new Date(reactivity.date).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          } // this is to format the date to the ISO string format and automatically set the date in the input field.
        />
        <TextField name="city" label="City" defaultValue={reactivity?.city} />
        <TextField
          name="venue"
          label="Venue"
          defaultValue={reactivity?.venue}
        />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button onClick={closeForm} color="inherit">
            Cancel
          </Button>
          {/* Material UI v7 does come with a loading property. You can use this instead of disabled here to display a spinner on the button. */}
          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={updateReactivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
