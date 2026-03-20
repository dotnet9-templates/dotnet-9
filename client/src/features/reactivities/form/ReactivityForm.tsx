import { Box, Button, Paper, Typography } from "@mui/material";
import { useReactivities } from "../../../lib/hooks/useReactivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  activitySchema,
  type ActivitySchema,
} from "../../../lib/schemas/reactivitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";

export default function ReactivityForm() {
  const { control, reset, handleSubmit } = useForm<ActivitySchema>({
    mode: "onTouched",
    resolver: zodResolver(activitySchema),
  });
  const { reactivityId } = useParams();
  const navigate = useNavigate();
  const {
    updateReactivity,
    createReactivity,
    reactivity,
    isLoadingReactivity,
  } = useReactivities(reactivityId);

  useEffect(() => {
    if (reactivity) {
      reset({
        ...reactivity,
        location: {
          city: reactivity.city,
          venue: reactivity.venue,
          latitude: reactivity.latitude,
          longitude: reactivity.longitude,
        },
      });
    }
  }, [reactivity, reset]);

  const onSubmit = async (data: ActivitySchema) => {
    const { location, ...rest } = data;
    const flattenedData = { ...rest, ...location };
    try {
      if (reactivity) {
        updateReactivity.mutate(
          { ...reactivity, ...flattenedData } as Reactivity,
          {
            onSuccess: () =>
              navigate(`/reactivities/${reactivity.reactivityId}`),
          },
        );
      } else {
        createReactivity.mutate(flattenedData as Reactivity, {
          onSuccess: (id) => {
            navigate(`/reactivities/${id}`);
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoadingReactivity) return <Typography>Loading . . .</Typography>;

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {reactivity ? "Edit Reactivity" : "Create Reactivity"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextInput label="Title" control={control} name="title" />
        <TextInput
          label="Description"
          name="description"
          control={control}
          multiline
          rows={3}
        />
        <Box display="flex" gap={3}>
          <SelectInput
            items={categoryOptions}
            label="Category"
            control={control}
            name="category"
          />
          <DateTimeInput label="Date" control={control} name="date" />
        </Box>
        <LocationInput
          control={control}
          label="Enter the location"
          name="location"
        />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button color="inherit">Cancel</Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            loading={updateReactivity.isPending || createReactivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
