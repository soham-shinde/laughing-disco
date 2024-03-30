import React, { useEffect, useState } from "react";
import {
    Paper,
    TextField,
    TableContainer,
    Checkbox,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box,
    Button,
    Typography,
} from "@mui/material";
import { sendBasicInfo } from "../api/schedule.api";
import { fetchAllTeachers } from "../api/teacher.api";

// const teachers = ["Teacher 1", "Teacher 2", "Teacher 3", "Teacher 4", "Teacher 5"];

export default function ScheduleReviewSection({
    activeStep,
    handleNext,
    handleBack,
    handleClose,
    steps,
    formData,
    selectedTeachers,
}) {
    const noOfDays = Math.max(...Object.values(formData.subjectsPerYear));
    const teachers = selectedTeachers.filter((teacher) => teacher.selected);

    const [yearSchedule, setYearSchedule] = useState();
    const [teacherData, setTeacherData] = useState(
        Array(teachers.length)
            .fill()
            .map(() => Array(noOfDays).fill(""))
    );

    const [teacherNames, setTeacherNames] = useState({});

    useEffect(() => {
        const newData = sendBasicInfo(formData);
        const techData = fetchAllTeachers();
        newData.then((data) => {
            let year = [];
            if (data) {
                console.log(data);
                formData.selectedYears.map((d) => year.push(data[d]));
                setYearSchedule(year);
            }
            else {
                alert(`Error`);
            }
        });
        techData.then((data) => {
            setTeacherNames(data);
        });
    }, [formData]);

    const handleInputChange = (e, rowIndex, colIndex) => {
        const newData = [...teacherData];
        console.log(newData);
        newData[rowIndex][colIndex] = e.target.checked;
        setTeacherData(newData);
    };

    return (
        <div>
            <Typography variant="h5">Review Details</Typography>
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
            {yearSchedule &&
                yearSchedule.map((year, index) => (
                    <>
                        <Typography> {formData.selectedYears[index]} </Typography>
                        <TableContainer component={Paper} sx={{ m: 2 }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"></TableCell>
                                        {[...Array(Math.ceil(year.totalSlots / formData.paperSlotsPerDay)).keys()].map((index) => (
                                            <TableCell
                                                key={index}
                                                align="center"
                                                colSpan={formData.paperSlotsPerDay}
                                                width={50}
                                            >
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    defaultValue={"Day " + (index + 1)}
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell width={150}></TableCell>
                                        {[...Array(Math.ceil(year.totalSlots)).keys()].map((index) => (
                                            <TableCell key={index} width={70}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    defaultValue={
                                                        "Block " +
                                                        ((index % formData.paperSlotsPerDay) + 1)
                                                    }
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell width={150}></TableCell>
                                        {[...Array(year.totalSlots).keys()].map((index) => (
                                            <TableCell key={index} width={70}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    defaultValue={"Subject " + (index + 1)}
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(year.schedule).map((teacherIndex) => (
                                        <TableRow
                                            key={teacherIndex}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >

                                            <TableCell component="th" scope="row" width={150}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    disabled
                                                    defaultValue={teacherNames[teacherIndex] != null ? teacherNames[teacherIndex].name : ''}
                                                />
                                            </TableCell>
                                            {year.schedule[teacherIndex].map((isAvailable, index) => (
                                                <TableCell key={index} align="center">
                                                    <Checkbox
                                                        checked={isAvailable}
                                                        onChange={(e) =>
                                                            handleInputChange(e, teacherIndex, index)
                                                        }
                                                    />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                ))}

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
}
