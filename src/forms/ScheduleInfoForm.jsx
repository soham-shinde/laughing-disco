import React from "react";
import {
  TextField,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  FormLabel,
  Button,
  Box
} from "@mui/material";

export default function ScheduleInfoForm({ activeStep,
  handleNext,
  handleBack,
  handleClose,
  formData,
  setFormData,
  steps }) {

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
    for (const year in subjectsPerYear) {
      if (!selectedYears.includes(year)) {
        delete subjectsPerYear[year];
      }
    }

    setFormData({ ...formData, selectedYears, subjectsPerYear });
  };

  const handleSubjectsChange = (event, year) => {
    const { value } = event.target;
    if (!isNaN(value)) {
      setFormData({
        ...formData,
        subjectsPerYear: {
          ...formData.subjectsPerYear,
          [year]: value,
        },
      });
    }
  };

  const handlePaperSlotsChange = (event) => {
    const { value } = event.target;
    const paperTimeSlots = Array.from(
      { length: parseInt(value, 10) },
      () => ""
    );
    if (!isNaN(value) && value < 4) {
      setFormData({ ...formData, paperSlotsPerDay: value, paperTimeSlots });
    }
  };

  const handleNoOfBlocks = (event) => {
    const { value } = event.target;
    if (!isNaN(value)) {
      setFormData({ ...formData, noOfBlocks: value });
    }
  };
  
  const handleTimeSlotChange = (event, index) => {
    const { name, value } = event.target;
    const updatedTimeSlots = [...formData.paperTimeSlots];
    updatedTimeSlots[index] = { ...updatedTimeSlots[index], [name]: value };
    setFormData({ ...formData, paperTimeSlots: updatedTimeSlots });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData.paperTimeSlots[0]['endTime']);
    console.log(formData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">Form</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <FormLabel required>Title</FormLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </Grid>
            </Grid>
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

        <Grid container spacing={1} sx={{ my: 1 }}>
          {formData.selectedYears.map((year) => (
            <Grid item xs={3} key={year}>
              <FormLabel required>{`Subjects for ${year}`}</FormLabel>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                size="small"
                name={`subjects_${year}`}
                value={formData.subjectsPerYear[year]}
                onChange={(e) => handleSubjectsChange(e, year)}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <FormLabel required>Paper Slots Per Day</FormLabel>
            <TextField
              fullWidth
              type="text"
              name="paperSlotsPerDay"
              variant="outlined"
              size="small"
              value={formData.paperSlotsPerDay}
              onChange={handlePaperSlotsChange}
            />
          </Grid>
          <Grid item xs={3}>
            <FormLabel required>No. Of Blocks</FormLabel>
            <TextField
              fullWidth
              type="text"
              name="paperSlotsPerDay"
              variant="outlined"
              size="small"
              value={formData.noOfBlocks} 
              onChange={handleNoOfBlocks}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ my: 1 }}>
          {formData.paperTimeSlots.map((timeSlot,index) => (
            <Grid item container xs={6} key={index} spacing={1}>
              <Grid item xs={10} textAlign={"start"}>
                <Typography required>Time Slot {index + 1}</Typography>
              </Grid>

              <Grid item xs={5}>
                <FormLabel required>Start</FormLabel>
                <TextField
                  fullWidth
                  type="time"
                  variant="outlined"
                  size="small"
                  name={`startTime`}
                  value={formData.paperTimeSlots[index].startTime}
                  onChange={(e) => handleTimeSlotChange(e, index)}
                />
              </Grid>

              <Grid item xs={5}>
                <FormLabel required>To</FormLabel>
                <TextField
                  fullWidth
                  type="time"
                  variant="outlined"
                  size="small"
                  name={`endTime`}
                  value={formData.paperTimeSlots[index].endTime}
                  onChange={(e) => handleTimeSlotChange(e, index)}
                />
              </Grid>
            </Grid>
          ))}
          <Button type="submit">adsf</Button>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
              Back
            </Button>
          )}
          <Button
            onClick={() => {
              handleClose();
            }}
            sx={{ mt: 3, ml: 1 }}
          >
            Close
          </Button>

          {activeStep !== steps && (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 3, ml: 1 }}
            >
              {activeStep === steps - 1 ? "Submit" : "Next"}
            </Button>
          )}
        </Box>
      </form>
    </div>
  );
}
