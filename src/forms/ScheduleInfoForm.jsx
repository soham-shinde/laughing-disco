import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  InputLabel,
  ListSubheader,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";

export default function ScheduleInfoForm() {

  const [formData, setFormData] = useState({
    title: "",
    selectedYears: [],
    subjectsPerYear: {},
    paperSlotsPerDay: '',
    paperTimeSlots: []
  });

  const handleYearSelect = (event) => {
    const { value, checked } = event.target;
    let selectedYears = [...formData.selectedYears];

    if (checked) {
      selectedYears.push(value);
    } else {
      selectedYears = selectedYears.filter((year) => year !== value);
    }

    const subjectsPerYear = { ...formData.subjectsPerYear };

    selectedYears.forEach((year) => {
      if (!(year in subjectsPerYear)) {
        subjectsPerYear[year] = "";
      }
    });

    // Remove subjects for years not selected
    for (const year in subjectsPerYear) {
      if (!selectedYears.includes(year)) {
        delete subjectsPerYear[year];
      }
    }

    setFormData({ ...formData, selectedYears, subjectsPerYear });
  };

  const handleSubjectsChange = (event, year) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      subjectsPerYear: {
        ...formData.subjectsPerYear,
        [year]: value,
      },
    });
  };
  const handlePaperSlotsChange = (event) => {
    const { value } = event.target;
    const paperTimeSlots = Array.from({ length: parseInt(value, 10) }, () => '');
    setFormData({ ...formData, paperSlotsPerDay: value, paperTimeSlots });
  };

  const handlePaperTimeSlotChange = (event, index) => {
    const { value } = event.target;
    const paperTimeSlots = [...formData.paperTimeSlots];
    paperTimeSlots[index] = value;
    setFormData({ ...formData, paperTimeSlots });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log(formData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Form</Typography>
          </Grid>
          <Grid item xs={6}>
            <FormLabel required>Title</FormLabel>
            <TextField
              fullWidth
              variant="standard"
              name="title"
              
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormLabel required>Year</FormLabel>
            <br />
            {["FE", "SE", "TE", "BE"].map((year) => (
              <FormControlLabel
                key={year}
                control={
                  <Checkbox
                    checked={formData.selectedYears.includes(year)}
                    onChange={handleYearSelect}
                    value={year}
                  />
                }
                label={year}
              />
            ))}
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ my: 1 }}>
          {formData.selectedYears.map((year) => (
            <Grid item xs={3} key={year}>
              <FormLabel required>{`Subjects for ${year}`}</FormLabel>
              <TextField
                fullWidth
                type="number"
                variant="standard"
                InputProps={{
                  inputProps: { min: 0 }
                }}
                name={`subjects_${year}`}
                value={formData.subjectsPerYear[year] || 0}
                onChange={(e) => handleSubjectsChange(e, year)}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} sx={{ my: 1 }}>

          <Grid item xs={3}>

            <FormLabel required>Paper Slots Per Day</FormLabel>
            <TextField
              fullWidth
              type="number"
              name="paperSlotsPerDay"
              InputProps={{
                inputProps: { min: 0 }
              }}
              variant="standard"
              value={formData.paperSlotsPerDay}
              onChange={handlePaperSlotsChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ my: 1 }}>

          {formData.paperTimeSlots.map((timeSlot, index) => (
            <Grid item container xs={6}   key={index} spacing={1}>
              <Grid item xs={10} textAlign={"start"} >
                <Typography required>Time Slot {index + 1}</Typography>
              </Grid>

              <Grid item xs={5}>
                <FormLabel required>Start</FormLabel>
                <TextField
                  fullWidth
                  type="time"
                  variant="standard"
                  name={`paperTimeSlot${index + 1}`}
                />
              </Grid> 

              <Grid item xs={5}>
                <FormLabel required>To</FormLabel>
                <TextField
                  fullWidth
                  type="time"
                  variant="standard"
                  name={`paperTimeSlot${index + 1}`}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>

       
      </form>
    </div >
  );
}
