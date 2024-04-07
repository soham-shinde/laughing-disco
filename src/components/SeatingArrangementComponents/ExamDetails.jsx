import React from "react";
import {
  TextField,
  Grid,
  Typography,
  FormLabel,
  
} from "@mui/material";

export default function ExamDetails({ formData, setFormData }) {
    const handleexamSlotsChange = (event) => {
        const { value } = event.target;
        const examTimeSlots = Array.from({ length: parseInt(value, 10) }, () => ({
          startTime: "",
          endTime: "",
        }));
        setFormData({ ...formData, examSlotsPerDay: value, examTimeSlots });
      };
      const handleTimeslotChange = (event, index, fieldName) => {
        const { value } = event.target;
       
        const updatedTimeSlots = [...formData.examTimeSlots];
        if (typeof updatedTimeSlots[index] !== 'object') {
          updatedTimeSlots[index] = { startTime: "", endTime: "" };
        }
        
        updatedTimeSlots[index][fieldName] = value;
        setFormData({
          ...formData,
          examTimeSlots: updatedTimeSlots,
        });
      };
      const handleExamStartDateChange = (event) => {
        const { value } = event.target;
        const startDate = new Date(value);
        const numExamDays = parseInt(formData.examdays);

        // Calculate all exam dates based on start date and number of exam days
        const updatedExamDates = Array.from({ length: numExamDays }, (_, index) => {
          if (index === 0) {
              return startDate.toLocaleDateString('en-GB'); // Use examStartDate value directly for index 0
          } else {
              const nextDate = new Date(startDate);
              nextDate.setDate(nextDate.getDate() + index);
              return nextDate.toLocaleDateString('en-GB'); // Format as "dd/mm/yyyy"
          }
      });

      setFormData({ ...formData, examStartDate:value,examDates: updatedExamDates });
      };
        
    return (
    <Grid container item xs={12} spacing={2} sx={{ my: 1 }}>    
    <Grid item xs={4}>
      <FormLabel required>Exam Slots Per Day</FormLabel>
      <TextField
        fullWidth
        type="number"
        name="examSlotsPerDay"
        InputProps={{
          inputProps: { min: 0 },
        }}
        variant="standard"
        value={formData.examSlotsPerDay}
        onChange={handleexamSlotsChange}
      />
    </Grid>
    <Grid item xs={4} >
      <FormLabel required>No of Exam Days</FormLabel>
      <TextField
        fullWidth
        type="number"
        name="examDays"
        InputProps={{
          inputProps: { min: 0 },
        }}
        variant="standard"
        value={formData.examdays}
        onChange={(e) =>
          setFormData({ ...formData, examdays: e.target.value })
        }
      />
    </Grid>
    <Grid item xs={4}>
    <FormLabel required>Exam Start Date</FormLabel>
    <TextField
      fullWidth
      type="date"
      variant="standard"
      name="examStartDate"
      value={formData.examStartDate}
      onChange={handleExamStartDateChange}
    />
  </Grid>
   
    <Grid container item spacing={4}>
      {formData.examTimeSlots.map((timeSlot, index) => (
        <Grid item container xs={6} key={index} spacing={4} sx={{ my: 1 }}>
          <Grid item xs={12} textAlign={"start"}>
            <Typography required>Time Slot {index + 1}</Typography>
          </Grid>
          <Grid item xs={6}>
            <FormLabel required>Start</FormLabel>
            <TextField
              fullWidth
              type="time"
              variant="standard"
              name={`examTimeSlot${index + 1}`}
              value={timeSlot.startTime || ""}
              onChange={(e) => handleTimeslotChange(e, index, "startTime")}
            />
          </Grid>
          <Grid item xs={6}>
            <FormLabel required>To</FormLabel>
            <TextField
              fullWidth
              type="time"
              variant="standard"
              name={`examTimeSlot${index + 1}`}
              value={timeSlot.endTime || ""}
              onChange={(e) => handleTimeslotChange(e, index, "endTime")}
            />
          </Grid>
        </Grid>
      ))}
    </Grid>
    </Grid>
  );
}
