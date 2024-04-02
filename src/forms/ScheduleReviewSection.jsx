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
    Typography, Grid
} from "@mui/material";
import { sendBasicInfo } from "../api/schedule.api";
import { fetchAllTeachers } from "../api/teacher.api";
import html2pdf from "html2pdf.js";

export default function ScheduleReviewSection({
    activeStep,
    handleNext,
    handleBack,
    handleClose,
    steps,
    formData,
    selectedTeachers,
}) {
    const [yearSchedule, setYearSchedule] = useState();
    const [teacherNames, setTeacherNames] = useState({});


    useEffect(() => {
        const newData = sendBasicInfo(formData);
        const techData = fetchAllTeachers();
        newData.then((data) => {
            let year = [];
            if (data) {
                console.log(data);
                formData.selectedYears.map((d, index) => {
                    console.log(formData.subjectsPerYear[d]);
                    data && (data[d].headers = {
                        days: [
                            ...Array(
                                Math.ceil(formData.subjectsPerYear[d] / formData.paperSlotsPerDay)
                            ).keys()
                        ].map((k) => `Day ${k + 1}`),
                        subjects: [
                            ...Array(Math.ceil(formData.subjectsPerYear[d])).keys()
                        ].map((k) => `Subject ${k + 1}`),
                        blocks: [...Array(Math.ceil(data[d].totalSlots)).keys()].map(
                            (k) => `Block ${(k % formData.paperSlotsPerDay) + 1}`
                        ),
                    });
                    console.log(data[d]);
                    return year.push(data[d]);
                });
                setYearSchedule(year);
            } else {
                alert(`Error`);
            }
        });
        techData.then((data) => {
            setTeacherNames(data);
        });
    }, [formData]);

    const handleInputChange = (e, yearIndex, field, index) => {
        const oldData = [...yearSchedule];
        oldData[yearIndex].headers[field][index] = e.target.value;
        setYearSchedule(oldData);
        console.log(yearSchedule);


    };
    const handleInputChange1 = (e,year,yearIndex,teacherIndex,index) => {

        const oldData = [...yearSchedule];
        oldData[yearIndex].schedule[teacherIndex][index] = e.target.checked;
        setYearSchedule(oldData);
        console.log(yearSchedule);

    };
    function handleSubmit(params) {
        console.log("data");

        let data = {...formData, yearSchedule: [...yearSchedule]};
        generatePdf(data)
        console.log(data);
    }
    function generatePdf(scheduleData) {

        const element = document.createElement("div");
        element.className = "container"
        scheduleData.yearSchedule.forEach(function (yearScheduleData, yearIndex) {
            const head  = document.createElement('div')
            head.innerHTML =`<h1> ${scheduleData.selectedYears[yearIndex]}</h1>`
            element.appendChild(head);

            const table = document.createElement("table");
            const tableHeader = document.createElement("thead");
            const tableBody = document.createElement("tbody");
            let dayRow = `<tr> <td rowspan=3 style="
            text-align: center;
        ">Teache Names</td>${yearScheduleData.headers.days.reduce((accumulator, currentValue) => accumulator + `<td  colspan=${Math.ceil(Math.ceil(scheduleData.noOfBlocksPerYear[scheduleData.selectedYears[yearIndex]]) * scheduleData.paperSlotsPerDay)}> ${currentValue} </td>`, "")}</tr>`
            let subjectRow = `<tr> ${yearScheduleData.headers.subjects.reduce((accumulator, currentValue) => accumulator + `<td  colspan=${Math.ceil(scheduleData.noOfBlocksPerYear[scheduleData.selectedYears[yearIndex]])}> ${currentValue} </td>`, "")}</tr>`
            let blocksRow = `<tr> ${yearScheduleData.headers.blocks.reduce((accumulator, currentValue) => accumulator + `<td  > ${currentValue} </td>`, "")}</tr>`

            let bodyRow = "";
            Object.keys(yearScheduleData.schedule).forEach(function (index) {
                bodyRow += `<tr><td>${teacherNames.find((teacher) => teacher.teacherId == index).name}</td>`
                bodyRow += yearScheduleData.schedule[index].reduce((accumulator, currentValue) => {
                    if (currentValue) {
                        return accumulator + "<td> 1 </td>";

                    }
                    else {
                        return accumulator + "<td>  </td>";
                    }
                }, "")
                bodyRow += `</tr>`
            })
            console.log(scheduleData.selectedYears[yearIndex])
            tableHeader.innerHTML = `${dayRow}${subjectRow}${blocksRow}`;
            tableBody.innerHTML = bodyRow;
            table.appendChild(tableHeader);
            table.appendChild(tableBody);
            table.classList.add("table");

            element.appendChild(table);
            if (yearIndex < (scheduleData.yearSchedule.length-1)) {
                let d = document.createElement("div")
                d.className = "page-break"
                element.appendChild(d);
            }
        })
        html2pdf(element);
    }
 
    return (
        <div>
            <Paper sx={{ p: 2, mb: 3 }} elevation={2}>
                <Typography variant="h5" m={2} align="center">
                    Review Details
                </Typography>

                <Grid container spacing={1} sx={{ alignItems: "center" }}>
                    <Grid item xs={2}>
                        <Typography sx={{ fontSize: 19 }}>Title: </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            defaultValue={formData.title}
                            disabled
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2} fullWidth>
                            <Grid item xs={2}>
                                <Typography sx={{ fontSize: 19 }}>Selected Years: </Typography>
                            </Grid>
                            {formData.selectedYears.map((data) => (
                                <Grid item xs={2}>
                                    <TextField size="small" defaultValue={data} disabled fullWidth />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>


                    {Object.entries(formData.subjectsPerYear).map(([year, subjects]) => (
                        <>
                            <Grid item xs={2}>
                                <Typography key={year} sx={{ fontSize: 19 }}>
                                    Subjects for {year}:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    size="small"
                                    defaultValue={subjects}
                                    disabled
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {" "}
                            </Grid>
                        </>
                    ))}
                    {Object.entries(formData.noOfBlocksPerYear).map(([year, subjects]) => (
                        <>
                            <Grid item xs={2}>
                                <Typography key={year} sx={{ fontSize: 19 }}>
                                    No of Blocks for {year}:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    size="small"
                                    defaultValue={subjects}
                                    disabled
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {" "}
                            </Grid>
                        </>
                    ))}
                    <Grid item xs={2}>
                        <Typography sx={{ fontSize: 19 }}>Slots Per Day: </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            defaultValue={formData.paperSlotsPerDay}
                            disabled
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {" "}
                    </Grid>

                    {formData.paperTimeSlots.map((timeSlot, index) => (
                        <>
                            <Grid item xs={2}>
                                <Typography key={index} sx={{ fontSize: 19 }}>
                                    Time Slot {index + 1} :
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    size="small"
                                    defaultValue={timeSlot.startTime}
                                    disabled
                                    fullWidth
                                />
                            </Grid>
                            -
                            <Grid item xs={2}>
                                <TextField
                                    size="small"
                                    defaultValue={timeSlot.endTime}
                                    disabled
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={5}>

                            </Grid>
                        </>
                    ))}
                </Grid>
            </Paper>
            {teacherNames&&yearSchedule &&
                yearSchedule.map((year, yearIndex) => (
                    <>
                        <Typography variant="h5" sx={{ textAlign: "center" }}>
                            Year : {formData.selectedYears[yearIndex]}{" "}
                        </Typography>
                        <TableContainer component={Paper} sx={{ m: 2 }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table"  id="schedule-table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"></TableCell>
                                        {year.headers.days.map((index, i) => (
                                            <TableCell
                                                key={index}
                                                align="center"
                                                colSpan={ Math.ceil(Math.ceil(formData.noOfBlocksPerYear[formData.selectedYears[yearIndex]])*formData.paperSlotsPerDay) }
                                                width={50}
                                                sx={{ minWidth: "100px !important", width: "300px !important", }}
                                            >
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    defaultValue={index}
                                                    value={index}
                                                    onChange={(e) => { handleInputChange(e, yearIndex, "days", i) }}
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={150}></TableCell>

                                        {year.headers.subjects.map((index, i) => (
                                            <TableCell key={index} width={70} sx={{ minWidth: "100px !important", width: "300px !important", }} colSpan={Math.ceil(formData.noOfBlocksPerYear[formData.selectedYears[yearIndex]])}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    value={index}
                                                    onChange={(e) => { handleInputChange(e, yearIndex, "subjects", i) }}
                                                />
                                            </TableCell>
                                        ))}


                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={150}></TableCell>
                                        {year.headers.blocks.map(
                                            (index, i) => (
                                                <TableCell key={i} sx={{ minWidth: "112px !important", width: "150px !important", }} >
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                        value={index}
                                                        onChange={(e) => { handleInputChange(e, yearIndex, "blocks", i) }}
                                                    />
                                                </TableCell>
                                            )
                                        )}
                                    </TableRow>


                                </TableHead>
                                <TableBody>
                                    {Object.keys(year.schedule).map((teacherIndex) => (
                                        <TableRow
                                            key={teacherIndex}

                                        >
                                            <TableCell sx={{ minWidth: "300px !important", width: "300px !important", }} >
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    disabled
                                                    defaultValue={teacherNames.find(teacher => teacher.teacherId == teacherIndex).name
                                                        
                                                    }
                                                    sx={{   
                                                        "& .MuiOutlinedInput-input": {
                                                            fontSize: "14px !important"
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                            {year.schedule[teacherIndex].map((isAvailable, index) => (
                                                <TableCell key={index} align="center">
                                                    <Checkbox
                                                        checked={isAvailable}
                                                        onChange={(e) =>
                                                            handleInputChange1(
                                                                e,
                                                                year,
                                                                yearIndex,
                                                                teacherIndex,
                                                                index
                                                            )
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
                <Button
                    onClick={() => {
                        generatePdf();
                    }}
                    sx={{ mt: 3, ml: 1 }}
                >
                    Close
                </Button>
               

                {activeStep !== steps && (
                    <Button
                        variant="contained"
                        onClick={activeStep === steps - 1 ? handleSubmit : handleNext}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        {activeStep === steps - 1 ? "Submit" : "Next"}
                    </Button>
                )}
            </Box>
        </div>
    );
}
