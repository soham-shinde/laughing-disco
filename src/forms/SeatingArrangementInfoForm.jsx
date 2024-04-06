import React from "react";
import {
  TextField,
  Grid,
  Typography,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  Select,
 
} from "@mui/material";

export default function SeatingArrangementInfo({ formData, setFormData }) {
  
  const getCurrentYear = () => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  };

  const generateAcademicYearOptions = () => {
    const currentYear = getCurrentYear();
    return [
      `${currentYear - 1}-${currentYear}`,
      `${currentYear}-${currentYear + 1}`,
    ];
  };

  const handleDepartmentChange = (event) => {
    const { value } = event.target;
    let selectedYears = [];
    if (value === "FE") {
      selectedYears = ["FE"];
    }
    setFormData({ ...formData, selectedDepartment: value, selectedYears });
  };
  const handleAcademicYearChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, selectedAcademicYear: value });
  };
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
  
  const handleYearChange = (event) => {
    const { value, checked } = event.target;
    let selectedYears = [...formData.selectedYears];

    if (checked) {
      selectedYears.push(value);
    } else {
      selectedYears = selectedYears.filter((year) => year !== value);
    }

    const divisionsPerYear = { ...formData.divisionsPerYear };

    selectedYears.forEach((year) => {
      if (!(year in divisionsPerYear)) {
        divisionsPerYear[year] = [];
      }
    });

    for (const year in divisionsPerYear) {
      if (!selectedYears.includes(year)) {
        delete divisionsPerYear[year];
      }
    }

    setFormData({ ...formData, selectedYears, divisionsPerYear });
  };

  const handleDivisionsChange = (event, year) => {
    const { value } = event.target;
    const divisionsPerYear = { ...formData.divisionsPerYear };
    divisionsPerYear[year] = Array.from(
      { length: parseInt(value, 10) || 0 },
      () => ({ className: "", startRollNo: "", endRollNo: "" })
    );
    setFormData({ ...formData, divisionsPerYear });
  };

  const handleDivisionInputChange = (event, year, index, fieldName) => {
    const { value } = event.target;
    const updatedDivisions = [...formData.divisionsPerYear[year]];
    updatedDivisions[index][fieldName] = value;
    setFormData({
      ...formData,
      divisionsPerYear: {
        ...formData.divisionsPerYear,
        [year]: updatedDivisions,
      },
    });
  };

  const handleExamStartDateChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, examStartDate: value });
  };

  const handleClassroomCountChange = (event) => {
    const { value } = event.target;
    const classroomData = Array.from({ length: parseInt(value, 10) || 0 }, () => ({
      name: "",
      capacity: "",
    }));
    setFormData({ ...formData, classroomCount: value, classroomData });
  };

  const handleClassroomChange = (event, index, fieldName) => {
    const { value } = event.target;
    const updatedClassrooms = [...formData.classroomData];
    updatedClassrooms[index][fieldName] = value;
    setFormData({ ...formData, classroomData: updatedClassrooms });
  };
  return (
    <div>
      
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Form</Typography>
          </Grid>
          <Grid container item xs={12} spacing={4} >
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
          <Grid item xs={3} >
            <FormControl required sx={{ width: "100%"}}>
              <FormLabel required>Academic Year</FormLabel>
              <Select
                value={formData.selectedAcademicYear}
                onChange={handleAcademicYearChange}
                label="Academic Year *"
                id="academic-year-select"
                variant="standard"
              >
                {generateAcademicYearOptions().map((year, index) => (
                  <MenuItem key={index} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
              
            </FormControl>
          </Grid>
          
          <Grid item xs={3}>
            <FormControl required sx={{ width: "100%" }}>
              <FormLabel required>Department</FormLabel>
              <Select
                value={formData.selectedDepartment}
                onChange={handleDepartmentChange}
                label="Department *"
                id="department-select"
                variant="standard"
              >
                {["FE", "IT", "CE", "ENTC"].map((department, index) => (
                  <MenuItem key={index} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </Select>
              
            </FormControl>
          </Grid>
          </Grid>
          
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

          <Grid item xs={6} spacing={2} sx={{ my: 1 }}>
            <FormLabel required>Number of Classrooms</FormLabel>
            <TextField
              fullWidth
              type="number"
              variant="standard"
              name="classroomCount"
              value={formData.classroomCount}
              onChange={handleClassroomCountChange}
            />
          </Grid>
          <Grid container item spacing={4}>
          {formData.classroomData.map((classroom, index) => (
          <Grid container item xs={6} key={index} spacing={2} sx={{ my: 1 }}>
             <Grid item xs={12} textAlign={"start"}>
                  <Typography required>Classroom {index + 1}</Typography>
                </Grid>
            <Grid item xs={6}>
              <FormLabel required>{`Name`}</FormLabel>
              <TextField
                fullWidth
                value={classroom.name}
                onChange={(e) => handleClassroomChange(e, index, "name")}
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel required>{`Capacity`}</FormLabel>
              <TextField
                fullWidth
                type="number"
                value={classroom.capacity}
                onChange={(e) => handleClassroomChange(e, index, "capacity")}
                variant="standard"
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
          <Grid item xs={6} sx={{my:1}}>
            <FormLabel required>Year</FormLabel>
            <br />
            {["FE", "SE", "TE", "BE"].map((year) => (
              <FormControlLabel
                key={year}
                control={
                  <Checkbox
                    checked={formData.selectedYears.includes(year)}
                    onChange={handleYearChange}
                    value={year}
                    disabled={
                      formData.selectedDepartment === "FE" ||
                      (formData.selectedDepartment !== "FE" && year === "FE")
                    }
                  />
                }
                label={year}
              />
            ))}
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ my: 1 }}>
          {formData.selectedYears.map((year) => (
            <Grid item xs={6} key={year}>
              <FormLabel required>{`No. of Divisions of ${year}`}</FormLabel>
              <TextField
                fullWidth
                type="number"
                variant="standard"
                InputProps={{
                  inputProps: { min: 0 },
                }}
                name={`divisions_${year}`}
                value={formData.divisionsPerYear[year]?.length || 0}
                onChange={(e) => handleDivisionsChange(e, year)}
              />
              {formData.divisionsPerYear[year]?.map((division, index) => (
                <Grid container spacing={4} key={index} sx={{ my: 1 }}>
                  <Grid item xs={12} textAlign={"start"}>
                    <Typography required>Division {index + 1}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <FormLabel required>Class Name</FormLabel>
                    <TextField
                      fullWidth
                      value={division.className || ""}
                      onChange={(e) =>
                        handleDivisionInputChange(e, year, index, "className")
                      }
                      variant="standard"
                      type="string"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormLabel required>Start Roll No</FormLabel>
                    <TextField
                      fullWidth
                      value={division.startRollNo || ""}
                      onChange={(e) =>
                        handleDivisionInputChange(e, year, index, "startRollNo")
                      }
                      variant="standard"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormLabel required>End Roll No</FormLabel>
                    <TextField
                      fullWidth
                      value={division.endRollNo || ""}
                      onChange={(e) =>
                        handleDivisionInputChange(e, year, index, "endRollNo")
                      }
                      variant="standard"
                      type="number"
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
       
    </div>
  );
}
