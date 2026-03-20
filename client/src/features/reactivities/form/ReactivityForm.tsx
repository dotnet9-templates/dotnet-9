import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useReactivities } from "../../../lib/hooks/useReactivities";
import { useParams } from "react-router";
import { useForm, type FieldValues } from "react-hook-form";
import { useEffect } from "react";

export default function ReactivityForm() {
  const { register, reset, handleSubmit } = useForm();
  const { reactivityId } = useParams(); // this will load the data from the API for the individual reactivity.
  const {
    updateReactivity,
    createReactivity,
    reactivity,
    isLoadingReactivity,
  } = useReactivities(reactivityId);

  useEffect(() => {
    if (reactivity) {
      reset(reactivity);
    }
  }, [reactivity, reset]);

  const OnSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  if (isLoadingReactivity) return <Typography>Loading . . . </Typography>;

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {/* Using reactivityId directly could technically work too (since it's
        undefined on create and a string on edit), but reactivity is the better
        check because it confirms the data actually loaded — which is also why
        there's the isLoadingReactivity guard on line 36 before rendering the
        form. */}
        {reactivity ? "Edit Reactivity" : "Create Reactivity"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(OnSubmit)}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        {/* using reactivity.title just to use it. uncontrolled input. */}
        <TextField
          {...register("title")}
          label="Title"
          defaultValue={reactivity?.title}
        />
        <TextField
          {...register("description")}
          label="Description"
          defaultValue={reactivity?.description}
          multiline
          rows={3}
        />
        <TextField
          {...register("category")}
          label="Category"
          defaultValue={reactivity?.category}
        />
        <TextField
          {...register("date")}
          label="Date"
          type="date"
          defaultValue={
            reactivity?.date
              ? new Date(reactivity.date).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          } // this is to format the date to the ISO string format and automatically set the date in the input field.
        />
        <TextField
          {...register("city")}
          label="City"
          defaultValue={reactivity?.city}
        />
        <TextField
          {...register("venue")}
          label="Venue"
          defaultValue={reactivity?.venue}
        />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button color="inherit">Cancel</Button>
          {/* Material UI v7 does come with a loading property. You can use this instead of disabled here to display a spinner on the button. */}
          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={updateReactivity.isPending || createReactivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
