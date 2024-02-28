import React, { useState } from "react";
import { Paper, TextField,TableContainer,Table,TableHead ,TableRow,TableCell,TableBody,Box,Button,Typography} from "@mui/material";

// const teachers = ["Teacher 1", "Teacher 2", "Teacher 3", "Teacher 4", "Teacher 5"];

const MatrixStructure = ({ activeStep,
  handleNext,
  handleBack,
  handleClose,
  steps,
  formData,
  selectedTeachers, }) => {
    const noOfDays = Math.max(...Object.values(formData.subjectsPerYear)) 
    const noOfBlocks = noOfDays *formData.paperSlotsPerDay;
    const teachers = selectedTeachers.filter((teacher) =>teacher.selected)
    const [teacherData, setTeacherData] = useState(Array(teachers.length).fill().map(() => Array(noOfDays).fill("")));
  const handleInputChange = (e, rowIndex, colIndex) => {
    const newData = [...teacherData]; // Copy the existing teacherData array
    console.log(newData);
    newData[rowIndex][colIndex] = e.target.value;
    setTeacherData(newData);
  };

  return (
    
    <div>
       <Typography variant="h5">Review Details</Typography>
                <Typography variant="subtitle1">Basic Details:</Typography>
                <Typography variant="body1">Title: {formData.title}</Typography>
                <Typography variant="body1">
                    Selected Years: {formData.selectedYears.join(", ")}
                </Typography>
                {Object.entries(formData.subjectsPerYear).map(([year, subjects]) => (
                    <Typography key={year} variant="body1">
                        Subjects for {year}: {subjects}
                    </Typography>
                ))}
                <Typography variant="body1">
                    Paper Slots Per Day: {formData.paperSlotsPerDay}
                </Typography>
                {formData.paperTimeSlots.map((timeSlot, index) => (
                    <Typography key={index} variant="body1">
                        Time Slot {index + 1}: {timeSlot.startTime}
                    </Typography>
                ))}
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center"></TableCell>
          {[...Array(noOfDays).keys()].map((index) => (
              <TableCell key={index} align="center"  colSpan={formData.paperSlotsPerDay} width={50}>
                <TextField
                  fullWidth 
                  variant="outlined"
                  size="small"
                  defaultValue={"Day "+(index+1)}
                />
              </TableCell>
            ))}
        </TableRow>
        <TableRow>
          <TableCell width={150}></TableCell>
          {[...Array(noOfBlocks).keys()].map((index) => (
              <TableCell key={index} width={70}>
                <TextField
                  fullWidth 
                  variant="outlined"
                  size="small"
                  defaultValue={"Block "+((index)%formData.paperSlotsPerDay+1)}
                />
              </TableCell>
            ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {teachers.map((teacher, teacherIndex) => (
          <TableRow
            key={teacherIndex}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row" width={150}>
              
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  defaultValue={teacher.name}
                  disabled
                />
            </TableCell>  
            {[...Array(noOfBlocks).keys()].map((dayIndex) => (
                <TableCell component="th" scope="row"   key={dayIndex } width={50}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={teacherData[teacherIndex][dayIndex]}
                    onChange={(e) => handleInputChange(e, teacherIndex, dayIndex)} 
                  />
                </TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
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
  </div>

  );
};

export default MatrixStructure;
